import * as React from 'react';
import { cn } from '@/lib/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-2">
        {label && <p className="text-primary text-sm font-bold">{label}</p>}
        <input
          type={type}
          className={cn(
            `mt-1 flex h-10 w-full rounded-md border 
            border-input  px-3 py-2 text-sm text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 
            focus:outline-border focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent focus:border-none`,
            className,
            error && 'border-destructive'
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
