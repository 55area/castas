import { useState, useCallback } from 'react';
import { TOTAL_QUESTIONS, QUESTIONS_PER_DIMENSION } from '../data/dimensions';

export interface CastasResult {
  timestamp: string;
  pcIdxDims: number[]; // 5 dimension scores
}

export interface TestState {
  currentQuestionIndex: number;
  answers: number[];
  isComplete: boolean;
  result: CastasResult | null;
}

const STORAGE_KEY = 'castas_struct';

/**
 * Custom hook for managing test state
 */
export function useTestState() {
  const [state, setState] = useState<TestState>({
    currentQuestionIndex: 0,
    answers: [],
    isComplete: false,
    result: null,
  });

  // Get current dimension (0-4)
  const currentDimension = Math.floor(state.currentQuestionIndex / QUESTIONS_PER_DIMENSION);

  // Get question index within current dimension (0-7)
  const questionInDimension = state.currentQuestionIndex % QUESTIONS_PER_DIMENSION;

  // Calculate progress percentage
  const progress = Math.round((state.currentQuestionIndex / TOTAL_QUESTIONS) * 100);

  // Check if there's a saved result in localStorage
  const hasSavedResult = useCallback((): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored !== null;
    } catch {
      return false;
    }
  }, []);

  // Load saved result from localStorage
  const loadSavedResult = useCallback((): CastasResult | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as CastasResult;
      }
    } catch (error) {
      console.error('Error loading saved result:', error);
    }
    return null;
  }, []);

  // Save result to localStorage
  const saveResult = useCallback((result: CastasResult) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } catch (error) {
      console.error('Error saving result:', error);
    }
  }, []);

  // Start the test
  const startTest = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      answers: [],
      isComplete: false,
      result: null,
    });
  }, []);

  // Answer current question
  const answerQuestion = useCallback((answerIndex: number) => {
    setState((prev) => ({
      ...prev,
      answers: [...prev.answers, answerIndex],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  }, []);

  // Complete the test and calculate results
  const completeTest = useCallback(
    (calculateScores: (answers: number[]) => number[]): CastasResult => {
      const scores = calculateScores(state.answers);
      const result: CastasResult = {
        timestamp: new Date().toISOString(),
        pcIdxDims: scores,
      };

      saveResult(result);

      setState((prev) => ({
        ...prev,
        isComplete: true,
        result,
      }));

      return result;
    },
    [state.answers, saveResult]
  );

  return {
    state,
    currentDimension,
    questionInDimension,
    progress,
    startTest,
    answerQuestion,
    completeTest,
    hasSavedResult,
    loadSavedResult,
  };
}

export default useTestState;
