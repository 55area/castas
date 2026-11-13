export interface Dimension {
  id: 'a' | 'b' | 'c' | 'd' | 'e';
  key: string;
  questionCount: number;
}

export const dimensions: Dimension[] = [
  { id: 'a', key: 'dimensions.a', questionCount: 8 },
  { id: 'b', key: 'dimensions.b', questionCount: 8 },
  { id: 'c', key: 'dimensions.c', questionCount: 8 },
  { id: 'd', key: 'dimensions.d', questionCount: 8 },
  { id: 'e', key: 'dimensions.e', questionCount: 8 },
];

export const TOTAL_DIMENSIONS = dimensions.length;
export const QUESTIONS_PER_DIMENSION = 8;
export const TOTAL_QUESTIONS = TOTAL_DIMENSIONS * QUESTIONS_PER_DIMENSION;
