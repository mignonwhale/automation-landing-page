import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Footer from './Footer'
import { CONTACT_EMAIL } from '@/lib/constants'

describe('Footer', () => {
  it('연락처 이메일 링크를 표시한다', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: CONTACT_EMAIL })
    expect(link).toHaveAttribute('href', `mailto:${CONTACT_EMAIL}`)
  })
})
