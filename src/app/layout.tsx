import type { Metadata } from 'next'
import { Syne, Manrope } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
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
      className={`${syne.variable} ${manrope.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
