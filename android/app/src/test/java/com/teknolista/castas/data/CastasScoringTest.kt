package com.teknolista.castas.data

import org.junit.Assert.assertEquals
import org.junit.Assert.assertThrows
import org.junit.Test

class CastasScoringTest {
    @Test
    fun `all strongly agree produces maximum scores`() {
        assertEquals(listOf(100, 100, 100, 100, 100), CastasScoring.calculate(List(40) { 0 }, 7).scores)
    }

    @Test
    fun `all strongly disagree produces zero scores`() {
        assertEquals(listOf(0, 0, 0, 0, 0), CastasScoring.calculate(List(40) { 3 }, 7).scores)
    }

    @Test
    fun `mixed boundary responses are scored per dimension`() {
        val answers = List(8) { 1 } + List(8) { 2 } + List(24) { 3 }
        assertEquals(listOf(67, 33, 0, 0, 0), CastasScoring.calculate(answers, 7).scores)
    }

    @Test
    fun `question and response counts are validated`() {
        assertThrows(IllegalArgumentException::class.java) { CastasScoring.calculate(List(39) { 0 }) }
        assertThrows(IllegalArgumentException::class.java) { CastasScoring.calculate(List(40) { 4 }) }
    }

    @Test
    fun `emoji thresholds match the reference ranges`() {
        val cases = listOf(0 to 5, 1 to 4, 24 to 4, 25 to 3, 50 to 3, 51 to 2, 74 to 2, 75 to 1, 99 to 1, 100 to 0)
        cases.forEach { (score, expected) -> assertEquals(score.toString(), expected, CastasScoring.positiveEmojiCount(score)) }
    }

    @Test
    fun `share text includes scores and custom emoji grid`() {
        val result = TestResult(7, listOf(100, 75, 51, 25, 0))
        val text = CastasScoring.shareText(result, "⭐", listOf("A", "B", "C", "D", "E"), ShareLabels("CASTAS", "Test", "Take test:"))
        assertEquals(true, text.contains("⭐🤬🤬🤬🤬"))
        assertEquals(true, text.contains("100% A"))
        assertEquals(true, text.contains("https://www.castas.top"))
    }
}
