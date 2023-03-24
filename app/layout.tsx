import './global.css';

import { Open_Sans } from '@next/font/google';

const opensans = Open_Sans({
  weight: "300",
  subsets: ['latin'],
  display: 'swap',
  preload: false
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={opensans.className}>
      <head />
      <body>{children}</body>
    </html>
  )
}
