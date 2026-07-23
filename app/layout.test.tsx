import { describe, expect, it } from 'vitest'
import RootLayout, { metadata } from './layout'

describe('RootLayout', () => {
  it('메타데이터에 제목/설명/OG/트위터 정보를 포함한다', () => {
    expect(metadata.title).toBe('업무 자동화 전문가 | 엑셀 매크로·VBA 자동화')
    expect(metadata.description).toContain('엑셀 매크로(VBA) 자동화')
    expect(metadata.openGraph?.locale).toBe('ko_KR')
    expect(metadata.twitter?.card).toBe('summary_large_image')
  })

  it('html lang="ko"로 감싸고 전달받은 children을 렌더링한다', () => {
    const element = RootLayout({ children: <p>content</p> })
    expect(element.type).toBe('html')
    expect(element.props.lang).toBe('ko')

    const body = element.props.children
    expect(body.type).toBe('body')
    expect(body.props.children.type).toBe('p')
    expect(body.props.children.props.children).toBe('content')
  })
})
