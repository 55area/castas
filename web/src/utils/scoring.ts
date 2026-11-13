/**
 * Scoring utility functions for the Castas test
 * Based on 4-point Likert scale
 */

// Likert scale point values (index matches answer option: 0-3)
export const LIKERT_POINTS = [3, 2, 1, 0]; // Strongly agree -> Strongly disagree

export const ANSWER_OPTIONS = [
  { value: 0, labelKey: 'test.options.stronglyAgree' },
  { value: 1, labelKey: 'test.options.somewhatAgree' },
  { value: 2, labelKey: 'test.options.somewhatDisagree' },
  { value: 3, labelKey: 'test.options.stronglyDisagree' },
];

/**
 * Calculate score for a single dimension
 * @param answers - Array of answer indices (0-3) for 8 questions
 * @returns Score percentage (0-100)
 */
export function calculateDimensionScore(answers: number[]): number {
  if (answers.length !== 8) {
    throw new Error('Each dimension must have exactly 8 answers');
  }

  const sum = answers.reduce((acc, answerIndex) => {
    return acc + LIKERT_POINTS[answerIndex];
  }, 0);

  // Max possible score: 8 questions * 3 points = 24
  // Formula: round(sum / 24 * 100)
  return Math.round((sum / 24) * 100);
}

/**
 * Calculate scores for all 5 dimensions
 * @param allAnswers - Array of 40 answer indices (0-3)
 * @returns Array of 5 dimension scores (0-100)
 */
export function calculateAllScores(allAnswers: number[]): number[] {
  if (allAnswers.length !== 40) {
    throw new Error('Test must have exactly 40 answers');
  }

  const scores: number[] = [];
  for (let i = 0; i < 5; i++) {
    const dimensionAnswers = allAnswers.slice(i * 8, (i + 1) * 8);
    scores.push(calculateDimensionScore(dimensionAnswers));
  }

  return scores;
}

/**
 * Get emoji row representation based on score
 * @param score - Score percentage (0-100)
 * @param positiveEmoji - Positive emoji (default: 💙)
 * @param negativeEmoji - Negative emoji (default: 🤬)
 * @returns String with 5 emojis
 */
export function getEmojiRow(
  score: number,
  positiveEmoji: string = '💙',
  negativeEmoji: string = '🤬'
): string {
  const positiveCount = getPositiveEmojiCount(score);
  return positiveEmoji.repeat(positiveCount) + negativeEmoji.repeat(5 - positiveCount);
}

/**
 * Get the number of positive emojis based on score
 * @param score - Score percentage (0-100)
 * @returns Number of positive emojis (0-5)
 */
export function getPositiveEmojiCount(score: number): number {
  if (score === 0) return 5;
  if (score <= 24) return 4;
  if (score <= 50) return 3;
  if (score <= 74) return 2;
  if (score <= 99) return 1;
  return 0; // 100%
}

/**
 * Generate the full emoji grid for sharing
 * @param scores - Array of 5 dimension scores
 * @param positiveEmoji - Positive emoji (default: 💙)
 * @param negativeEmoji - Negative emoji (default: 🤬)
 * @returns 5 rows of 5 emojis each
 */
export function getEmojiGrid(
  scores: number[],
  positiveEmoji: string = '💙',
  negativeEmoji: string = '🤬'
): string[] {
  return scores.map((score) => getEmojiRow(score, positiveEmoji, negativeEmoji));
}

interface ShareableTextOptions {
  scores: number[];
  positiveEmoji?: string;
  negativeEmoji?: string;
  title: string;
  subtitle: string;
  dimensionNames: string[];
  takeTestLink: string;
}

/**
 * Generate shareable text for clipboard
 * @param options - Options for shareable text generation
 * @returns Formatted text for sharing
 */
export function generateShareableText({
  scores,
  positiveEmoji = '💙',
  negativeEmoji = '🤬',
  title,
  subtitle,
  dimensionNames,
  takeTestLink,
}: ShareableTextOptions): string {
  const emojiGrid = getEmojiGrid(scores, positiveEmoji, negativeEmoji);

  const lines = [
    `🤬 ${title}`,
    subtitle,
    '',
    '\t\t' + emojiGrid[0],
    '\t\t' + emojiGrid[1],
    '\t\t' + emojiGrid[2],
    '\t\t' + emojiGrid[3],
    '\t\t' + emojiGrid[4],
    '',
    ...scores.map((score, i) => `${score.toString().padStart(2, '0')}% ${dimensionNames[i]}`),
    '',
    takeTestLink,
    '    https://www.castas.top',
  ];

  return lines.join('\n');
}

/**
 * Dimension names for display
 */
export const DIMENSION_NAMES = {
  a: 'dimensions.a',
  b: 'dimensions.b',
  c: 'dimensions.c',
  d: 'dimensions.d',
  e: 'dimensions.e',
} as const;

export const DIMENSION_IDS = ['a', 'b', 'c', 'd', 'e'] as const;
