import Header from '@/components/Header/header';
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';
import Footer from '@/components/Footer/footer';
//import Footer from '@/components/Footer/footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: 'Great Recipes',
  description: 'Find great recipes here!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-softWhite text-gray-900 min-h-screen flex flex-col`}>
        <ThemeProvider>

          <Header />
          <main className="flex-grow font-normal">
            {children}
          </main>
          <Footer />

        </ThemeProvider>
      </body>
    </html>
  );
}
