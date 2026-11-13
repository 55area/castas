import { cn } from '../lib/utils';
import { getEmojiRow, getPositiveEmojiCount } from '../utils/scoring';

interface EmojiGridProps {
  scores: number[];
  positiveEmoji: string;
  negativeEmoji: string;
  className?: string;
}

export function EmojiGrid({
  scores,
  positiveEmoji,
  negativeEmoji,
  className,
}: EmojiGridProps) {
  return (
    <div
      className={cn(
        'font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed',
        'flex flex-col items-center gap-0.5 sm:gap-1',
        className
      )}
      aria-label="Emoji grid showing test results"
    >
      {scores.map((score, index) => (
        <div
          key={index}
          className={cn(
            'tracking-wider',
            'transition-all duration-300'
          )}
        >
          {getEmojiRow(score, positiveEmoji, negativeEmoji)}
        </div>
      ))}
    </div>
  );
}

interface EmojiRowProps {
  score: number;
  positiveEmoji: string;
  negativeEmoji: string;
  className?: string;
}

export function EmojiRow({
  score,
  positiveEmoji,
  negativeEmoji,
  className,
}: EmojiRowProps) {
  return (
    <div
      className={cn(
        'font-mono text-xl sm:text-2xl tracking-wider',
        className
      )}
    >
      {getEmojiRow(score, positiveEmoji, negativeEmoji)}
    </div>
  );
}

export { getEmojiRow, getPositiveEmojiCount };
export default EmojiGrid;
