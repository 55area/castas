package com.teknolista.castas

import android.content.ClipData
import android.content.ClipboardManager
import android.os.PersistableBundle
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.teknolista.castas.data.AppLanguage
import com.teknolista.castas.data.CastasScoring
import com.teknolista.castas.data.ContentRepository
import com.teknolista.castas.data.ShareLabels
import com.teknolista.castas.data.TestResult
import kotlinx.coroutines.delay

@Composable
internal fun ResultScreen(
    repo: ContentRepository, language: AppLanguage, result: TestResult?, onBack: () -> Unit
) {
    var positiveEmoji by rememberSaveable { mutableStateOf("💙") }
    var chooseEmoji by rememberSaveable { mutableStateOf(false) }
    var copyCount by remember { mutableIntStateOf(0) }
    var copied by remember { mutableStateOf(false) }
    LaunchedEffect(copyCount) {
        if (copied) {
            delay(2_000)
            copied = false
        }
    }
    val context = LocalContext.current
    val names = repo.stringArrayObject(language, "dimensions")
    Page {
        Header(repo, language, onBack)
        Text("📶 ${repo.nestedString(language, "result", "title")}",
            Modifier.padding(vertical = 18.dp), color = Orange, fontSize = 27.sp,
            fontWeight = FontWeight.Bold, textAlign = TextAlign.Center)
        if (result == null) return@Page
        result.scores.forEachIndexed { index, score ->
            Column(Modifier.fillMaxWidth().padding(vertical = 7.dp)) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(names[index], color = White, modifier = Modifier.weight(1f))
                    Text("$score%", color = Orange, fontWeight = FontWeight.Bold)
                }
                LinearProgressIndicator(progress = { score / 100f },
                    modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
                    color = Orange, trackColor = Panel)
            }
        }
        Text(repo.nestedString(language, "result", "shareTitle"), Modifier.padding(top = 16.dp),
            color = White, fontWeight = FontWeight.SemiBold, textAlign = TextAlign.Center)
        Column(Modifier.fillMaxWidth().padding(vertical = 10.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { chooseEmoji = true }, modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(containerColor = Panel, contentColor = White)) {
                Text("$positiveEmoji  ${repo.nestedString(language, "result", "changeEmoji")}")
            }
            Button(onClick = {
                val labels = ShareLabels(
                    repo.nestedString(language, "result", "copiedTitle"),
                    repo.nestedString(language, "result", "copiedSubtitle"),
                    repo.nestedString(language, "result", "copiedLink")
                )
                val text = CastasScoring.shareText(result, positiveEmoji, names, labels)
                val clip = ClipData.newPlainText(repo.nestedString(language, "result", "title"), text)
                clip.description.extras = PersistableBundle().apply {
                    putBoolean("android.content.extra.IS_SENSITIVE", true)
                }
                context.getSystemService(ClipboardManager::class.java).setPrimaryClip(clip)
                copied = true
                copyCount++
            }, modifier = Modifier.fillMaxWidth().semantics { liveRegion = LiveRegionMode.Polite },
                colors = ButtonDefaults.buttonColors(containerColor = Orange, contentColor = Color.Black)) {
                Text(repo.nestedString(language, "result", if (copied) "copied" else "share"))
            }
        }
        BoxWithConstraints(Modifier.widthIn(max = 320.dp).fillMaxWidth().testTag("emoji-grid")) {
            val size = with(LocalDensity.current) { (maxWidth / 5 * 0.78f).toSp() }.value.coerceAtMost(31f).sp
            Column {
                result.scores.forEachIndexed { index, score ->
                    val positiveCount = CastasScoring.positiveEmojiCount(score)
                    Row(Modifier.fillMaxWidth().clearAndSetSemantics {
                        contentDescription = "${names[index]}, $score%"
                    }) {
                        repeat(5) { cell ->
                            Text(if (cell < positiveCount) positiveEmoji else "🤬",
                                Modifier.weight(1f), maxLines = 1, fontSize = size,
                                textAlign = TextAlign.Center)
                        }
                    }
                }
            }
        }
        if (chooseEmoji) {
            EmojiPicker(repo, language, onDismiss = { chooseEmoji = false }) {
                positiveEmoji = it
                copied = false
                chooseEmoji = false
            }
        }
    }
}
