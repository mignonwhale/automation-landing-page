import { PROJECTS, TECH_BADGES } from '@/lib/constants'

export default function CareerSection() {
  return (
    <section className="bg-[#080D16] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-center text-[clamp(22px,4vw,36px)] font-extrabold tracking-[-0.02em] text-slate-100">
          11년간 다양한 업무 자동화와 데이터 처리 시스템을 개발했습니다.
        </h2>
        <p className="mb-10 text-center text-[15px] text-slate-400">
          규모와 관계없이, 실제 업무에 맞춘 시스템을 만들어왔습니다.
        </p>
        <div className="mb-12 flex flex-wrap justify-center gap-2.5">
          {TECH_BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-green-500/50 bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-500"
            >
              {badge}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {PROJECTS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[#243447] bg-gray-900 px-5 py-6">
              <span className="mb-3 inline-block rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-slate-500">
                {p.tag}
              </span>
              <h3 className="m-0 mb-2 text-base font-bold text-slate-100">{p.title}</h3>
              <p className="m-0 text-sm leading-[1.65] text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
