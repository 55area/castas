import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export function About() {
  const { t } = useTranslation();

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

        {/* Banner Image */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/about-banner.jpg"
            alt="Political Polarization in Brazil"
            className="w-full max-w-2xl rounded-lg shadow-lg"
          />
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-8"
        >
          👋 {t('about.title')}
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 text-gray-300 leading-relaxed"
        >
          <p>{t('about.intro')}</p>
          <p>{t('about.body')}</p>
          <p>{t('about.closing')}</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            {t('about.howItWorks')}
          </h2>
          <p>{t('about.howItWorksIntro')}</p>
          <p>{t('about.dimensionsIntro')}</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong className="text-castas-orange">{t('dimensions.a')}:</strong> {t('about.dimensions.a')}</li>
            <li><strong className="text-castas-orange">{t('dimensions.b')}:</strong> {t('about.dimensions.b')}</li>
            <li><strong className="text-castas-orange">{t('dimensions.c')}:</strong> {t('about.dimensions.c')}</li>
            <li><strong className="text-castas-orange">{t('dimensions.d')}:</strong> {t('about.dimensions.d')}</li>
            <li><strong className="text-castas-orange">{t('dimensions.e')}:</strong> {t('about.dimensions.e')}</li>
          </ul>

          <p className="mt-6">{t('about.scoringIntro')}</p>

          <ul className="list-disc list-inside space-y-1 ml-4 text-castas-orange">
            <li>3 pts: {t('about.scoring.stronglyAgree')}</li>
            <li>2 pts: {t('about.scoring.somewhatAgree')}</li>
            <li>1 pts: {t('about.scoring.somewhatDisagree')}</li>
            <li>0 pt: {t('about.scoring.stronglyDisagree')}</li>
          </ul>

          <p className="mt-6">{t('about.resultExample')}</p>

          {/* Example Result Grid */}
          <div className="bg-castas-darker rounded-lg p-6 mt-6 text-center">
            <div className="font-mono text-xl sm:text-2xl space-y-1">
              <div>💙💙💙💙🤬</div>
              <div>💙💙💙💙🤬</div>
              <div>💙💙💙💙🤬</div>
              <div>💙💙💙💙🤬</div>
              <div>💙💙💙💙🤬</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default About;
