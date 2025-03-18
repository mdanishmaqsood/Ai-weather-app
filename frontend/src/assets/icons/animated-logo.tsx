'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'dark';
  animated?: boolean;
}

export function AnimatedLogo({
  className,
  size = 'md',
  variant = 'default',
  animated = true,
}: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 2000);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [animated]);

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const colorClasses = {
    default: 'text-primary',
    light: 'text-white',
    dark: 'text-slate-900',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        className={cn(
          sizeClasses[size],
          colorClasses[variant],
          isAnimating && 'animate-pulse'
        )}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isAnimating ? 'animate-[dash_2s_ease-in-out]' : ''}
          strokeDasharray={isAnimating ? '60' : '0'}
          strokeDashoffset={isAnimating ? '60' : '0'}
        />
        <path
          d="M12 22V14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isAnimating ? 'animate-[dash_1.5s_ease-in-out_0.3s]' : ''}
          strokeDasharray={isAnimating ? '10' : '0'}
          strokeDashoffset={isAnimating ? '10' : '0'}
        />
        <path
          d="M12 14L20 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isAnimating ? 'animate-[dash_1.5s_ease-in-out_0.6s]' : ''}
          strokeDasharray={isAnimating ? '10' : '0'}
          strokeDashoffset={isAnimating ? '10' : '0'}
        />
        <path
          d="M12 14L4 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isAnimating ? 'animate-[dash_1.5s_ease-in-out_0.9s]' : ''}
          strokeDasharray={isAnimating ? '10' : '0'}
          strokeDashoffset={isAnimating ? '10' : '0'}
        />
        <path
          d="M12 2V8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isAnimating ? 'animate-[dash_1.5s_ease-in-out_1.2s]' : ''}
          strokeDasharray={isAnimating ? '10' : '0'}
          strokeDashoffset={isAnimating ? '10' : '0'}
        />
      </svg>
      <span
        className={cn(
          'font-semibold tracking-tight',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg',
          colorClasses[variant]
        )}
      >
        AI Assistant
      </span>
    </div>
  );
}
