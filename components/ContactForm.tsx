'use client'

import { useState } from 'react'

const inputClass =
  'w-full rounded-[10px] border border-[#1E2D42] bg-slate-900 px-3.5 py-3 font-sans text-[15px] text-slate-100 outline-none transition-colors focus:border-green-500'
const labelClass = 'mb-2 block text-[13px] font-semibold text-slate-400'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('요청 실패')
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div className="rounded-[20px] border border-green-500/30 bg-gray-900 px-8 py-12 text-center">
        <span className="text-5xl">✅</span>
        <h3 className="mt-4 mb-2 text-xl font-bold text-slate-100">문의가 접수되었습니다!</h3>
        <p className="text-sm text-slate-400">빠른 시일 내에 이메일로 답변 드리겠습니다.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4.5 rounded-[20px] border border-[#243447] bg-gray-900 px-8 py-9"
    >
      {/* 허니팟: 사람에게는 보이지 않고 봇만 채우는 스팸 방지용 필드 */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">홈페이지</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>이름</label>
        <input
          type="text"
          required
          placeholder="홍길동"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>이메일</label>
        <input
          type="email"
          required
          placeholder="example@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>어떤 업무를 자동화하고 싶으신가요?</label>
        <textarea
          required
          rows={4}
          placeholder="예) 매달 반복하는 재고 정리 작업을 자동화하고 싶어요 / 여러 엑셀 파일을 하나로 합치는 작업이 필요해요"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-y leading-[1.6]`}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 rounded-xl bg-green-500 py-4 text-base font-extrabold text-[#021a0c] shadow-[0_0_32px_rgba(34,197,94,0.18)] transition-colors hover:bg-green-400 disabled:opacity-60"
      >
        {status === 'submitting' ? '전송 중...' : '내 업무 자동화 가능 여부 알아보기 →'}
      </button>
      {status === 'error' && (
        <p className="text-center text-sm text-red-400">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>
      )}
      <p className="m-0 text-center text-xs text-slate-500">
        스팸 없음. 문의 내용은 견적 안내 목적으로만 활용됩니다.
      </p>
    </form>
  )
}
