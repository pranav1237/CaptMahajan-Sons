import './globals.css'
import React from 'react'
import CartDrawer from '../components/CartDrawer'
import Header from '../components/Header'
import WhatsAppButton from '../components/WhatsAppButton'
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0
}

export const metadata = {
  title: 'Capt. Mahajan & Sons KotaStone',
  description: 'Complete Stone & Tile Solutions Under One Roof',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23663399" width="100" height="100"/><text x="50" y="65" font-size="60" font-weight="bold" fill="white" text-anchor="middle">S</text></svg>'
    }
  ]
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/products/1.jpg" />
        <link rel="preload" as="image" href="/products/2.jpg" />
      </head>
      <body>
        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        <CartDrawer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
