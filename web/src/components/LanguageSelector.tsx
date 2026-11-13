import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-castas-darker hover:bg-castas-dark',
          'border border-castas-dark hover:border-castas-orange',
          'text-white text-sm font-bold',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-castas-orange focus:ring-offset-2 focus:ring-offset-black'
        )}
        aria-label={t('home.language')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4 text-castas-orange" />
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.label}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <ul
          className={cn(
            'absolute top-full left-0 mt-2 z-50',
            'bg-castas-darker border border-castas-dark rounded-lg',
            'shadow-lg overflow-hidden',
            'min-w-[160px]'
          )}
          role="listbox"
        >
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2',
                  'text-left text-sm',
                  'hover:bg-castas-dark transition-colors',
                  i18n.language === lang.code
                    ? 'text-castas-orange bg-castas-dark/50'
                    : 'text-white'
                )}
                role="option"
                aria-selected={i18n.language === lang.code}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSelector;
