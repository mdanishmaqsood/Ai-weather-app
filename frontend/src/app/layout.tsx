import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import '@/styles/tailwind.css';
import StoreProvider from '@/store/store-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ai Weather',
  description: 'Ai Weather',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider attribute="class" enableSystem>
            <Toaster />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
