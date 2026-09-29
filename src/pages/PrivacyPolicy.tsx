import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export function PrivacyPolicy() {
  const { t } = useTranslation();

  // Get section keys
  const sectionKeys = [
    'acceptance',
    'about',
    'data',
    'sharing',
    'clearData',
    'spam',
  ];

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
          🛡️ {t('privacyPolicy.title')}
        </motion.h1>

        {/* Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 text-gray-300 leading-relaxed"
        >
          {sectionKeys.map((key, index) => (
            <section key={key}>
              <h2 className="text-xl font-bold text-castas-orange mb-2">
                {index + 1}. {t(`privacyPolicy.sections.${key}.title`)}
              </h2>
              
              {/* Main content if exists */}
              {t(`privacyPolicy.sections.${key}.content`, { defaultValue: '' }) && (
                <p>{t(`privacyPolicy.sections.${key}.content`, { defaultValue: '' })}</p>
              )}
              
              {/* Note if exists */}
              {t(`privacyPolicy.sections.${key}.note`, { defaultValue: '' }) && (
                <p className="mt-2 text-gray-400">{t(`privacyPolicy.sections.${key}.note`, { defaultValue: '' })}</p>
              )}
              
              {/* Items if exist */}
              {(() => {
                const items = t(`privacyPolicy.sections.${key}.items`, { returnObjects: true });
                if (Array.isArray(items) && items.length > 0) {
                  return (
                    <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })()}
            </section>
          ))}

          {/* Last Updated */}
          <p className="text-gray-500 text-sm mt-8 pt-4 border-t border-castas-dark">
            {t('privacyPolicy.lastUpdated')}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PrivacyPolicy;
