import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ServiceGrid from './ServiceGrid'
import { SERVICES } from '@/lib/constants'

describe('ServiceGrid', () => {
  it('모든 서비스 항목을 표시한다', () => {
    render(<ServiceGrid />)
    for (const s of SERVICES) {
      expect(screen.getByText(s.title)).toBeInTheDocument()
      expect(screen.getByText(s.desc)).toBeInTheDocument()
    }
  })
})
