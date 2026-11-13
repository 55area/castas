package com.teknolista.castas

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.teknolista.castas.data.AppLanguage
import com.teknolista.castas.data.CastasScoring
import com.teknolista.castas.data.CastasStore
import com.teknolista.castas.data.TestResult
import java.io.IOException
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

internal class CastasViewModel(private val store: CastasStore) : ViewModel() {
    private val answers = mutableListOf<Int>()
    private var pendingResult: TestResult? = null
    private var advanceJob: Job? = null

    var language by mutableStateOf(AppLanguage.Portuguese)
        private set
    var result by mutableStateOf<TestResult?>(null)
        private set
    var loading by mutableStateOf(true)
        private set
    var loadFailed by mutableStateOf(false)
        private set
    var languageFailed by mutableStateOf(false)
        private set
    var changingLanguage by mutableStateOf(false)
        private set
    var saving by mutableStateOf(false)
        private set
    var saveFailed by mutableStateOf(false)
        private set
    var resultReady by mutableStateOf(false)
        private set
    var selectedOption by mutableStateOf<Int?>(null)
        private set
    var questionIndex by mutableIntStateOf(0)
        private set

    init {
        load()
    }

    fun load() {
        loading = true
        loadFailed = false
        viewModelScope.launch {
            try {
                val saved = store.load()
                language = saved.language
                result = saved.result
            } catch (_: IOException) {
                loadFailed = true
            } finally {
                loading = false
            }
        }
    }

    fun changeLanguage(requested: AppLanguage) {
        if (changingLanguage || requested == language) return
        changingLanguage = true
        languageFailed = false
        viewModelScope.launch {
            try {
                store.setLanguage(requested)
                language = requested
            } catch (_: IOException) {
                languageFailed = true
            } finally {
                changingLanguage = false
            }
        }
    }

    fun startOver() {
        advanceJob?.cancel()
        selectedOption = null
        answers.clear()
        pendingResult = null
        questionIndex = 0
        resultReady = false
        saveFailed = false
    }

    fun answer(displayedQuestion: Int, option: Int) {
        if (displayedQuestion != questionIndex || selectedOption != null ||
            pendingResult != null || resultReady
        ) return
        selectedOption = option
        advanceJob = viewModelScope.launch {
            delay(180)
            answers.add(option)
            selectedOption = null
            if (answers.size < CastasScoring.QUESTION_COUNT) {
                questionIndex = answers.size
            } else {
                pendingResult = CastasScoring.calculate(answers)
                answers.clear()
                save()
            }
        }
    }

    fun save() {
        val completed = pendingResult ?: return
        if (saving) return
        saving = true
        saveFailed = false
        viewModelScope.launch {
            try {
                store.saveResult(completed)
                result = completed
                pendingResult = null
                resultReady = true
            } catch (_: IOException) {
                saveFailed = true
            } finally {
                saving = false
            }
        }
    }
}
