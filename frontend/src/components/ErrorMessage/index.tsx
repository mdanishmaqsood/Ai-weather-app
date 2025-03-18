'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/shadcn/button';
import { Alert, AlertDescription, AlertTitle } from '@/shadcn/alert';

interface ErrorMessageProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export function ErrorMessage({
  title = 'Something went wrong',
  message,
  retry,
}: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{message}</p>
        {retry && (
          <Button
            variant="outline"
            size="sm"
            className="w-fit mt-2 gap-2"
            onClick={retry}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
