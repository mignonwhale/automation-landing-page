import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const sendMock = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}))

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  const originalKey = process.env.RESEND_API_KEY

  beforeEach(() => {
    sendMock.mockReset()
    process.env.RESEND_API_KEY = 'test-key'
  })

  afterEach(() => {
    process.env.RESEND_API_KEY = originalKey
  })

  it('필수 필드가 없으면 400을 반환한다', async () => {
    const { POST } = await import('./route')
    const res = await POST(makeRequest({ name: '', email: '', message: '' }))
    expect(res.status).toBe(400)
  })

  it('RESEND_API_KEY가 없으면 500을 반환한다', async () => {
    delete process.env.RESEND_API_KEY
    const { POST } = await import('./route')
    const res = await POST(makeRequest({ name: '홍길동', email: 'a@b.com', message: '문의합니다' }))
    expect(res.status).toBe(500)
  })

  it('정상 입력 시 이메일을 발송하고 200을 반환한다', async () => {
    sendMock.mockResolvedValue({ error: null })
    const { POST } = await import('./route')
    const res = await POST(makeRequest({ name: '홍길동', email: 'a@b.com', message: '문의합니다' }))
    expect(res.status).toBe(200)
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'mignonwhale@gmail.com', replyTo: 'a@b.com' }),
    )
  })

  it('Resend가 에러를 반환하면 502를 반환한다', async () => {
    sendMock.mockResolvedValue({ error: { message: 'failed' } })
    const { POST } = await import('./route')
    const res = await POST(makeRequest({ name: '홍길동', email: 'a@b.com', message: '문의합니다' }))
    expect(res.status).toBe(502)
  })

  it('허니팟 필드가 채워져 있으면 메일을 보내지 않고 200을 반환한다', async () => {
    const { POST } = await import('./route')
    const res = await POST(
      makeRequest({ name: '봇', email: 'bot@example.com', message: '스팸', website: 'http://spam.example' }),
    )
    expect(res.status).toBe(200)
    expect(sendMock).not.toHaveBeenCalled()
  })
})
