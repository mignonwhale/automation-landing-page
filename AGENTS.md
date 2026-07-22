# automation-landing-page

Next.js (App Router) + TypeScript + Tailwind CSS v4 기반 랜딩페이지. Vercel에 배포합니다.

## 개발 서버

```
yarn dev
```

## 주요 파일

- `app/page.tsx` - 랜딩페이지 조립 (섹션 컴포넌트 배치)
- `app/layout.tsx` - 전역 레이아웃, 메타데이터
- `app/globals.css` - 전역 스타일, Tailwind import
- `app/api/contact/route.ts` - 문의 폼 제출 → Resend로 이메일 발송
- `components/` - 섹션별 컴포넌트
- `lib/constants.ts` - 서비스/FAQ/가격 등 콘텐츠 데이터
- `docs/prd.md` - 기획안
- `docs/dev-plan.md` - 개발 계획

## 스타일링

Tailwind CSS v4 유틸리티 클래스를 사용합니다. 인라인 style은 사용하지 않습니다.

## 환경 변수

`.env.local`에 `RESEND_API_KEY`를 설정해야 문의 폼이 실제로 이메일을 발송합니다 (`.env.local.example` 참고). git에 커밋하지 않습니다.

## 테스트

```
yarn test          # 1회 실행
yarn test:watch    # watch 모드
yarn test:coverage # 커버리지 리포트
```

Vitest + React Testing Library를 사용합니다.

## 패키지 매니저

Yarn을 사용합니다 (`yarn.lock` 기준).
