import { inter } from '@/components/fonts/fonts';
import './globals.css'


export const metadata = {
  title: 'PurrchasePalace',
  description: 'simple e-commerce website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
