package com.teknolista.castas

import android.graphics.Paint
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.sizeIn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.produceState
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.emoji2.text.EmojiCompat
import com.teknolista.castas.data.AppLanguage
import com.teknolista.castas.data.ContentRepository
import java.text.Normalizer
import java.util.Locale
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray

private data class EmojiChoice(val glyph: String, val name: String, val searchText: String)

private val diacritics = Regex("\\p{M}+")

private fun normalize(text: String): String =
    Normalizer.normalize(text.lowercase(Locale.ROOT), Normalizer.Form.NFD)
        .replace(diacritics, "")

@Composable
internal fun EmojiPicker(
    repo: ContentRepository,
    language: AppLanguage,
    onDismiss: () -> Unit,
    onSelect: (String) -> Unit
) {
    val context = LocalContext.current.applicationContext
    val keyboard = LocalSoftwareKeyboardController.current
    val emojiCompat = remember { EmojiCompat.get() }
    var fontState by remember { mutableIntStateOf(emojiCompat.loadState) }
    DisposableEffect(emojiCompat) {
        val callback = object : EmojiCompat.InitCallback() {
            override fun onInitialized() { fontState = EmojiCompat.LOAD_STATE_SUCCEEDED }
            override fun onFailed(throwable: Throwable?) { fontState = EmojiCompat.LOAD_STATE_FAILED }
        }
        emojiCompat.registerInitCallback(callback)
        onDispose { emojiCompat.unregisterInitCallback(callback) }
    }
    val entries by produceState<List<EmojiChoice>?>(null, language, fontState) {
        if (fontState != EmojiCompat.LOAD_STATE_LOADING && fontState != EmojiCompat.LOAD_STATE_DEFAULT) {
            value = withContext(Dispatchers.IO) {
                val data = JSONArray(context.assets.open("emojis-${language.code}.json")
                    .bufferedReader().use { it.readText() })
                val paint = Paint()
                val seen = mutableSetOf<String>()
                buildList {
                    for (i in 0 until data.length()) {
                        val row = data.getJSONArray(i)
                        val glyph = row.getString(0)
                        val supported = (fontState == EmojiCompat.LOAD_STATE_SUCCEEDED &&
                            emojiCompat.getEmojiMatch(glyph, Int.MAX_VALUE) == EmojiCompat.EMOJI_SUPPORTED) ||
                            paint.hasGlyph(glyph)
                        if (!supported || !seen.add(glyph)) continue
                        val names = row.getJSONArray(1)
                        val words = List(names.length(), names::getString)
                        add(EmojiChoice(glyph, words.lastOrNull() ?: glyph,
                            normalize(words.joinToString(" ") + " " + row.getString(2))))
                    }
                }
            }
        }
    }
    var query by rememberSaveable { mutableStateOf("") }
    val filtered = remember(entries, query) {
        val term = normalize(query.trim())
        entries?.filter { term in it.searchText || query.trim() in it.glyph }
    }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(repo.nestedString(language, "result", "chooseEmoji")) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(
                    value = query, onValueChange = { query = it },
                    label = { Text(repo.nestedString(language, "result", "searchEmoji")) },
                    singleLine = true, modifier = Modifier.fillMaxWidth().testTag("emoji-search")
                )
                when {
                    filtered == null -> CircularProgressIndicator()
                    filtered.isEmpty() -> Text(repo.nestedString(language, "result", "noEmoji"))
                    else -> LazyVerticalGrid(
                        columns = GridCells.Adaptive(48.dp),
                        modifier = Modifier.fillMaxWidth().heightIn(max = 260.dp)
                    ) {
                        items(filtered, key = { it.glyph }) { choice ->
                            Box(
                                Modifier.testTag("emoji-${choice.glyph}").sizeIn(minWidth = 48.dp, minHeight = 48.dp)
                                    .clickable(role = Role.Button) {
                                        keyboard?.hide()
                                        onSelect(choice.glyph)
                                    },
                                contentAlignment = Alignment.Center
                            ) {
                                Text(choice.glyph,
                                    Modifier.padding(4.dp).clearAndSetSemantics {
                                        contentDescription = choice.name
                                    }, fontSize = 26.sp)
                            }
                        }
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) { Text(repo.nestedString(language, "result", "close")) }
        }
    )
}
