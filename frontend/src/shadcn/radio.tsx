import * as React from 'react';
import * as RadioPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/cn';
import { CheckIcon } from 'lucide-react';

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioPrimitive.Item
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground  data-[state=checked]:border-secondary' ,
      className
    )}
    {...props}
  >
    <RadioPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <CheckIcon className="h-4 w-4" />
    </RadioPrimitive.Indicator>
  </RadioPrimitive.Item>
));
Radio.displayName = 'Radio';

export { Radio };
