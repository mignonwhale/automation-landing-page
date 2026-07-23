import { describe, expect, it } from 'vitest'
import RootLayout, { metadata } from './layout'
import { CONTACT_EMAIL, BUSINESS_JSON_LD } from '@/lib/constants'

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

    const [script, content] = body.props.children
    expect(script.type).toBe('script')
    expect(content.type).toBe('p')
    expect(content.props.children).toBe('content')
  })

  it('ProfessionalService 구조화 데이터(JSON-LD)에 서비스 정보를 포함한다', () => {
    expect(BUSINESS_JSON_LD['@type']).toBe('ProfessionalService')
    expect(BUSINESS_JSON_LD.email).toBe(CONTACT_EMAIL)
    expect(BUSINESS_JSON_LD.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0)

    const element = RootLayout({ children: <p>content</p> })
    const [script] = element.props.children.props.children
    const json = JSON.parse(script.props.dangerouslySetInnerHTML.__html)
    expect(json['@type']).toBe('ProfessionalService')
  })
})
