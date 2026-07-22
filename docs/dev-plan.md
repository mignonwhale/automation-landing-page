# Next.js + Vercel 전환 개발 계획

> 작성 대상: 박수진
> 목적: Figma Make(Vite 기반) 프로젝트를 Next.js + Vercel 구조로 전환하고, 이후 코드 직접 관리 체제로 이관
> 작성일: 2026.07.22
> made with claude

---

## 1. 배경 및 목표

현재 프로젝트는 Figma Make가 생성한 Vite + React 19 앱으로, `vite.config.ts`가 Figma Make 플랫폼 전용 플러그인과 `.figma/make/site.json` 설정 파일에 의존하고 있어 Figma Make 환경 밖(로컬/일반 배포)에서는 정상 빌드되지 않는 상태다.

앞으로는 Figma에서 왕복 편집을 하지 않고 **코드로 직접 관리**하기로 결정했으므로, Figma Make 전용 설정을 걷어내고 아래 목표로 Next.js + Vercel 구조로 새로 구성한다.

- SSG(정적 생성)로 SEO 메타 태그·OG 이미지 정상 노출
- 문의 폼을 실제로 동작하는 이메일 발송 기능(API Route)으로 연결
- Vercel 배포 파이프라인으로 손쉬운 배포/도메인 연결

---

## 2. 기술 스택

| 항목 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | Next.js 15 (App Router) | React 19 지원, Vercel 최적화 |
| 패키지 매니저 | Yarn | 기존 pnpm-lock.yaml은 제거하고 yarn.lock으로 전환 |
| 언어 | TypeScript (strict) | 기존 tsconfig 규칙 유지 |
| 스타일링 | Tailwind CSS v4 | 기존 `App.tsx`의 인라인 style을 전체 리팩토링하여 Tailwind 유틸리티 클래스로 전면 전환 |
| 배포 | Vercel | GitHub 연동 후 자동 배포, 기본 제공 도메인(`*.vercel.app`) 사용 |
| 문의 폼 발송 | Next.js Route Handler + Resend | 무료 플랜(월 3,000건)으로 충분, 수신 주소는 `mignonwhale@gmail.com` |
| 테스트 | Vitest + React Testing Library | CLAUDE.md 규칙: 테스트 커버리지 90% 이상 유지 |

---

## 3. 디렉토리 구조 (예상)

```
├─ app/
│  ├─ layout.tsx          # 메타데이터, 폰트, 전역 레이아웃
│  ├─ page.tsx            # 랜딩페이지 (기존 App.tsx 내용 이관)
│  ├─ api/
│  │  └─ contact/route.ts # 문의 폼 제출 → 이메일 발송
│  └─ globals.css         # Tailwind import
├─ components/
│  ├─ Nav.tsx
│  ├─ Hero.tsx
│  ├─ ProblemSection.tsx
│  ├─ SolutionSection.tsx
│  ├─ ServiceGrid.tsx
│  ├─ CareerSection.tsx
│  ├─ ProcessChat.tsx
│  ├─ PricingSection.tsx
│  ├─ FaqSection.tsx
│  ├─ ContactForm.tsx
│  └─ Footer.tsx
├─ lib/
│  └─ constants.ts        # SERVICES, FAQS, CHAT, PROJECTS, PRICING 등 데이터 상수
├─ public/
│  └─ (favicon, OG 이미지 등)
├─ docs/
│  ├─ prd.md
│  └─ dev-plan.md
└─ (기존 Figma Make 전용 파일 제거: vite.config.ts, .figma/, AGENTS.md 내용 갱신)
```

기존 `App.tsx`는 단일 파일에 모든 섹션이 들어있는데, Next.js 전환을 계기로 섹션별 컴포넌트로 분리해 재사용성과 테스트 용이성을 높인다.

---

## 4. 단계별 작업 항목

### Phase 1 — 프로젝트 초기화
- [ ] `yarn create next-app` 기반으로 App Router + TypeScript + Tailwind v4 프로젝트 생성
- [ ] 기존 `package.json`의 의미 있는 스크립트(`dev`, `build`, `format`) 이관, 패키지 매니저는 Yarn으로 고정
- [ ] 기존 `pnpm-lock.yaml` 제거, `yarn.lock`으로 전환
- [ ] Figma Make 전용 파일 제거: `vite.config.ts`, `.figma/`, `src/imports/`(기획안은 `docs/prd.md`로 대체됨)
- [ ] `AGENTS.md` 내용을 Next.js 구조에 맞게 갱신

### Phase 2 — 콘텐츠/컴포넌트 이관
- [ ] `App.tsx`의 섹션을 위 디렉토리 구조대로 컴포넌트 분리
- [ ] 데이터 상수(SERVICES, FAQS, CHAT, PROJECTS, PRICING, TECH_BADGES)를 `lib/constants.ts`로 이동
- [ ] 인라인 `style={{}}` → Tailwind 유틸리티 클래스로 전면 리팩토링 (색상 토큰은 `tailwind.config` 또는 CSS 변수로 정의)
- [ ] FAQ 아코디언, 문의 폼 등 클라이언트 상태가 필요한 부분은 `"use client"` 컴포넌트로 분리

### Phase 3 — 문의 폼 실제 동작 구현 (Resend)
- [ ] Resend 계정 생성 및 API 키 발급
- [ ] `app/api/contact/route.ts`에서 Resend API 호출로 폼 제출 처리 (서버 사이드 검증 포함), 수신 주소 `mignonwhale@gmail.com`
- [ ] API 키는 `.env.local`에 저장, git에 커밋되지 않도록 `.gitignore` 확인
- [ ] 스팸 방지(허니팟 필드 또는 간단한 rate limit) 적용 여부 결정

### Phase 4 — SEO / 메타데이터
- [ ] `app/layout.tsx`의 `metadata` 객체로 title/description/OG 이미지 설정
- [ ] `robots.txt`, `sitemap.xml` 필요 여부 결정
- [ ] favicon 및 OG 이미지 리소스 준비 (`public/`)

### Phase 5 — 테스트
- [ ] Vitest + React Testing Library 설정
- [ ] 섹션별 컴포넌트 렌더링 테스트, 문의 폼 제출 로직 테스트
- [ ] 커버리지 90% 이상 확인

### Phase 6 — 배포
- [ ] 첫 커밋 및 `origin`(`https://github.com/mignonwhale/automation-landing-page.git`) push
- [ ] Vercel 프로젝트 연결, 환경 변수(Resend API 키 등) 등록
- [ ] Vercel 기본 도메인(`*.vercel.app`)으로 배포
- [ ] 배포 후 실제 문의 폼 발송 테스트

---

## 5. 결정 사항 (확정)

1. **이메일 발송 서비스**: Resend 무료 플랜 사용, 수신 주소는 `mignonwhale@gmail.com`
2. **스타일링**: 인라인 style 전체를 Tailwind 유틸리티 클래스로 전면 리팩토링
3. **도메인**: Vercel 기본 제공 도메인(`*.vercel.app`) 사용, 커스텀 도메인 없음
4. **git 저장소**: 로컬 `git init` 및 원격(`origin`) 연결 완료. 단, 아직 커밋이 없어 push가 안 되는 상태 — 첫 커밋 후 push 필요 (Phase 6 참고)

---

## 6. 향후 확장 여지 (보류)

- 웹자동화 잠재고객용 별도 섹션/샘플 추가
- 크몽 등 마켓플레이스 채널 연동
- 코드사이닝 인증서 적용 검토 (exe 보안 경고 해결)
