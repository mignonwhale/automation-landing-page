import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SolutionSection from './SolutionSection'
import { SOLUTIONS } from '@/lib/constants'

describe('SolutionSection', () => {
  it('모든 솔루션 카드와 다운로드 버튼을 표시한다', () => {
    render(<SolutionSection />)
    for (const item of SOLUTIONS) {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: `↓ ${item.btn}` })).toBeInTheDocument()
    }
  })
})
