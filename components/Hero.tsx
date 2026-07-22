import { TRUST_POINTS } from '@/lib/constants'

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-22 text-center">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/12 px-4 py-1.5 text-sm font-semibold text-green-500">
        ✓ &nbsp;현직 11년차 풀스택 개발자 직접 개발
      </div>
      <h1 className="mb-6 text-[clamp(36px,6vw,62px)] font-black leading-[1.15] tracking-[-0.03em] text-slate-100">
        매일 반복되는 업무,
        <br />
        <span className="text-green-500">버튼 한 번</span>으로 끝내드립니다.
      </h1>
      <p className="mx-auto mb-10 max-w-[580px] text-lg leading-[1.8] text-slate-400">
        엑셀 매크로(VBA) 자동화부터 맞춤 업무 자동화까지,
        <br />
        반복되는 업무를 더 빠르고 정확하게 처리할 수 있도록 도와드립니다.
      </p>
      <a
        href="#contact"
        className="inline-block rounded-2xl bg-green-500 px-11 py-4.5 text-lg font-extrabold text-[#021a0c] shadow-[0_0_40px_rgba(34,197,94,0.18)] transition-all hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-[0_0_60px_rgba(34,197,94,0.30)]"
      >
        내 업무 자동화 가능 여부 알아보기 →
      </a>
      <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2.5">
        {TRUST_POINTS.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
            <span className="font-bold text-green-500">✓</span>
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
