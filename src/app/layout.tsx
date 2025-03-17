import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans, Permanent_Marker } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-noto-sans',
})

const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-permanent-marker',
})

export const metadata: Metadata = {
  title: "What are you looking at?",
  description: "A little part of the internet that I call home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${permanentMarker.variable}`}>
      <body className="min-h-screen font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
