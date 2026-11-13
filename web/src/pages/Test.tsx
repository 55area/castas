import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { questions } from '../data/questions';
import { dimensions, TOTAL_QUESTIONS, TOTAL_DIMENSIONS, QUESTIONS_PER_DIMENSION } from '../data/dimensions';
import { calculateAllScores, ANSWER_OPTIONS } from '../utils/scoring';
import { cn } from '../lib/utils';

const STORAGE_KEY = 'castas_struct';

export function Test() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];
  const currentDimensionIndex = Math.floor(currentQuestionIndex / QUESTIONS_PER_DIMENSION);
  const currentDimension = dimensions[currentDimensionIndex];
  const questionInDimension = (currentQuestionIndex % QUESTIONS_PER_DIMENSION) + 1;

  // Get current language for question text
  const currentLang = i18n.language as 'pt-BR' | 'en' | 'es';
  const questionText = currentQuestion.text[currentLang] || currentQuestion.text['pt-BR'];

  // Save result to localStorage
  const saveResult = useCallback((scores: number[]) => {
    const result = {
      timestamp: new Date().toISOString(),
      pcIdxDims: scores,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } catch (error) {
      console.error('Error saving result:', error);
    }
  }, []);

  // Handle answer selection
  const handleAnswer = useCallback((answerIndex: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    // Check if this was the last question
    if (currentQuestionIndex === TOTAL_QUESTIONS - 1) {
      // Calculate scores and save result
      const scores = calculateAllScores(newAnswers);
      saveResult(scores);
      
      // Navigate to result page after a short delay
      setTimeout(() => {
        navigate('/result');
      }, 500);
    } else {
      // Move to next question after animation
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  }, [answers, currentQuestionIndex, isAnimating, navigate, saveResult]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'w-full max-w-3xl',
          'bg-black',
          'border border-white/20',
          'shadow-glow',
          'rounded-lg p-8 sm:p-12'
        )}
      >
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-castas-orange hover:text-castas-orange-light mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('common.back')}</span>
        </Link>

        {/* Dimension and Question Info */}
        <div className="text-center mb-8">
          <p className="text-gray-400 mb-2">
            {t('test.dimensionOf', { 
              current: currentDimensionIndex + 1, 
              total: TOTAL_DIMENSIONS 
            })}
          </p>
          <p className="text-castas-orange font-bold text-lg">
            {t(currentDimension.key)}
          </p>
        </div>

        <hr className="border-castas-dark mb-8" />

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-400 mb-4">
              {t('test.questionOf', { 
                current: questionInDimension, 
                total: QUESTIONS_PER_DIMENSION 
              })}
            </p>

            <p className="text-xl sm:text-2xl text-white mb-8 leading-relaxed">
              {questionText}
            </p>

            {/* Answer Options */}
            <div className="space-y-2 sm:space-y-3 mb-8">
              {ANSWER_OPTIONS.map((option, index) => (
                <label
                  key={index}
                  className={cn(
                    'flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg cursor-pointer',
                    'bg-castas-darker active:bg-castas-dark hover:bg-castas-dark',
                    'border border-transparent hover:border-castas-orange active:border-castas-orange',
                    'transition-all duration-200',
                    'group touch-manipulation'
                  )}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    onChange={() => handleAnswer(index)}
                    disabled={isAnimating}
                    className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6"
                    aria-label={t(option.labelKey)}
                  />
                  <span className="text-sm sm:text-base text-white group-hover:text-castas-orange group-active:text-castas-orange transition-colors">
                    {t(option.labelKey)}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress */}
        <hr className="border-castas-dark mb-6" />
        
        <div className="flex justify-between items-center text-gray-400 mb-2">
          <span>{t('test.overallProgress')}</span>
          <span>{t('test.overallProgressValue', { 
            current: currentQuestionIndex + 1, 
            total: TOTAL_QUESTIONS 
          })}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-castas-darker rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-castas-orange to-castas-orange-light"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Test;
