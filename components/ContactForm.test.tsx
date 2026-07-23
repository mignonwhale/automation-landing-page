import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('제출 성공 시 완료 메시지를 표시한다', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()

    render(<ContactForm />)
    await user.type(screen.getByPlaceholderText('홍길동'), '홍길동')
    await user.type(screen.getByPlaceholderText('example@email.com'), 'test@example.com')
    await user.type(
      screen.getByPlaceholderText(/매달 반복하는 재고 정리 작업/),
      '재고 정리 자동화가 필요합니다',
    )
    await user.click(screen.getByRole('button', { name: /내 업무 자동화 가능 여부 알아보기/ }))

    expect(await screen.findByText('문의가 접수되었습니다!')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('제출 실패 시 에러 메시지를 표시한다', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const user = userEvent.setup()

    render(<ContactForm />)
    await user.type(screen.getByPlaceholderText('홍길동'), '홍길동')
    await user.type(screen.getByPlaceholderText('example@email.com'), 'test@example.com')
    await user.type(
      screen.getByPlaceholderText(/매달 반복하는 재고 정리 작업/),
      '재고 정리 자동화가 필요합니다',
    )
    await user.click(screen.getByRole('button', { name: /내 업무 자동화 가능 여부 알아보기/ }))

    expect(await screen.findByText(/전송에 실패했습니다/)).toBeInTheDocument()
  })

  it('허니팟 필드는 접근성 트리에서 숨겨져 있고 탭 이동에서 제외된다', () => {
    render(<ContactForm />)
    const honeypot = screen.getByLabelText('홈페이지', { selector: 'input' })
    expect(honeypot).toHaveAttribute('tabIndex', '-1')
    expect(honeypot.closest('[aria-hidden="true"]')).not.toBeNull()
  })
})
