package com.teknolista.castas

import android.content.ClipboardManager
import android.graphics.Bitmap
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.teknolista.castas.data.AppLanguage
import com.teknolista.castas.data.ContentRepository
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class CastasJourneyTest {
    @get:Rule
    val compose = createAndroidComposeRule<MainActivity>()
    private val repo get() = ContentRepository(compose.activity.applicationContext)

    @Test
    fun completesReopensAndCopiesTheResultWithARecentEmoji() {
        setLanguage(AppLanguage.Portuguese)
        compose.onNodeWithText("Iniciar Teste", substring = true).performScrollTo().performClick()
        repeat(40) { index ->
            waitForProgress(index + 1)
            assertQuestion(index % 8 + 1)
            compose.onNodeWithTag("answer-${if (index < 8) 3 else 0}")
                .performScrollTo().performClick()
        }
        awaitText("Seu Resultado", substring = true)
        compose.onAllNodesWithText("100%").assertCountEquals(4)
        compose.onNodeWithText("0%").assertExists()

        compose.activityRule.scenario.recreate()
        awaitText("Seu Resultado", substring = true)
        compose.onNodeWithText("0%").assertExists()
        compose.onNodeWithText("Alterar Emoji", substring = true).performScrollTo().performClick()
        compose.onNodeWithTag("emoji-search").performTextReplacement("🫶")
        compose.waitUntil(20_000) {
            compose.onAllNodesWithTag("emoji-🫶").fetchSemanticsNodes().isNotEmpty()
        }
        compose.onNodeWithTag("emoji-🫶").performClick()
        compose.onNodeWithText("🫶", substring = true).assertExists()

        compose.onNodeWithTag("emoji-grid").performScrollTo()
        captureIfRequested("recent-emoji.png")
        val share = repo.nestedString(AppLanguage.Portuguese, "result", "share")
        compose.onNodeWithText(share).performScrollTo().performClick()
        compose.runOnIdle {
            val clipboard = compose.activity.getSystemService(ClipboardManager::class.java)
            val clip = checkNotNull(clipboard.primaryClip)
            val lines = clip.getItemAt(0).text.toString().lines()
            assertEquals(1, lines.count { it.trim() == "🫶".repeat(5) })
            assertEquals(4, lines.count { it.trim() == "🤬".repeat(5) })
            assertTrue(clip.description.extras!!.getBoolean("android.content.extra.IS_SENSITIVE"))
        }
    }

    @Test
    fun retainsTheQuestionAtTheDimensionBoundaryAndRestartsAfterLeaving() {
        setLanguage(AppLanguage.Portuguese)
        compose.onNodeWithText("Iniciar Teste", substring = true).performScrollTo().performClick()
        repeat(8) { index ->
            waitForProgress(index + 1)
            compose.onNodeWithTag("answer-0").performScrollTo().performClick()
        }
        waitForProgress(9)
        assertQuestion(1)
        compose.onNodeWithText("Dimensão 2 de 5", substring = true).assertExists()

        compose.activityRule.scenario.recreate()
        waitForProgress(9)
        assertQuestion(1)
        compose.onNodeWithText("Dimensão 2 de 5", substring = true).assertExists()
        compose.activityRule.scenario.onActivity { it.onBackPressedDispatcher.onBackPressed() }
        awaitText("Iniciar Teste", substring = true)
        compose.onNodeWithText("Iniciar Teste", substring = true).performScrollTo().performClick()
        waitForProgress(1)
        assertQuestion(1)
    }

    @Test
    fun informationRoutesAndQuestionnaireUseTheSelectedLanguage() {
        for (language in listOf(AppLanguage.English, AppLanguage.Spanish)) {
            setLanguage(language)
            val back = repo.nestedString(language, "common", "back")
            for ((homeKey, contentKey) in listOf(
                "about" to "about", "termsOfUse" to "termsOfUse", "privacyPolicy" to "privacyPolicy"
            )) {
                val label = repo.nestedString(language, "home", homeKey)
                compose.onNodeWithText(label).performScrollTo().performClick()
                awaitText(repo.nestedString(language, contentKey, "title"))
                compose.onNodeWithText(back, substring = true).performScrollTo().performClick()
                awaitText(repo.nestedString(language, "home", "startTest"), substring = true)
            }
            val fanatic = repo.nestedString(language, "politicalFanatic", "title")
            compose.onNodeWithText(fanatic, substring = true).performScrollTo().performClick()
            awaitText(fanatic)
            compose.onNodeWithText(back, substring = true).performScrollTo().performClick()
            val start = repo.nestedString(language, "home", "startTest")
            awaitText(start, substring = true)
            compose.onNodeWithText(start, substring = true).performScrollTo().performClick()
            awaitText(repo.questions(language).first().text)
            compose.onNodeWithText(back, substring = true).performScrollTo().performClick()
            awaitText(start, substring = true)
        }
        setLanguage(AppLanguage.Portuguese)
    }

    private fun setLanguage(language: AppLanguage) {
        val options = AppLanguage.entries.map { hasText(it.label + " ⌄") }
        val current = options.reduce { a, b -> a or b }
        compose.waitUntil(20_000) { compose.onAllNodes(current).fetchSemanticsNodes().size == 1 }
        compose.onNode(current).performScrollTo().performClick()
        compose.onNodeWithText(language.label).performClick()
        awaitText(language.label + " ⌄")
    }

    private fun assertQuestion(position: Int) {
        compose.onNodeWithTag("question-number", useUnmergedTree = true)
            .assertTextEquals("Questão $position de 8")
    }

    private fun waitForProgress(index: Int) {
        val matcher = hasTestTag("overall-progress") and hasText("$index / 40", substring = true)
        compose.waitUntil(20_000) { compose.onAllNodes(matcher).fetchSemanticsNodes().isNotEmpty() }
    }

    private fun awaitText(text: String, substring: Boolean = false) {
        compose.waitUntil(20_000) {
            compose.onAllNodesWithText(text, substring).fetchSemanticsNodes().isNotEmpty()
        }
    }

    private fun captureIfRequested(name: String) {
        if (InstrumentationRegistry.getArguments().getString("capture") != "true") return
        val instrumentation = InstrumentationRegistry.getInstrumentation()
        compose.waitForIdle()
        instrumentation.uiAutomation.waitForIdle(500, 8_000)
        val bitmap = checkNotNull(instrumentation.uiAutomation.takeScreenshot())
        try {
            instrumentation.targetContext.openFileOutput(name, 0).use {
                check(bitmap.compress(Bitmap.CompressFormat.PNG, 100, it))
            }
        } finally {
            bitmap.recycle()
        }
    }
}
