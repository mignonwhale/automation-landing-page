import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import FaqSection from './FaqSection'
import { FAQS } from '@/lib/constants'

describe('FaqSection', () => {
  it('질문 클릭 시 답변이 토글된다', async () => {
    const user = userEvent.setup()
    render(<FaqSection />)

    const firstQuestion = FAQS[0]
    expect(screen.queryByText(firstQuestion.a)).not.toBeInTheDocument()

    await user.click(screen.getByText(firstQuestion.q))
    expect(screen.getByText(firstQuestion.a)).toBeInTheDocument()

    await user.click(screen.getByText(firstQuestion.q))
    expect(screen.queryByText(firstQuestion.a)).not.toBeInTheDocument()
  })

  it('다른 질문을 열면 이전 질문은 닫힌다', async () => {
    const user = userEvent.setup()
    render(<FaqSection />)

    await user.click(screen.getByText(FAQS[0].q))
    expect(screen.getByText(FAQS[0].a)).toBeInTheDocument()

    await user.click(screen.getByText(FAQS[1].q))
    expect(screen.queryByText(FAQS[0].a)).not.toBeInTheDocument()
    expect(screen.getByText(FAQS[1].a)).toBeInTheDocument()
  })
})
