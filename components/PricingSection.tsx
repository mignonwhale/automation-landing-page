import { PRICING } from '@/lib/constants'

export default function PricingSection() {
  return (
    <section className="bg-[#080D16] px-6 py-20">
      <div className="mx-auto max-w-[900px]">
        <h2 className="mb-3 text-center text-[clamp(24px,4vw,36px)] font-extrabold tracking-[-0.02em] text-slate-100">
          작업 규모별 시작가
        </h2>
        <p className="mb-12 text-center text-[15px] text-slate-400">
          정확한 금액은 작업 범위 확인 후 안내드립니다.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {PRICING.map((tier) => (
            <div
              key={tier.label}
              className={
                tier.highlight
                  ? 'relative rounded-[20px] bg-green-500 px-7 py-8 shadow-[0_0_48px_rgba(34,197,94,0.18)]'
                  : 'relative rounded-[20px] border border-[#243447] bg-gray-900 px-7 py-8'
              }
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-yellow-200 px-3 py-1 text-[11px] font-bold text-gray-900">
                  가장 많이 의뢰
                </span>
              )}
              <p
                className={`mb-2 text-xs font-bold uppercase tracking-[0.06em] ${
                  tier.highlight ? 'text-[#021a0c]/70' : 'text-slate-500'
                }`}
              >
                {tier.label}
              </p>
              <p className={`mb-5 text-[28px] font-black ${tier.highlight ? 'text-[#021a0c]' : 'text-slate-100'}`}>
                {tier.price}
              </p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {tier.examples.map((ex) => (
                  <li
                    key={ex}
                    className={`flex items-start gap-2 text-sm ${
                      tier.highlight ? 'text-[#021a0c]/80' : 'text-slate-400'
                    }`}
                  >
                    <span className="shrink-0 font-bold">·</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
