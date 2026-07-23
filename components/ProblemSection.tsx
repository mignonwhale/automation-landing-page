import { PROBLEMS } from '@/lib/constants'

export default function ProblemSection() {
  return (
    <section className="border-y border-[#1E2D42] bg-[#0D1424] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-center text-[clamp(24px,4vw,38px)] font-extrabold tracking-[-0.02em] text-slate-100">
          이런 반복 작업, 매일 시간을 잡아먹고 있지 않나요
        </h2>
        <p className="mb-12 text-center text-[15px] text-slate-400">
          알아채지 못하는 사이, 소중한 업무 시간이 낭비되고 있습니다.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {PROBLEMS.map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-center gap-4 rounded-2xl border border-[#243447] bg-gray-900 px-7 py-8 text-center"
            >
              <span className="text-4xl leading-none">{item.icon}</span>
              <p className="m-0 text-[15px] leading-[1.75] text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
