package com.teknolista.castas

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.viewModels
import androidx.activity.compose.setContent
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.Image
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.key
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.LinkAnnotation
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextLinkStyles
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.withLink
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.emoji2.bundled.BundledEmojiCompatConfig
import androidx.emoji2.text.EmojiCompat
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.teknolista.castas.data.AppLanguage
import com.teknolista.castas.data.CastasPreferences
import com.teknolista.castas.data.CastasScoring
import com.teknolista.castas.data.ContentRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.asExecutor
import org.json.JSONArray
import org.json.JSONObject

private val Ink = Color(0xFF090909)
internal val Panel = Color(0xFF151515)
internal val Orange = Color(0xFFFF9000)
internal val White = Color(0xFFF7F7F7)
internal val Muted = Color(0xFFB9B9B9)

class MainActivity : ComponentActivity() {
    private val model by viewModels<CastasViewModel> {
        viewModelFactory {
            initializer { CastasViewModel(CastasPreferences(application)) }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (!EmojiCompat.isConfigured()) {
            EmojiCompat.init(BundledEmojiCompatConfig(applicationContext, Dispatchers.IO.asExecutor()))
        }
        setContent { CastasApp(model) }
    }
}

@Composable
private fun CastasApp(model: CastasViewModel) {
    val context = LocalContext.current
    val repository = remember(context) { ContentRepository(context.applicationContext) }
    val navController = rememberNavController()
    val language = model.language
    MaterialTheme(colorScheme = androidx.compose.material3.darkColorScheme(
        primary = Orange, onPrimary = Color.Black, background = Ink, surface = Panel,
        onBackground = White, onSurface = White
    )) {
        Surface(Modifier.fillMaxSize(), color = Ink) {
            Box(Modifier.fillMaxSize().background(Brush.verticalGradient(listOf(Color(0xFF1D1005), Ink)))) {
                when {
                    model.loading -> Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator(color = Orange)
                    }
                    model.loadFailed -> Page {
                        StorageError(repository, language, "readError", model::load)
                    }
                    else -> Scaffold(containerColor = Color.Transparent) { insets ->
                        NavHost(
                            navController,
                            startDestination = "home",
                            modifier = Modifier.padding(insets),
                            enterTransition = { fadeIn() },
                            exitTransition = { fadeOut() }
                        ) {
                            composable("home") {
                                HomeScreen(
                                    repository, language, model.result != null,
                                    onLanguage = model::changeLanguage,
                                    onStart = {
                                        model.startOver()
                                        navController.navigate("test") { launchSingleTop = true }
                                    },
                                    onNavigate = { route ->
                                        navController.navigate(route) { launchSingleTop = true }
                                    },
                                    changingLanguage = model.changingLanguage,
                                    languageFailed = model.languageFailed
                                )
                            }
                            composable("test") {
                                val leave: () -> Unit = {
                                    if (!model.saving && !model.resultReady) {
                                        model.startOver()
                                        navController.popBackStack()
                                    }
                                }
                                BackHandler(onBack = leave)
                                LaunchedEffect(model.resultReady) {
                                    if (model.resultReady) {
                                        navController.navigate("result") { popUpTo("home") }
                                        model.startOver()
                                    }
                                }
                                val index = model.questionIndex
                                key(index) {
                                    TestScreen(
                                        repository, language, index,
                                        onAnswer = { option -> model.answer(index, option) },
                                        onBack = leave,
                                        enabled = model.selectedOption == null && !model.saving &&
                                            !model.saveFailed && !model.resultReady,
                                        selectedOption = model.selectedOption,
                                        saving = model.saving,
                                        saveFailed = model.saveFailed,
                                        retry = model::save
                                    )
                                }
                            }
                            composable("result") {
                                ResultScreen(repository, language, model.result,
                                    onBack = { navController.popBackStack("home", false) })
                            }
                            listOf("about", "fanatic", "terms", "privacy").forEach { route ->
                                composable(route) {
                                    InfoScreen(repository, language, route, onBack = { navController.popBackStack() })
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun StorageError(repo: ContentRepository, language: AppLanguage, message: String, retry: () -> Unit) {
    Text(repo.nestedString(language, "storage", message),
        Modifier.padding(12.dp).semantics { liveRegion = LiveRegionMode.Polite },
        textAlign = TextAlign.Center)
    TextButton(onClick = retry) { Text(repo.nestedString(language, "storage", "retry")) }
}

@Composable
internal fun Page(modifier: Modifier = Modifier, content: @Composable ColumnScope.() -> Unit) {
    Column(modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally) {
        Column(Modifier.widthIn(max = 640.dp).fillMaxWidth().verticalScroll(rememberScrollState())
            .padding(horizontal = 20.dp, vertical = 18.dp),
            horizontalAlignment = Alignment.CenterHorizontally, content = content)
    }
}

@Composable
internal fun ColumnScope.Header(repo: ContentRepository, language: AppLanguage, onBack: () -> Unit) {
    TextButton(onClick = onBack, modifier = Modifier.align(Alignment.Start)) {
        Text("←  ${repo.nestedString(language, "common", "back")}", color = Orange)
    }
}

@Composable
private fun AccentButton(text: String, enabled: Boolean = true, onClick: () -> Unit) {
    Button(onClick = onClick, enabled = enabled, modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp), colors = ButtonDefaults.buttonColors(
            containerColor = Panel, contentColor = White, disabledContainerColor = Color(0xFF202020),
            disabledContentColor = Color(0xFF777777)
        )) {
        Text(text, modifier = Modifier.padding(vertical = 5.dp), fontWeight = FontWeight.Bold)
    }
}

@Composable
private fun HomeScreen(repo: ContentRepository, language: AppLanguage, hasResult: Boolean,
                       onLanguage: (AppLanguage) -> Unit, onStart: () -> Unit,
                       onNavigate: (String) -> Unit, changingLanguage: Boolean, languageFailed: Boolean, modifier: Modifier = Modifier) {
    var expanded by remember { mutableStateOf(false) }
    Page(modifier) {
        Box(Modifier.fillMaxWidth()) {
            TextButton(onClick = { expanded = true }, enabled = !changingLanguage, modifier = Modifier.align(Alignment.TopEnd)) {
                Text(language.label + " ⌄", color = White, fontSize = 13.sp)
            }
            DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                AppLanguage.entries.forEach { option -> DropdownMenuItem(text = { Text(option.label) }, onClick = {
                    onLanguage(option); expanded = false
                }) }
            }
        }
        if (languageFailed) {
            Text(repo.nestedString(language, "storage", "languageError"),
                Modifier.semantics { liveRegion = LiveRegionMode.Polite }, textAlign = TextAlign.Center)
        }
        Spacer(Modifier.height(18.dp))
        Image(painterResource(com.teknolista.castas.R.drawable.castas_icon), "Castas", Modifier.size(82.dp))
        Text("🤬 Castas", fontSize = 34.sp, fontWeight = FontWeight.Bold, color = White)
        Text(repo.nestedString(language, "app", "subtitle"), fontSize = 21.sp,
            fontWeight = FontWeight.Bold, color = Orange, textAlign = TextAlign.Center)
        Spacer(Modifier.height(24.dp))
        Card(colors = CardDefaults.cardColors(containerColor = Panel), shape = RoundedCornerShape(22.dp)) {
            Text(repo.nestedString(language, "home", "description"), Modifier.padding(20.dp),
                color = White, textAlign = TextAlign.Center, lineHeight = 23.sp)
        }
        Spacer(Modifier.height(18.dp))
        AccentButton("👉  ${repo.nestedString(language, "politicalFanatic", "title")}  👈") { onNavigate("fanatic") }
        AccentButton("✦  ${repo.nestedString(language, "home", "startTest")}", onClick = onStart)
        AccentButton("▤  ${repo.nestedString(language, "home", "viewResult")}", enabled = hasResult) { onNavigate("result") }
        Text(repo.nestedString(language, "home", "sharePrompt"), Modifier.padding(vertical = 12.dp),
            color = Muted, textAlign = TextAlign.Center)
        listOf("about" to "home.about", "terms" to "home.termsOfUse", "privacy" to "home.privacyPolicy").forEach { (route, key) ->
            TextButton(onClick = { onNavigate(route) }) { Text(repo.nestedString(language, *key.split('.').toTypedArray()), color = Orange) }
        }
        val linkStyle = TextLinkStyles(style = SpanStyle(color = Orange))
        Text(buildAnnotatedString {
            append(repo.nestedString(language, "home", "copyrightBefore") + " ")
            withLink(LinkAnnotation.Url("https://x.com/teknolista", linkStyle)) { append("Raul Bras") }
            append(" · " + repo.nestedString(language, "home", "copyrightMiddle") + " ")
            withLink(LinkAnnotation.Url("https://www.gnu.org/licenses/gpl-3.0.pt-br.html", linkStyle)) {
                append(repo.nestedString(language, "home", "copyrightLicense"))
            }
        }, color = Muted, fontSize = 12.sp, textAlign = TextAlign.Center)
        Text(buildAnnotatedString {
            append(repo.nestedString(language, "home", "madeInBefore") + " ")
            withLink(LinkAnnotation.Url("https://pt.wikipedia.org/wiki/Osasco", linkStyle)) {
                append(repo.nestedString(language, "home", "madeInPlace"))
            }
            append(repo.nestedString(language, "home", "madeInAfter"))
        }, color = Muted, fontSize = 12.sp, textAlign = TextAlign.Center)
    }
}

@Composable
private fun TestScreen(
    repo: ContentRepository,
    language: AppLanguage,
    index: Int,
    onAnswer: (Int) -> Unit,
    onBack: () -> Unit,
    enabled: Boolean,
    selectedOption: Int?,
    saving: Boolean,
    saveFailed: Boolean,
    retry: () -> Unit
) {
    val question = repo.questions(language)[index]
    val dimensionNames = repo.stringArrayObject(language, "dimensions")
    val options = repo.stringArrayObject(language, "test", "options")
    val position = index % CastasScoring.QUESTIONS_PER_DIMENSION + 1
    Page {
        Header(repo, language, onBack)
        Spacer(Modifier.height(24.dp))
        Text(
            repo.nestedString(language, "test", "dimensionOf")
                .replace("{{current}}", "${question.dimension + 1}").replace("{{total}}", "5") +
                " · ${dimensionNames[question.dimension]}",
            color = Orange, fontWeight = FontWeight.Bold, textAlign = TextAlign.Center
        )
        val questionLabel = repo.nestedString(language, "test", "questionOf")
            .replace("{{current}}", "$position").replace("{{total}}", "${CastasScoring.QUESTIONS_PER_DIMENSION}")
        Column(Modifier.fillMaxWidth().semantics(mergeDescendants = true) {
            liveRegion = LiveRegionMode.Polite
        }) {
            Text(questionLabel, Modifier.testTag("question-number").padding(vertical = 12.dp), color = Muted)
            Card(colors = CardDefaults.cardColors(containerColor = Panel), shape = RoundedCornerShape(20.dp)) {
                Text(question.text, Modifier.padding(22.dp), color = White, fontSize = 21.sp,
                    lineHeight = 29.sp, fontWeight = FontWeight.Medium)
            }
        }
        Spacer(Modifier.height(12.dp))
        if (saving) {
            CircularProgressIndicator(color = Orange, modifier = Modifier.size(24.dp))
            Text(repo.nestedString(language, "storage", "saving"))
        }
        if (saveFailed) StorageError(repo, language, "writeError", retry)
        Column(Modifier.selectableGroup()) {
            options.forEachIndexed { option, label ->
                Card(
                    Modifier.fillMaxWidth().padding(vertical = 5.dp),
                    colors = CardDefaults.cardColors(containerColor = Panel),
                    shape = RoundedCornerShape(14.dp)
                ) {
                    Row(
                        Modifier.fillMaxWidth()
                            .testTag("answer-$option")
                            .selectable(selected = selectedOption == option, enabled = enabled, role = Role.RadioButton,
                                onClick = { onAnswer(option) })
                            .padding(horizontal = 12.dp, vertical = 14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(selected = selectedOption == option, onClick = null, enabled = enabled)
                        Spacer(Modifier.width(12.dp))
                        Text(label, color = White, modifier = Modifier.weight(1f))
                    }
                }
            }
        }
        val progress = repo.nestedString(language, "test", "overallProgressValue")
            .replace("{{current}}", "${index + 1}").replace("{{total}}", "${CastasScoring.QUESTION_COUNT}")
        Text("${repo.nestedString(language, "test", "overallProgress")} · $progress",
            Modifier.testTag("overall-progress").padding(top = 14.dp), color = Muted)
        LinearProgressIndicator(
            progress = { (index + 1) / CastasScoring.QUESTION_COUNT.toFloat() },
            modifier = Modifier.fillMaxWidth().padding(vertical = 12.dp), color = Orange, trackColor = Panel
        )
    }
}

@Composable
private fun InfoScreen(repo: ContentRepository, language: AppLanguage, route: String, onBack: () -> Unit, modifier: Modifier = Modifier) {
    val content = repo.content(language)
    val section = when (route) { "fanatic" -> "politicalFanatic"; "about" -> "about"; "terms" -> "termsOfUse"; else -> "privacyPolicy" }
    val page = content.getJSONObject(section)
    val title = page.optString("title")
    Page(modifier) {
        Header(repo, language, onBack)
        Text(title, Modifier.padding(vertical = 10.dp), color = Orange, fontSize = 27.sp, fontWeight = FontWeight.Bold, textAlign = TextAlign.Center)
        when (route) {
            "fanatic" -> {
                page.getJSONArray("content").ForEachText { Text(it, Modifier.fillMaxWidth().padding(vertical = 7.dp), color = White, lineHeight = 25.sp) }
                Text(page.optString("adaptation"), Modifier.padding(vertical = 12.dp), color = Muted)
                Image(painterResource(com.teknolista.castas.R.drawable.ariano_suassuna), "Ariano Suassuna", Modifier.fillMaxWidth())
                Text("¯\\_(ツ)_/¯", Modifier.padding(14.dp), color = Muted)
            }
            "about" -> AboutContent(repo, language, page)
            else -> PolicyContent(page)
        }
    }
}

@Composable
private fun AboutContent(repo: ContentRepository, language: AppLanguage, page: JSONObject) {
    Image(painterResource(com.teknolista.castas.R.drawable.about_banner),
        repo.nestedString(language, "about", "bannerDescription"), Modifier.fillMaxWidth())
    listOf("intro", "body", "closing").forEach { key -> Paragraph(page.optString(key)) }
    Text(page.optString("howItWorks"), Modifier.fillMaxWidth().padding(top = 10.dp), color = Orange, fontSize = 21.sp, fontWeight = FontWeight.Bold)
    Paragraph(page.optString("howItWorksIntro")); Paragraph(page.optString("dimensionsIntro"))
    val dims = page.optJSONObject("dimensions")
    if (dims != null) listOf("a", "b", "c", "d", "e").forEach { id ->
        val n = "ABCDE"[id.single().code - 'a'.code]
        Paragraph("$n. ${repo.nestedString(language, "dimensions", id)} — ${dims.optString(id)}")
    }
    Paragraph(page.optString("scoringIntro"))
    val scoring = page.optJSONObject("scoring")
    if (scoring != null) listOf("stronglyAgree", "somewhatAgree", "somewhatDisagree", "stronglyDisagree")
        .forEachIndexed { index, option ->
            Paragraph("• ${CastasScoring.responsePoints[index]} — ${scoring.optString(option)}")
        }
    Paragraph(page.optString("resultExample"))
    Text("🤬 CASTAS\n${repo.nestedString(language, "app", "subtitle")}\n\n" +
        List(5) { "\t\t💙💙💙💙🤬" }.joinToString("\n") + "\n\n" +
        listOf("a", "b", "c", "d", "e").joinToString("\n") { "00% ${repo.nestedString(language, "dimensions", it)}" },
        Modifier.fillMaxWidth().padding(12.dp), color = White, lineHeight = 24.sp)
}

@Composable
private fun PolicyContent(page: JSONObject) {
    val intro = page.optString("intro")
    if (intro.isNotBlank()) Paragraph(intro)
    val sections = page.optJSONObject("sections") ?: return
    val sectionOrder = if (sections.has("purpose")) {
        listOf("purpose", "nature", "operation", "sharing", "availability", "privacy", "ip", "liability", "changes", "acceptance")
    } else {
        listOf("acceptance", "about", "data", "sharing", "clearData", "spam")
    }
    sectionOrder.filter(sections::has).forEach { key ->
        val item = sections.getJSONObject(key)
        Text(item.optString("title"), Modifier.fillMaxWidth().padding(top = 12.dp, bottom = 3.dp), color = Orange, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        if (item.has("intro")) Paragraph(item.optString("intro"))
        if (item.has("content")) Paragraph(item.optString("content"))
        if (item.has("note")) Paragraph(item.optString("note"))
        val items = item.optJSONArray("items")
        items?.ForEachText { Paragraph("• $it") }
    }
    if (page.has("lastUpdated")) Text(page.optString("lastUpdated"), Modifier.padding(top = 14.dp), color = Muted)
}

@Composable
private fun Paragraph(text: String) {
    if (text.isNotBlank()) Text(text, Modifier.fillMaxWidth().padding(vertical = 6.dp), color = White, lineHeight = 23.sp)
}

@Composable
private fun JSONArray.ForEachText(content: @Composable (String) -> Unit) {
    for (index in 0 until length()) content(getString(index))
}
