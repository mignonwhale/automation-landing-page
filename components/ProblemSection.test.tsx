import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProblemSection from './ProblemSection'
import { PROBLEMS } from '@/lib/constants'

describe('ProblemSection', () => {
  it('모든 문제 항목을 표시한다', () => {
    render(<ProblemSection />)
    for (const item of PROBLEMS) {
      expect(screen.getByText(item.text)).toBeInTheDocument()
    }
  })
})
