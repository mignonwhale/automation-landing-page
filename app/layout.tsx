import type { Metadata } from 'next'
import './globals.css'
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, BUSINESS_JSON_LD } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: '업무 자동화 전문가',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  verification: {
    google: 'OAgiI9KhGeNsgHtOJycz0EjvhNcwpwJiS98Ez_30x88',
    other: { 'naver-site-verification': 'bc51a9f60f62953f7061f7fd3f016bcdc345958e' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD) }} />
        {children}
      </body>
    </html>
  )
}

