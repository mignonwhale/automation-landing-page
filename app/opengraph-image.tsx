import { ImageResponse } from 'next/og'
import { SITE_TITLE } from '@/lib/constants'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          background: '#080D16',
          color: '#F1F5F9',
          fontSize: 56,
          fontWeight: 800,
          textAlign: 'center',
          padding: '0 80px',
        }}
      >
        <div style={{ fontSize: 96, display: 'flex' }}>⚡</div>
        <div style={{ display: 'flex' }}>{SITE_TITLE}</div>
      </div>
    ),
    { ...size },
  )
}
