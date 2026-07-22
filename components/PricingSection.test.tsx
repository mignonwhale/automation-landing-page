import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PricingSection from './PricingSection'
import { PRICING } from '@/lib/constants'

describe('PricingSection', () => {
  it('모든 가격 티어와 하이라이트 배지를 표시한다', () => {
    render(<PricingSection />)
    for (const tier of PRICING) {
      expect(screen.getByText(tier.price)).toBeInTheDocument()
    }
    expect(screen.getByText('가장 많이 의뢰')).toBeInTheDocument()
  })
})
