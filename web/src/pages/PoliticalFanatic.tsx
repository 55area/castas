import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export function PoliticalFanatic() {
  const { t } = useTranslation();
  
  // Get the content array
  const content = t('politicalFanatic.content', { returnObjects: true }) as string[];

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
          🤬 {t('politicalFanatic.title')}
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 text-gray-300 leading-relaxed text-center"
        >
          {Array.isArray(content) && content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <p className="text-gray-500 italic mt-8">
            {t('politicalFanatic.adaptation')}
          </p>

          {/* Ariano Suassuna Image */}
          <div className="flex justify-center mt-10">
            <img
              src="/images/ariano-suassuna.jpg"
              alt="Ariano Suassuna Quote"
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
          </div>

          {/* Emoticon */}
          <p className="text-2xl mt-8">
            ¯\_(ツ)_/¯
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PoliticalFanatic;
