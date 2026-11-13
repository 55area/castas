package com.teknolista.castas

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.dp
import androidx.activity.ComponentActivity
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.teknolista.castas.data.AppLanguage
import com.teknolista.castas.data.ContentRepository
import com.teknolista.castas.data.TestResult
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class CastasAdaptiveTest {
    @get:Rule
    val compose = createAndroidComposeRule<ComponentActivity>()

    @Test
    fun resultActionsAndGridRemainReachableAt280DpAnd200PercentText() {
        val repo = ContentRepository(compose.activity.applicationContext)
        compose.setContent {
            val density = LocalDensity.current.density
            CompositionLocalProvider(LocalDensity provides Density(density, fontScale = 2f)) {
                MaterialTheme {
                    Box(Modifier.width(280.dp)) {
                        ResultScreen(repo, AppLanguage.Spanish, TestResult(1, List(5) { 0 })) {}
                    }
                }
            }
        }
        for (key in listOf("changeEmoji", "share")) {
            compose.onNodeWithText(repo.nestedString(AppLanguage.Spanish, "result", key), substring = true)
                .performScrollTo().assertIsDisplayed().assertHasClickAction()
        }
        compose.onNodeWithTag("emoji-grid").performScrollTo().assertIsDisplayed()
        val first = repo.nestedString(AppLanguage.Spanish, "dimensions", "a")
        compose.onNodeWithContentDescription("$first, 0%").assertExists()
    }
}
