import { SERVICES } from '@/lib/constants'

export default function ServiceGrid() {
  return (
    <section className="border-y border-[#1E2D42] bg-[#0D1424] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-center text-[clamp(24px,4vw,38px)] font-extrabold tracking-[-0.02em] text-slate-100">
          실제 제작 가능한 업무
        </h2>
        <p className="mb-12 text-center text-[15px] text-slate-400">
          어떤 업무든 먼저 문의해주세요. 자동화 가능 여부를 빠르게 확인해드립니다.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-2xl border border-[#1E2D42] bg-gray-900 px-4.5 py-6 transition-colors hover:border-green-500/35"
            >
              <div className="flex items-center justify-center">
                <span className="text-3xl leading-none">{s.icon}</span>
              </div>
              <div className="text-left">
                <p className="m-0 mb-1 break-keep text-[15px] font-bold text-slate-100">{s.title}</p>
                <p className="m-0 break-keep text-[13px] text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
