import { CHAT } from '@/lib/constants'

export default function ProcessChat() {
  return (
    <section className="border-y border-[#1E2D42] bg-[#0D1424] px-6 py-20">
      <div className="mx-auto max-w-[680px]">
        <h2 className="mb-3 text-center text-[clamp(24px,4vw,36px)] font-extrabold tracking-[-0.02em] text-slate-100">
          실제 상담은 이렇게 진행됩니다
        </h2>
        <p className="mb-10 text-center text-[15px] text-slate-400">
          부담 없이 업무 내용을 설명해주시면, 가능 여부와 견적을 안내해드립니다.
        </p>
        <div className="flex flex-col gap-3 rounded-[20px] border border-[#1E2D42] bg-[#0E2033] px-4 py-6">
          <div className="mb-1 text-center text-xs font-semibold text-slate-500">오늘</div>
          {CHAT.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${msg.side === 'left' ? 'justify-start' : 'justify-end'}`}
            >
              {msg.side === 'left' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1E2D42] bg-slate-800 text-base">
                  👤
                </div>
              )}
              <div className="max-w-[72%]">
                {msg.side === 'left' && (
                  <p className="m-0 mb-1 ml-0.5 text-[11px] font-semibold text-slate-500">고객</p>
                )}
                <div
                  className={
                    msg.side === 'left'
                      ? 'rounded-tl rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-[#243447] bg-slate-800 px-3.5 py-2.5 text-sm leading-[1.65] text-slate-300'
                      : 'rounded-tl-2xl rounded-tr rounded-br-2xl rounded-bl-2xl bg-yellow-200 px-3.5 py-2.5 text-sm leading-[1.65] text-gray-900'
                  }
                >
                  {msg.text}
                </div>
              </div>
              {msg.side === 'right' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-200 text-base">
                  💻
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
