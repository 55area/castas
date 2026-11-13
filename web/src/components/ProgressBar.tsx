import { cn } from '../lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  label,
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1 gap-2">
          {label && <span className="text-xs sm:text-sm text-gray-300 truncate">{label}</span>}
          {showLabel && (
            <span className="text-xs sm:text-sm font-bold text-castas-orange flex-shrink-0">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full bg-castas-darker rounded-full overflow-hidden',
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out',
            'bg-gradient-to-r from-castas-orange to-castas-orange-light'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
