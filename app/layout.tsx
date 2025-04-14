
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { EdgeStoreProvider } from '@/lib/edgestore';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Estatery',
  description: 'Real Estate Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
          <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
