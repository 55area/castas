package com.teknolista.castas

import com.teknolista.castas.data.AppLanguage
import com.teknolista.castas.data.CastasStore
import com.teknolista.castas.data.SavedCastas
import com.teknolista.castas.data.TestResult
import java.io.IOException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.Assert.*
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class CastasViewModelTest {
    private class Store : CastasStore {
        var saved = SavedCastas(AppLanguage.Portuguese, null)
        var failRead = false
        var failWrite = false
        var writes = 0

        override suspend fun load(): SavedCastas {
            if (failRead) throw IOException("synthetic read failure")
            return saved
        }

        override suspend fun setLanguage(language: AppLanguage) {
            if (failWrite) throw IOException("synthetic language failure")
            saved = saved.copy(language = language)
        }

        override suspend fun saveResult(result: TestResult) {
            if (failWrite) throw IOException("synthetic write failure")
            writes++
            saved = saved.copy(result = result)
        }
    }

    @Test
    fun oneAnswerPerQuestionAndAbandonCancelsPendingAdvance() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        try {
            val store = Store()
            val model = CastasViewModel(store)
            advanceUntilIdle()
            model.answer(0, 0)
            model.answer(0, 3)
            advanceUntilIdle()
            assertEquals(1, model.questionIndex)
            model.answer(1, 0)
            model.startOver()
            advanceUntilIdle()
            assertEquals(0, model.questionIndex)
            assertEquals(0, store.writes)
            assertNull(store.saved.result)
        } finally {
            Dispatchers.resetMain()
        }
    }

    @Test
    fun failedWriteKeepsOldResultAndRetriesTheSameCompletedAttempt() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        try {
            val old = TestResult(1, List(5) { 42 })
            val store = Store().apply {
                saved = saved.copy(result = old)
                failWrite = true
            }
            val model = CastasViewModel(store)
            advanceUntilIdle()
            repeat(40) {
                model.answer(it, 3)
                advanceUntilIdle()
            }
            assertTrue(model.saveFailed)
            assertFalse(model.resultReady)
            assertEquals(old, model.result)
            assertEquals(old, store.saved.result)
            store.failWrite = false
            model.save()
            model.save()
            advanceUntilIdle()
            assertTrue(model.resultReady)
            assertEquals(List(5) { 0 }, model.result?.scores)
            assertEquals(1, store.writes)
            assertEquals(model.result, store.saved.result)
        } finally {
            Dispatchers.resetMain()
        }
    }

    @Test
    fun startupAndLanguageWritesCanRecover() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        try {
            val store = Store().apply { failRead = true }
            val model = CastasViewModel(store)
            advanceUntilIdle()
            assertTrue(model.loadFailed)
            assertFalse(model.loading)
            store.failRead = false
            model.load()
            advanceUntilIdle()
            assertFalse(model.loadFailed)
            store.failWrite = true
            model.changeLanguage(AppLanguage.Spanish)
            advanceUntilIdle()
            assertTrue(model.languageFailed)
            assertEquals(AppLanguage.Portuguese, model.language)
            store.failWrite = false
            model.changeLanguage(AppLanguage.Spanish)
            advanceUntilIdle()
            assertFalse(model.languageFailed)
            assertEquals(AppLanguage.Spanish, model.language)
            assertEquals(AppLanguage.Spanish, store.saved.language)
        } finally {
            Dispatchers.resetMain()
        }
    }
}
