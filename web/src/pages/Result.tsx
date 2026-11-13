import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { EmojiGrid } from '../components/EmojiGrid';
import { EmojiPickerButton } from '../components/EmojiPicker';
import { generateShareableText } from '../utils/scoring';
import { cn } from '../lib/utils';

interface CastasResult {
  timestamp: string;
  pcIdxDims: number[];
}

const STORAGE_KEY = 'castas_struct';

// Dimension translation keys in order
const DIMENSION_KEYS = ['dimensions.a', 'dimensions.b', 'dimensions.c', 'dimensions.d', 'dimensions.e'];

export function Result() {
  const { t } = useTranslation();
  const [result, setResult] = useState<CastasResult | null>(null);
  const [positiveEmoji, setPositiveEmoji] = useState('💙');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load result from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CastasResult;
        setResult(parsed);
      }
    } catch (error) {
      console.error('Error loading result:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get dimension names for current language
  const dimensionNames = DIMENSION_KEYS.map((key) => t(key));

  // Handle copy to clipboard
  const handleCopy = useCallback(() => {
    if (!result) return;

    const text = generateShareableText({
      scores: result.pcIdxDims,
      positiveEmoji,
      negativeEmoji: '🤬',
      title: t('result.copiedTitle'),
      subtitle: t('result.copiedSubtitle'),
      dimensionNames,
      takeTestLink: t('result.copiedLink'),
    });

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((error) => {
      console.error('Error copying to clipboard:', error);
    });
  }, [result, positiveEmoji, t, dimensionNames]);

  // Handle emoji change
  const handleEmojiChange = useCallback((emoji: string) => {
    setPositiveEmoji(emoji);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">{t('common.loading')}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'w-full max-w-2xl text-center',
            'bg-black',
            'border border-white/20',
            'shadow-glow rounded-lg p-8 sm:p-12'
          )}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-castas-orange hover:text-castas-orange-light mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('common.back')}</span>
          </Link>

          <h1 className="text-3xl font-bold mb-4">{t('result.title')}</h1>
          <p className="text-gray-400 mb-8">
            You haven't completed the test yet. Take the test to see your results.
          </p>

          <Link to="/test" className="btn text-lg px-8 py-4">
            {t('home.startTest')}
          </Link>
        </motion.div>
      </div>
    );
  }

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

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-8"
        >
          {t('result.title')}
        </motion.h1>

        {/* Progress Bars for each dimension */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 mb-10"
        >
          {result.pcIdxDims.map((score, index) => (
            <ProgressBar
              key={index}
              value={score}
              label={dimensionNames[index]}
              showLabel
              size="md"
            />
          ))}
        </motion.div>

        <hr className="border-castas-dark mb-8" />

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold mb-6">
            {t('result.shareTitle')}
          </h2>

          {/* Emoji Picker and Share Button */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            <EmojiPickerButton
              currentEmoji={positiveEmoji}
              onEmojiSelect={handleEmojiChange}
              buttonClassName="w-full sm:w-auto"
            />

            <button
              onClick={handleCopy}
              className={cn(
                'btn flex items-center justify-center gap-2 w-full sm:w-auto',
                copied && 'bg-green-600 border-green-600'
              )}
              aria-label={copied ? t('result.copied') : t('result.share')}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>{t('result.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>{t('result.share')}</span>
                </>
              )}
            </button>
          </div>

          {/* Emoji Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-castas-darker rounded-lg p-6 inline-block"
          >
            <EmojiGrid
              scores={result.pcIdxDims}
              positiveEmoji={positiveEmoji}
              negativeEmoji="🤬"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Result;
