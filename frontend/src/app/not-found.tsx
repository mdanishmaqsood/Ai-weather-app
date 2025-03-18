import Link from 'next/link';
import { Button } from '@/shadcn/button';
import { ArrowLeft, FileSearch } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 text-center">
        <div className="mb-6 bg-green-50 p-6 rounded-full">
          <FileSearch className="h-16 w-16 text-primary" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Page not found
        </h1>

        <p className="text-lg text-gray-600 max-w-md mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-primary hover:bg-green-700">
            <Link href="/">Go back home</Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="border-primary text-primary hover:bg-green-50"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Chat
            </Link>
          </Button>
        </div>
      </div>

      <footer className="py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Ai Weather. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
