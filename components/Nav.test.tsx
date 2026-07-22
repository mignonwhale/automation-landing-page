import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Nav from './Nav'

describe('Nav', () => {
  it('브랜드명과 문의 CTA 링크를 표시한다', () => {
    render(<Nav />)
    expect(screen.getByText('업무 자동화 전문가')).toBeInTheDocument()
    const cta = screen.getByRole('link', { name: '무료 문의하기' })
    expect(cta).toHaveAttribute('href', '#contact')
  })
})
