import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Martian_Mono } from 'next/font/google'
import { GeistPixelGrid } from 'geist/font/pixel'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const martianMono = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OCULYX | Multi-Modal Inference Engine — Predict. Protect. Verify.',
  description:
    'OCULYX is the multi-modal inference engine that fuses video, audio, sensor telemetry, and behavioral signals into operational truth — structural integrity, threat probability, and authenticity confidence in real time.',
  keywords: [
    'multi-modal inference',
    'AI inference engine',
    'deepfake detection',
    'synthetic media verification',
    'surveillance intelligence',
    'structural health monitoring',
    'anomaly detection',
    'threat detection AI',
    'signal fusion',
    'telemetry analytics',
    'critical infrastructure intelligence',
    'reality trust',
    'edge inference',
    'OCULYX',
  ],
  authors: [{ name: 'OCULYX' }],
  creator: 'OCULYX',
  publisher: 'OCULYX',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'OCULYX | Multi-Modal Inference Engine',
    description:
      'Fused video, audio, telemetry, and behavioral signals turned into operational truth. Predict. Protect. Verify.',
    siteName: 'OCULYX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OCULYX | Multi-Modal Inference Engine',
    description:
      'The shortest path between fragmented real-world signals and operational truth.',
    creator: '@oculyx',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#F2F1EA',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${martianMono.variable} ${GeistPixelGrid.variable}`}
      suppressHydrationWarning
    >
      <body className="font-mono antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
