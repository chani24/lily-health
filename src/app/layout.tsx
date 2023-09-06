import './globals.css'
import './components.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'


import TopNav from './_components/TopNav/TopNav';
import Footer from './_components/Footer/Footer';

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lily Health - A new platform of care for mothers.',
  description: 'Revolutionizing maternal care: Discover our innovative platform designed to empower and support mothers throughout their journey to motherhood. Join us for a new era of personalized, compassionate care.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <TopNav/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}