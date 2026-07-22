import { describe, expect, it } from 'vitest'
import { CONTACT_EMAIL, FAQS, PRICING, SERVICES } from './constants'

describe('constants', () => {
  it('SERVICES 항목마다 icon/title/desc를 가진다', () => {
    for (const s of SERVICES) {
      expect(s.icon).toBeTruthy()
      expect(s.title).toBeTruthy()
      expect(s.desc).toBeTruthy()
    }
  })

  it('FAQS 항목마다 질문과 답변이 있다', () => {
    for (const f of FAQS) {
      expect(f.q).toBeTruthy()
      expect(f.a).toBeTruthy()
    }
  })

  it('PRICING 티어 중 정확히 하나만 highlight다', () => {
    const highlighted = PRICING.filter((tier) => tier.highlight)
    expect(highlighted).toHaveLength(1)
  })

  it('CONTACT_EMAIL은 유효한 이메일 형식이다', () => {
    expect(CONTACT_EMAIL).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })
})
