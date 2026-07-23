# CLAUDE.md

- 주석과 설명은 한글로 작성 및 답변한다. 
- 모든 API KEY, TOKEN 등과 같은 중요한 정보는 외부에 노출하지 않는다. 물론 git에도 커밋을 하지 않고 하려는 시도가 있을 경우 꼭 알린다.
- 오류나 에러가 발생한 경우, 원인파악 > 해결방안 > 개발자 확인 > 테스트 > 소스수정의 과정을 거친다. 
    - 한 번에 모든 사항을 말하지 말고 하나의 오류당 위 단계를 거친다. 
    - 소수 수정 후 다른 비슷한 코드나 동일 적용이 필요한 코드가 있으면 개발자 확인 후 수정한다. 
- 계획, 설계서, 체크리스트 등이 최신 상태인지 확인하고 git에 변경 사항을 적용한다.


## 기술 스택

Next.js (App Router) + TypeScript + Tailwind CSS v4 기반 랜딩페이지. Vercel에 배포한다. 패키지 매니저는 Yarn(`yarn.lock` 기준).

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
- `app/api/contact/route.ts` - 문의 폼 제출 → Resend로 이메일 발송
- `components/` - 섹션별 컴포넌트
- `lib/constants.ts` - 서비스/FAQ/가격 등 콘텐츠 데이터
- `docs/prd.md` - 기획안
- `docs/dev-plan.md` - 개발 계획

### 4. 스크립트 명령어
```
yarn dev            # 개발 서버
yarn test           # 테스트 1회 실행
yarn test:watch     # 테스트 watch 모드
yarn test:coverage  # 커버리지 리포트
```

### 5. 환경 변수
`.env.local`에 `RESEND_API_KEY`를 설정해야 문의 폼이 실제로 이메일을 발송한다 (`.env.local.example` 참고). git에 커밋하지 않는다.