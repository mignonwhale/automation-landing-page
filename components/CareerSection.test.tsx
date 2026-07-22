import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CareerSection from './CareerSection'
import { PROJECTS, TECH_BADGES } from '@/lib/constants'

describe('CareerSection', () => {
  it('기술 배지와 프로젝트 목록을 표시한다', () => {
    render(<CareerSection />)
    for (const badge of TECH_BADGES) {
      expect(screen.getAllByText(badge).length).toBeGreaterThan(0)
    }
    for (const p of PROJECTS) {
      expect(screen.getByText(p.title)).toBeInTheDocument()
    }
  })
})
