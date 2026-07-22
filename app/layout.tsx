import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://automation-landing-page.vercel.app'
const TITLE = '업무 자동화 전문가 | 엑셀 매크로·VBA 자동화'
const DESCRIPTION =
  '엑셀 매크로(VBA) 자동화부터 맞춤 업무 자동화까지, 반복되는 업무를 더 빠르고 정확하게 처리할 수 있도록 도와드립니다. 11년차 풀스택 개발자가 직접 개발합니다.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: '업무 자동화 전문가',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
