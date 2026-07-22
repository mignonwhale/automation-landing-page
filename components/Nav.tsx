export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#1E2D42] bg-[#080D16]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="text-base font-bold text-slate-100">업무 자동화 전문가</span>
        </div>
        <a
          href="#contact"
          className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-[#021a0c] transition-colors hover:bg-green-400"
        >
          무료 문의하기
        </a>
      </div>
    </nav>
  )
}
