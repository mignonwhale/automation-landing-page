import Image from 'next/image'
import { SOLUTIONS } from '@/lib/constants'

export default function SolutionSection() {
  return (
    <section className="bg-[#080D16] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-center text-[clamp(24px,4vw,38px)] font-extrabold tracking-[-0.02em] text-slate-100">
          자동화가 이렇게 해결합니다
        </h2>
        <p className="mb-12 text-center text-[15px] text-slate-400">
          지금 바로 샘플을 확인해보세요 — 이메일 없이 즉시 다운로드
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-5">
          {SOLUTIONS.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col gap-4 rounded-[20px] border border-[#243447] bg-gray-900 px-7 py-8 transition-all hover:-translate-y-0.5 hover:border-green-500/40"
            >
              <div className="relative aspect-8/9 w-full overflow-hidden rounded-[10px] border border-[#243447] bg-slate-900">
                {item.media ? (
                  <Image src={item.media} alt={`${item.title} 데모`} fill unoptimized className="object-cover object-top-left" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-[#243447] text-sm text-slate-500">
                    <span className="text-[28px]">🖼️</span>
                    <span>스크린샷 / GIF 영역</span>
                  </div>
                )}
              </div>
              <span className="text-4xl">{item.icon}</span>
              <h3 className="m-0 text-lg font-bold text-slate-100">{item.title}</h3>
              <p className="m-0 flex-1 text-[15px] leading-[1.7] text-slate-400">{item.desc}</p>
              <a
                href={item.downloadUrl}
                download
                className="block rounded-xl border-2 border-green-500 py-3 text-center text-sm font-semibold text-green-500 transition-colors hover:bg-green-500 hover:text-[#021a0c]"
              >
                ↓ {item.btn}
              </a>
              <p className="m-0 text-center text-xs text-slate-500">{item.downloadNote}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          ✓ 자동화 프로그램은 담당자가 바뀌어도 동일하게 작동합니다
        </p>
      </div>
    </section>
  )
}
