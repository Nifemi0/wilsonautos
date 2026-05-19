import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Wilson Express Autos | Drive Your Dream',
    template: '%s | Wilson Express Autos',
  },
  description:
    'Wilson Express Autos — Quality used cars at the best prices in Nigeria. Browse our inventory of tokunbo and Nigerian-used vehicles. Toyota, Honda, Lexus, BMW, Mercedes, and more.',
  keywords: ['used cars Nigeria', 'tokunbo cars', 'car dealership Lagos', 'Wilson Express Autos', 'buy used car Nigeria'],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://wilsonexpressautos.com',
    siteName: 'Wilson Express Autos',
    title: 'Wilson Express Autos | Drive Your Dream',
    description: 'Quality used cars at the best prices in Nigeria.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="antialiased bg-white text-black">{children}</body>
    </html>
  )
}
