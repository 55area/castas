package com.teknolista.castas.data

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

class ContentRepository(private val context: Context) {
    private val contentCache = mutableMapOf<String, JSONObject>()
    private val questionCache = mutableMapOf<String, List<CastasQuestion>>()

    fun content(language: AppLanguage): JSONObject = contentCache.getOrPut(language.code) {
        JSONObject(context.assets.open("text-${language.code}.json").bufferedReader().use { it.readText() })
    }

    fun questions(language: AppLanguage): List<CastasQuestion> = questionCache.getOrPut(language.code) {
        val strings = JSONArray(context.assets.open("questions-${language.code}.json").bufferedReader().use { it.readText() })
        List(strings.length()) { index -> strings.getString(index) }.mapIndexed { index, text ->
            CastasQuestion(id = index + 1, dimension = index / 8, text = text)
        }
    }

    fun nestedString(language: AppLanguage, vararg keys: String): String {
        var current: Any = content(language)
        keys.forEach { key -> current = (current as JSONObject).get(key) }
        return current as String
    }

    fun stringArrayObject(language: AppLanguage, vararg keys: String): List<String> {
        var current: Any = content(language)
        keys.forEach { key -> current = (current as JSONObject).get(key) }
        val objectValue = current as JSONObject
        val orderedKeys = when (keys.lastOrNull()) {
            "dimensions" -> listOf("a", "b", "c", "d", "e")
            "options" -> listOf("stronglyAgree", "somewhatAgree", "somewhatDisagree", "stronglyDisagree")
            else -> objectValue.keys().asSequence().toList()
        }
        return orderedKeys.map { objectValue.getString(it) }
    }
}
