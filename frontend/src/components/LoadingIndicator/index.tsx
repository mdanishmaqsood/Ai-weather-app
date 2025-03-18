import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

interface LoadingIndicatorProps {
  message?: string;
  className?: string;
}

export function LoadingIndicator({
  message = 'Loading...',
  className,
}: LoadingIndicatorProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-muted-foreground animate-pulse',
        className
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{message}</span>
    </div>
  );
}
