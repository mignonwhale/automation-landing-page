import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Hero from './Hero'
import { TRUST_POINTS } from '@/lib/constants'

describe('Hero', () => {
  it('헤드라인과 CTA, 신뢰 포인트를 모두 표시한다', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /내 업무 자동화 가능 여부 알아보기/ })).toHaveAttribute(
      'href',
      '#contact',
    )
    for (const point of TRUST_POINTS) {
      expect(screen.getByText(point)).toBeInTheDocument()
    }
  })
})
