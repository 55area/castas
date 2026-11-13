import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LanguageSelector } from '../components/LanguageSelector';
import { cn } from '../lib/utils';

const STORAGE_KEY = 'castas_struct';

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hasResult, setHasResult] = useState(false);

  // Check if there's a saved result
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setHasResult(stored !== null);
    } catch {
      setHasResult(false);
    }
  }, []);

  const handleStartTest = () => {
    navigate('/test');
  };

  const handleViewResult = () => {
    navigate('/result');
  };

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
          'rounded-lg p-8 sm:p-12',
          'glow-effect'
        )}
      >
        {/* Language Selector - Top Left */}
        <div className="flex justify-start mb-8">
          <LanguageSelector />
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2"
        >
          🤬 Castas
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6"
        >
          {t('app.subtitle')}
        </motion.h2>

        {/* Political Fanatic Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <Link
            to="/political-fanatic"
            className={cn(
              'btn text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2 sm:py-3',
              'hover:scale-105 transform transition-transform'
            )}
          >
            👉 {t('politicalFanatic.title')} 👈
          </Link>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed text-center"
        >
          {t('home.description')}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8"
        >
          <button
            onClick={handleStartTest}
            className={cn(
              'btn text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4',
              'hover:scale-105 transform transition-transform',
              'w-full sm:w-auto'
            )}
            aria-label={t('home.startTest')}
          >
            {t('home.startTest')}
          </button>

          <button
            onClick={handleViewResult}
            disabled={!hasResult}
            className={cn(
              'btn text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4',
              'hover:scale-105 transform transition-transform',
              'w-full sm:w-auto',
              !hasResult && 'opacity-50 cursor-not-allowed hover:scale-100'
            )}
            aria-label={t('home.viewResult')}
            title={!hasResult ? 'Complete the test first to view results' : undefined}
          >
            {t('home.viewResult')}
          </button>
        </motion.div>

        {/* Share Prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-center text-gray-400 mb-8"
        >
          {t('home.sharePrompt')}
        </motion.p>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-6 text-sm sm:text-base"
        >
          <Link
            to="/about"
            className="font-bold hover:underline mx-1 sm:mx-2"
          >
            {t('home.about')}
          </Link>
          <span className="text-gray-500 mx-1">|</span>
          <Link
            to="/terms-of-use"
            className="font-bold hover:underline mx-1 sm:mx-2"
          >
            {t('home.termsOfUse')}
          </Link>
          <span className="text-gray-500 mx-1">|</span>
          <Link
            to="/privacy-policy"
            className="font-bold hover:underline mx-1 sm:mx-2"
          >
            {t('home.privacyPolicy')}
          </Link>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-xs sm:text-sm"
        >
          <p className="mb-1">
            {t('home.copyrightBefore')}{' '}
            <a
              href="https://x.com/teknolista"
              target="_blank"
              rel="noopener noreferrer"
              className="text-castas-orange hover:underline"
            >
              Raul Bras
            </a>{' '}
            {t('home.copyrightMiddle')}{' '}
            <a
              href="https://www.gnu.org/licenses/gpl-3.0.pt-br.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-castas-orange hover:underline"
            >
              {t('home.copyrightLicense')}
            </a>
          </p>
          <p>
            {t('home.madeInBefore')}{' '}
            <a
              href="https://pt.wikipedia.org/wiki/Osasco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-castas-orange hover:underline"
            >
              {t('home.madeInPlace')}
            </a>{' '}
            {t('home.madeInAfter')}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
