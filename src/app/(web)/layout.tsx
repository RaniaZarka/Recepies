import Header from '@/components/Header/header';
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer/footer';
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';

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

      <body className={`${poppins.className} bg-softWhite text-gray-900`}>
        <ThemeProvider>
          <main className='font-normal'>
            <Header />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
