package com.teknolista.castas.data

import kotlin.math.roundToInt

enum class AppLanguage(val code: String, val label: String) {
    Portuguese("pt-BR", "🇧🇷 Português"),
    English("en", "🇺🇸 English"),
    Spanish("es", "🇪🇸 Español");

    companion object {
        fun fromCode(code: String?): AppLanguage = entries.firstOrNull { it.code == code } ?: Portuguese
    }
}

data class CastasQuestion(val id: Int, val dimension: Int, val text: String)

data class TestResult(val timestamp: Long, val scores: List<Int>) {
    init { require(scores.size == 5 && scores.all { it in 0..100 }) }
}

object CastasScoring {
    const val QUESTION_COUNT = 40
    const val QUESTIONS_PER_DIMENSION = 8
    val responsePoints = listOf(3, 2, 1, 0)

    fun calculate(answers: List<Int>, timestamp: Long = System.currentTimeMillis()): TestResult {
        require(answers.size == QUESTION_COUNT) { "A completed test must contain 40 answers" }
        require(answers.all { it in 0..3 }) { "Each response must be an option from 0 to 3" }
        val scores = (0 until 5).map { dimension ->
            val total = answers.subList(dimension * 8, dimension * 8 + 8).sumOf { responsePoints[it] }
            (total * 100.0 / 24.0).roundToInt()
        }
        return TestResult(timestamp, scores)
    }

    fun positiveEmojiCount(score: Int): Int {
        require(score in 0..100)
        return when (score) {
            0 -> 5
            in 1..24 -> 4
            in 25..50 -> 3
            in 51..74 -> 2
            in 75..99 -> 1
            else -> 0
        }
    }

    fun emojiRow(score: Int, positive: String = "💙", negative: String = "🤬"): String =
        positive.repeat(positiveEmojiCount(score)) + negative.repeat(5 - positiveEmojiCount(score))

    fun shareText(result: TestResult, positiveEmoji: String, dimensionNames: List<String>, labels: ShareLabels): String {
        require(dimensionNames.size == 5)
        val rows = result.scores.joinToString("\n") { "\t\t${emojiRow(it, positiveEmoji)}" }
        val dimensions = result.scores.zip(dimensionNames).joinToString("\n") { (score, name) ->
            "${score.toString().padStart(2, '0')}% $name"
        }
        return "🤬 ${labels.title}\n${labels.subtitle}\n\n$rows\n\n$dimensions\n\n${labels.takeTest}\n    https://www.castas.top"
    }
}

data class ShareLabels(val title: String, val subtitle: String, val takeTest: String)
