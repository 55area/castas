package com.teknolista.castas.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.longPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first

private val Context.castasStore by preferencesDataStore(name = "castas_preferences")

internal data class SavedCastas(val language: AppLanguage, val result: TestResult?)

internal interface CastasStore {
    suspend fun load(): SavedCastas
    suspend fun setLanguage(language: AppLanguage)
    suspend fun saveResult(result: TestResult)
}

internal class CastasPreferences(private val store: DataStore<Preferences>) : CastasStore {
    constructor(context: Context) : this(context.applicationContext.castasStore)

    private val timestampKey = longPreferencesKey("result_timestamp")
    private val scoresKey = stringPreferencesKey("result_scores")
    private val languageKey = stringPreferencesKey("language")

    override suspend fun load(): SavedCastas {
        val values = store.data.first()
        val timestamp = values[timestampKey]
        val scores = values[scoresKey]?.split(",")?.map { it.toIntOrNull() }
        val result = if (timestamp != null && scores?.size == 5 &&
            scores.all { it != null && it in 0..100 }
        ) {
            TestResult(timestamp, scores.filterNotNull())
        } else {
            null
        }
        return SavedCastas(AppLanguage.fromCode(values[languageKey]), result)
    }

    override suspend fun setLanguage(language: AppLanguage) {
        store.edit { it[languageKey] = language.code }
    }

    override suspend fun saveResult(result: TestResult) {
        store.edit {
            it[timestampKey] = result.timestamp
            it[scoresKey] = result.scores.joinToString(",")
        }
    }
}
