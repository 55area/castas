package com.teknolista.castas

import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.test.platform.app.InstrumentationRegistry
import com.teknolista.castas.data.AppLanguage
import com.teknolista.castas.data.CastasPreferences
import com.teknolista.castas.data.TestResult
import java.io.File
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancelAndJoin
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class CastasPreferencesTest {
    @Test
    fun committedResultAndLanguageSurviveADataStoreReopen() = runBlocking {
        val context = InstrumentationRegistry.getInstrumentation().targetContext
        val file = File.createTempFile("castas", ".preferences_pb", context.cacheDir)
        val initialJob = SupervisorJob()
        val reopenedJob = SupervisorJob()
        try {
            val initial = PreferenceDataStoreFactory.create(
                scope = CoroutineScope(Dispatchers.IO + initialJob), produceFile = { file }
            )
            val result = TestResult(42, listOf(0, 25, 50, 75, 100))
            val preferences = CastasPreferences(initial)
            assertNull(preferences.load().result)
            preferences.setLanguage(AppLanguage.Spanish)
            preferences.saveResult(result)
            initialJob.cancelAndJoin()

            val reopened = PreferenceDataStoreFactory.create(
                scope = CoroutineScope(Dispatchers.IO + reopenedJob), produceFile = { file }
            )
            val restored = CastasPreferences(reopened)
            assertEquals(result, restored.load().result)
            assertEquals(AppLanguage.Spanish, restored.load().language)
            reopened.edit { it[stringPreferencesKey("result_scores")] = "0,25,invalid,50,75,100" }
            assertNull(restored.load().result)
        } finally {
            initialJob.cancelAndJoin()
            reopenedJob.cancelAndJoin()
            file.delete()
        }
    }
}
