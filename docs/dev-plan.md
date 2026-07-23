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
└─ (기존 Figma Make 전용 파일 제거: vite.config.ts, .figma/)
```

기존 `App.tsx`는 단일 파일에 모든 섹션이 들어있는데, Next.js 전환을 계기로 섹션별 컴포넌트로 분리해 재사용성과 테스트 용이성을 높인다.

---

## 4. 단계별 작업 항목

### Phase 1 — 프로젝트 초기화 ✅ 완료
- [x] `yarn create next-app` 기반으로 App Router + TypeScript + Tailwind v4 프로젝트 생성
- [x] 기존 `package.json`의 의미 있는 스크립트(`dev`, `build`, `format`) 이관, 패키지 매니저는 Yarn으로 고정
- [x] 기존 `pnpm-lock.yaml` 제거, `yarn.lock`으로 전환
- [x] Figma Make 전용 파일 제거: `vite.config.ts`, `.figma/`, `src/imports/`(기획안은 `docs/prd.md`로 대체됨)
- [x] `AGENTS.md` 내용을 Next.js 구조에 맞게 갱신 → 이후 클로드만 사용하는 워크플로로 확정되어 2026-07-23 `CLAUDE.md`에 통합, `AGENTS.md`는 삭제

### Phase 2 — 콘텐츠/컴포넌트 이관 ✅ 완료
- [x] `App.tsx`의 섹션을 위 디렉토리 구조대로 컴포넌트 분리
- [x] 데이터 상수(SERVICES, FAQS, CHAT, PROJECTS, PRICING, TECH_BADGES)를 `lib/constants.ts`로 이동
- [x] 인라인 `style={{}}` → Tailwind 유틸리티 클래스로 전면 리팩토링 (색상 토큰은 `tailwind.config` 또는 CSS 변수로 정의)
- [x] FAQ 아코디언, 문의 폼 등 클라이언트 상태가 필요한 부분은 `"use client"` 컴포넌트로 분리

### Phase 3 — 문의 폼 실제 동작 구현 (Resend) ✅ 완료
- [x] Resend 계정 생성 및 API 키 발급
- [x] `app/api/contact/route.ts`에서 Resend API 호출로 폼 제출 처리 (서버 사이드 검증 포함), 수신 주소 `mignonwhale@gmail.com`
- [x] API 키는 `.env.local`에 저장, git에 커밋되지 않도록 `.gitignore` 확인 (`*.local` 규칙으로 제외됨, `.env.local.example`은 템플릿으로 커밋)
- [x] 스팸 방지: 허니팟 필드 적용 (2026-07-23). `ContactForm.tsx`에 화면에는 안 보이는 `website` 필드를 추가하고, `route.ts`에서 값이 채워져 있으면 메일 발송 없이 200만 반환

### Phase 4 — SEO / 메타데이터 ✅ 완료
- [x] `app/layout.tsx`의 `metadata` 객체로 title/description/OG 설정 (`SITE_URL`/`SITE_TITLE`/`SITE_DESCRIPTION`은 `lib/constants.ts`로 통합)
- [x] `robots.txt`, `sitemap.xml` 적용 — Next.js metadata route 컨벤션(`app/robots.ts`, `app/sitemap.ts`)으로 구현, 정적 파일 없이 자동 생성 (2026-07-23)
- [x] favicon 및 OG 이미지 리소스 준비 — 실제 디자인된 고래 로고 이미지를 `app/icon.png`(512x512), `app/opengraph-image.png`(1200x630, `#080D16` 배경에 contain)로 배치, `sharp`로 리사이즈만 하고 정적 파일 그대로 사용 (2026-07-23). 초기에는 `next/og` `ImageResponse`로 이모지 플레이스홀더를 동적 생성했으나 실제 이미지 확보 후 대체함

### Phase 5 — 테스트 ✅ 완료
- [x] Vitest + React Testing Library 설정
- [x] 섹션별 컴포넌트 렌더링 테스트, 문의 폼 제출 로직 테스트, 허니팟 스팸 방지 테스트 (16개 파일, 27개 테스트 모두 통과)
- [x] 커버리지 90% 이상 확인 — `app/page.tsx`, `app/layout.tsx`, `app/icon.tsx` 테스트 추가(2026-07-23)로 statement/branch/line 100%, funcs 95.45% 달성

### Phase 6 — 배포 ✅ 완료
- [x] 첫 커밋 및 `origin`(`https://github.com/mignonwhale/automation-landing-page.git`) push (2026-07-23, 커밋 `42a736d`, 43 files)
- [x] Vercel 프로젝트 연결, 환경 변수(Resend API 키 등) 등록
- [x] Vercel 기본 도메인(`*.vercel.app`)으로 배포 — `https://automation-landing-page-kappa.vercel.app` (2026-07-23). 참고: `automation-landing-page` 이름이 이미 다른 프로젝트가 선점해 Vercel이 `-kappa` 접미사를 붙였고, `lib/constants.ts`의 `SITE_URL`도 이 실제 도메인으로 수정함 (이전에는 잘못된 남의 도메인을 가리키고 있었음)
- [x] 배포 후 실제 문의 폼 발송 테스트 — `mignonwhale@gmail.com` 수신 확인 완료 (2026-07-23)

---

## 5. 결정 사항 (확정)

1. **이메일 발송 서비스**: Resend 무료 플랜 사용, 수신 주소는 `mignonwhale@gmail.com`
2. **스타일링**: 인라인 style 전체를 Tailwind 유틸리티 클래스로 전면 리팩토링
3. **도메인**: Vercel 기본 제공 도메인(`*.vercel.app`) 사용, 커스텀 도메인 없음
4. **git 저장소**: 로컬 `git init` 및 원격(`origin`) 연결 완료. 첫 커밋(`42a736d`) 및 `origin/main` push 완료 (2026-07-23)

---

## 6. 향후 확장 여지 (보류)

- 웹자동화 잠재고객용 별도 섹션/샘플 추가
- 크몽 등 마켓플레이스 채널 연동
- 코드사이닝 인증서 적용 검토 (exe 보안 경고 해결)

---

## 7. 배포/설정 가이드

새 기기에서 세팅하거나 API 키를 재발급해야 할 때 참고용.

### 7-1. Resend API 키 발급 및 설정

1. https://resend.com 가입 (무료 플랜: 월 3,000건)
2. Dashboard → **API Keys** → **Create API Key** → 이름 지정 (예: `automation-landing-page`), 권한은 기본값(Sending access) 사용
3. 발급된 키(`re_`로 시작)를 즉시 복사 — 이후 다시 조회 불가, 분실 시 재발급 필요
4. 로컬 개발 환경: 프로젝트 루트에 `.env.local` 생성 후 아래 한 줄 추가 (`.env.local.example` 참고, `.gitignore`의 `*.local` 규칙으로 git에 커밋되지 않음)
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```
5. 발신 주소: 현재 `app/api/contact/route.ts`의 `from`은 Resend가 기본 제공하는 테스트 발신 주소(`onboarding@resend.dev`)를 사용 중이며, 무료 플랜 그대로 정상 발송·수신 확인 완료(2026-07-23). 추후 커스텀 도메인(예: `noreply@내도메인.com`)으로 보내려면 Resend Dashboard → **Domains**에서 도메인 인증(DNS TXT/MX 레코드 추가)이 별도로 필요함 — 현재는 미설정 상태.

### 7-2. Vercel 프로젝트 설정

1. https://vercel.com 가입/로그인 (GitHub 계정으로 로그인 권장 — 저장소 연동이 쉬움)
2. **Add New** → **Project** → GitHub 저장소 `mignonwhale/automation-landing-page` 선택 후 Import
3. Framework Preset은 Next.js가 자동 감지됨, Build Command/Output Directory는 기본값 그대로 사용
4. **Settings → Environment Variables**에 `RESEND_API_KEY` 추가 (Production/Preview/Development 모두 체크 권장) — 값은 7-1에서 발급받은 키와 동일하게 입력
5. **Deploy** 클릭 → 완료되면 Vercel이 `*.vercel.app` 도메인을 자동 할당함. 프로젝트명이 이미 다른 사람이 쓰고 있으면 임의 접미사가 붙는다 (이 프로젝트는 `automation-landing-page`가 선점되어 있어 `automation-landing-page-kappa.vercel.app`로 배정됨)
6. 이후 GitHub `main` 브랜치에 push할 때마다 Vercel이 자동으로 재배포함 — 별도 배포 명령이나 CLI 조작 불필요
7. **주의**: 배포된 실제 도메인은 `lib/constants.ts`의 `SITE_URL` 상수와 반드시 일치해야 함. 다르면 OG 이미지·`sitemap.xml`·`robots.txt`가 엉뚱한 주소를 가리키게 된다 (2026-07-23에 실제로 이 문제가 발생해 커밋 `6e478e6`에서 수정한 이력 있음). 커스텀 도메인을 새로 연결하는 경우에도 `SITE_URL`을 같이 갱신할 것.
