# CLAUDE.md

- 주석과 설명은 한글로 작성 및 답변한다. 
- 모든 API KEY, TOKEN 등과 같은 중요한 정보는 외부에 노출하지 않는다. 물론 git에도 커밋을 하지 않고 하려는 시도가 있을 경우 꼭 알린다.
- 오류나 에러가 발생한 경우, 원인파악 > 해결방안 > 개발자 확인 > 테스트 > 소스수정의 과정을 거친다. 
    - 한 번에 모든 사항을 말하지 말고 하나의 오류당 위 단계를 거친다. 
    - 소수 수정 후 다른 비슷한 코드나 동일 적용이 필요한 코드가 있으면 개발자 확인 후 수정한다. 
- 계획, 설계서, 체크리스트 등이 최신 상태인지 확인하고 git에 변경 사항을 적용한다.
- **git 커밋과 push는 항상 사용자 확인을 받은 뒤에 진행한다.** 코드 수정·테스트·빌드 검증까지는 바로 진행해도 되지만, `git commit`/`git push` 직전에는 변경 파일 목록을 보여주고 승인을 기다린다.


## 기술 스택

Next.js (App Router) + TypeScript + Tailwind CSS v4 기반 랜딩페이지. Vercel에 배포한다. 패키지 매니저는 Yarn(`yarn.lock` 기준).

## 개발 진행 과정

프로젝트는 Figma Make(Vite) 프로토타입을 Next.js로 전환하는 것으로 시작해 아래 순서로 진행됐다. 각 단계의 세부 체크리스트는 `docs/dev-plan.md` 참고.

1. **초기 구축**: Next.js App Router 프로젝트 생성, 기존 `App.tsx`를 섹션별 컴포넌트로 분리, 인라인 style을 Tailwind로 전면 리팩토링
2. **문의 폼**: `app/api/contact/route.ts`에서 Resend API로 실제 이메일 발송, 허니팟 필드로 스팸 차단
3. **SEO**: `app/robots.ts`/`app/sitemap.ts`(metadata route), `app/icon.png`/`app/opengraph-image.png`(정적 파비콘·OG 이미지), `layout.tsx` 메타데이터 구성
4. **테스트**: Vitest + React Testing Library로 커버리지 90% 이상 달성 (컴포넌트 렌더링, 폼 제출, SEO 라우트 전부 포함)
5. **첫 배포**: Vercel 연결 및 `origin/main` 첫 push. 배포 도메인이 `automation-landing-page-kappa.vercel.app`로 확정되어 `SITE_URL` 상수를 실제 도메인에 맞게 수정
6. **UI 다듬기**: 카드 레이아웃(아이콘/텍스트 정렬), 반응형(PC 2단/모바일 1단), 한글 줄바꿈(`break-keep`) 등 다수 미세조정
7. **솔루션 카드 실제 데모 이미지**: 매크로 실행 GIF, PDF↔Excel 비포/애프터 비교 이미지, VBA 요청→견적서 변환 이미지 3종을 캡처·합성해서 플레이스홀더 대체
8. **샘플 다운로드 연동**: 실행파일 2종 + VBA 예제 1종을 GitHub Release(`samples-v2`)에 업로드해 다운로드 버튼에 연결. exe 2종은 브라우저 SafeBrowsing 오탐(VirusTotal로 오탐 확인)을 피하기 위해 zip으로 배포 (`docs/github-release-guide.md` 참고)
9. **검색엔진 등록 가이드**: 구글 Search Console / 네이버 서치어드바이저 등록 절차를 문서화 (`docs/seo-search-registration-guide.md`) — 실제 등록은 소유권 인증이 필요해 사용자가 직접 진행

**남은 작업**: 구글/네이버 실제 등록 (인증 코드 전달 시 `layout.tsx`에 반영), exe 코드사이닝 인증서 검토, 커스텀 도메인 검토.

## 개발 규칙

### 1. 코드 작성 규칙
- 절대 모킹하지 않기: 실제 동작하는 코드만 작성
- 타입 안정성: TypeScript 엄격 모드 준수
- 테스트 우선: 테스트 커버리지 90% 이상 유지
- 컴포넌트 네이밍: PascalCase, 기능을 명확히 나타내는 이름 사용
- 스타일링: Tailwind CSS v4 유틸리티 클래스 사용, 인라인 style은 사용하지 않음


### 2. 패캐지 버전 호환성
- 새 캐키지 추가 시 기존 의존성과 충돌 확인 

### 3. 파일 구조 규칙
- `app/page.tsx` - 랜딩페이지 조립 (섹션 컴포넌트 배치)
- `app/layout.tsx` - 전역 레이아웃, 메타데이터
- `app/globals.css` - 전역 스타일, Tailwind import
- `app/api/contact/route.ts` - 문의 폼 제출 → Resend로 이메일 발송, 허니팟 필드로 스팸 차단
- `app/icon.png` - 파비콘(512x512), `app/opengraph-image.png` - OG 이미지(1200x630, `#080D16` 배경에 contain) — 둘 다 정적 파일, Next.js 파일 컨벤션으로 자동 라우팅
- `app/robots.ts`, `app/sitemap.ts` - SEO용 robots.txt/sitemap.xml (Next.js metadata route 컨벤션)
- `components/` - 섹션별 컴포넌트
- `lib/constants.ts` - 서비스/FAQ/가격 등 콘텐츠 데이터
- `public/` - 페이지 본문에서 직접 참조하는 이미지/GIF 등 정적 에셋 (파비콘·OG 이미지처럼 Next.js 파일 컨벤션을 쓰는 것과는 별개)
- `docs/prd.md` - 기획안
- `docs/dev-plan.md` - 개발 계획
- `docs/github-release-guide.md` - GitHub Release로 샘플 다운로드 파일 배포하는 방법
- `docs/seo-search-registration-guide.md` - 구글/네이버 검색 등록 절차

### 4. 스크립트 명령어
```
yarn dev            # 개발 서버
yarn test           # 테스트 1회 실행
yarn test:watch     # 테스트 watch 모드
yarn test:coverage  # 커버리지 리포트
```

### 5. 환경 변수
`.env.local`에 `RESEND_API_KEY`를 설정해야 문의 폼이 실제로 이메일을 발송한다 (`.env.local.example` 참고). git에 커밋하지 않는다.

### 6. 에셋/문서 관리
- `docs/` 폴더는 `.md` 문서만 git에 커밋한다 (`.gitignore`의 `docs/* / !docs/*.md` 규칙). GIF·PDF·exe 등 콘텐츠 제작용 원본 파일은 로컬에만 두고 커밋하지 않는다.
- 용량이 큰 배포용 실행파일(exe 등)은 저장소에 직접 커밋하지 않고 GitHub Release에 업로드해 URL로 연결한다 (`docs/github-release-guide.md` 참고).
- UI를 변경한 뒤에는 가능하면 로컬 서버(`yarn dev`)를 브라우저로 띄워 실제 화면을 스크린샷으로 확인하고 나서 완료로 보고한다.