import { CONTACT_EMAIL, FOOTER_SERVICES } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-[#1E2D42] bg-[#040810] px-6 pb-8 pt-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span className="text-[15px] font-bold text-slate-100">업무 자동화 전문가</span>
            </div>
            <p className="m-0 mb-4 text-[13px] leading-[1.7] text-slate-500">
              엑셀 VBA 매크로부터 맞춤 자동화까지,
              <br />
              11년차 풀스택 개발자가 직접 개발합니다.
            </p>
            <div className="flex items-center gap-2 text-[13px] text-slate-400">
              <span>✉️</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-green-500 no-underline">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div>
            <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.06em] text-slate-400">서비스</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {FOOTER_SERVICES.map((item) => (
                <li key={item} className="text-[13px] text-slate-500">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.06em] text-slate-400">안내</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              <li className="flex gap-2 text-[13px] text-slate-500">
                <span>🕐</span> 문의 응답: 영업일 기준 24시간 이내
              </li>
              <li className="flex gap-2 text-[13px] text-slate-500">
                <span>📍</span> 원격 작업 · 전국 가능
              </li>
              <li className="flex gap-2 text-[13px] text-slate-500">
                <span>🔒</span> 작업 파일 비밀 유지
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1E2D42] pt-6">
          <p className="m-0 text-xs text-slate-500">© 2026 mignonwhale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
