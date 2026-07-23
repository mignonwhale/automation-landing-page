import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { CONTACT_EMAIL } from '@/lib/constants'

type ContactBody = {
  name?: unknown
  email?: unknown
  message?: unknown
  website?: unknown // 허니팟: 사람 눈에는 안 보이는 필드. 값이 채워져 있으면 봇으로 간주
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactBody

  if (isNonEmptyString(body.website)) {
    // 봇에게 정상 제출로 보이게 하려고 실제 메일은 보내지 않고 성공 응답만 반환
    return NextResponse.json({ ok: true })
  }

  if (!isNonEmptyString(body.name) || !isNonEmptyString(body.email) || !isNonEmptyString(body.message)) {
    return NextResponse.json({ error: '이름, 이메일, 문의 내용을 모두 입력해주세요.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY가 설정되어 있지 않습니다.')
    return NextResponse.json({ error: '서버 설정 오류로 문의를 보낼 수 없습니다.' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const { name, email, message } = body

  const { error } = await resend.emails.send({
    from: '자동화 문의 <onboarding@resend.dev>',
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `[자동화문의] ${name}님으로부터 새 자동화 문의가 도착했습니다`,
    text: `이름: ${name}\n이메일: ${email}\n\n문의 내용:\n${message}`,
  })

  if (error) {
    console.error('Resend 발송 실패:', error)
    return NextResponse.json({ error: '이메일 발송에 실패했습니다.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
