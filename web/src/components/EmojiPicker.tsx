import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { cn } from '../lib/utils';
import { X } from 'lucide-react';

interface EmojiPickerButtonProps {
  currentEmoji: string;
  onEmojiSelect: (emoji: string) => void;
  className?: string;
  buttonClassName?: string;
}

export function EmojiPickerButton({ currentEmoji, onEmojiSelect, className, buttonClassName }: EmojiPickerButtonProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    onEmojiSelect(emojiObject.emoji);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)} ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'btn flex items-center justify-center gap-2',
          isOpen && 'ring-2 ring-castas-orange',
          buttonClassName
        )}
        aria-label={t('result.changeEmoji')}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <>
            <X className="w-5 h-5" />
            <span>{t('result.close')}</span>
          </>
        ) : (
          <>
            <span>{currentEmoji}</span>
            <span>{t('result.changeEmoji')}</span>
          </>
        )}
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2',
            'z-50'
          )}
          role="dialog"
          aria-label={t('result.chooseEmoji')}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={Theme.DARK}
            lazyLoadEmojis
            width={320}
            height={400}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPickerButton;
