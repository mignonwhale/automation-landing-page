# GitHub Release로 샘플 파일 배포하기

랜딩페이지의 "샘플 다운로드" 버튼(매크로 / 변환 / VBA)에 연결할 실행 파일은 용량이 커서 git 저장소에 직접 커밋하지 않는다. 대신 GitHub Release에 첨부 파일로 올리고, 그 다운로드 URL을 버튼에 연결한다. GitHub이 각 파일의 다운로드 횟수(`download_count`)를 자동으로 세어주므로 별도 백엔드 없이 다운로드 추적이 가능하다.

## 준비물

- `docs/1.sample-macro.exe` — 반복 작업 자동화 매크로 샘플
- `docs/2.sample-pdf2excel.exe` — PDF ↔ Excel 변환 샘플
- `docs/3.sample-vba.xlsm` — VBA 맞춤 자동화 샘플

이 파일들은 `.gitignore`의 `docs/*` 규칙으로 git에는 올라가지 않는다. Release에는 git과 무관하게 직접 업로드한다.

## 방법 A — GitHub 웹 UI에서 직접 생성 (권장, 별도 설치 불필요)

1. 저장소 페이지 → 우측 **Releases** → **Create a new release**
   (`https://github.com/mignonwhale/automation-landing-page/releases/new`)
2. **Tag**: 새 태그 입력 (예: `samples-v1`) → "Create new tag" 선택
3. **Release title**: 자유롭게 입력 (예: `샘플 다운로드 v1`)
4. 본문 하단 **Attach binaries** 영역에 아래 3개 파일을 드래그 앤 드롭:
   - `docs/1.sample-macro.exe`
   - `docs/2.sample-pdf2excel.exe`
   - `docs/3.sample-vba.xlsm`
5. **Publish release** 클릭
6. 업로드 완료 후, Release 페이지에서 각 파일을 마우스 우클릭 → **링크 주소 복사**
   URL 형태: `https://github.com/mignonwhale/automation-landing-page/releases/download/samples-v1/파일명`
7. 복사한 3개 URL을 전달하면 다운로드 버튼에 연결한다.

## 방법 B — gh CLI 사용 (자동화하고 싶을 때)

로컬에 [GitHub CLI](https://cli.github.com/)를 설치하고 로그인한 뒤:

```bash
gh auth login   # 브라우저 인증 (최초 1회)

gh release create samples-v1 \
  "docs/1.sample-macro.exe" \
  "docs/2.sample-pdf2excel.exe" \
  "docs/3.sample-vba.xlsm" \
  --title "샘플 다운로드 v1" \
  --notes "랜딩페이지 샘플 다운로드용 파일"
```

명령이 끝나면 출력되는 Release URL에서 각 파일의 다운로드 링크를 확인할 수 있다 (`gh release view samples-v1 --web`으로 브라우저에서 열어 확인 가능).

## 파일을 새 버전으로 교체할 때

기존 태그에 파일만 새로 올리려면:

```bash
gh release upload samples-v1 "docs/1.sample-macro.exe" --clobber
```

`--clobber`는 동일 이름 파일을 덮어쓴다. 완전히 새 버전으로 배포하려면 태그를 올려서(`samples-v2` 등) 새 Release를 만드는 것을 권장한다 (다운로드 카운트 이력이 태그별로 남는다).

## 현재 배포 상태 (samples-v2)

`samples-v1`에서는 exe 2개를 그대로 올렸는데, 브라우저가 "바이러스가 발견됨"으로 다운로드를 차단하는 문제가 있었다. VirusTotal로 확인한 결과 소수의 휴리스틱/ML 엔진(Microsoft `!ml`, Bkav 등)만 반응하는 오탐이었지만, exe를 직접 다운로드할 때 브라우저의 SafeBrowsing이 더 엄격하게 검사하는 경향이 있어 **exe 2개는 zip으로 감싸서** `samples-v2`로 재배포했다. VBA 파일(`.xlsm`)은 exe만큼 엄격한 검사를 받지 않고 Excel 자체의 "콘텐츠 사용" 매크로 확인창이 이미 안전장치 역할을 하므로 zip 없이 그대로 유지한다.

2026-07-23 `samples-v2` 태그로 배포 완료:

- `1.sample-macro.zip` → `https://github.com/mignonwhale/automation-landing-page/releases/download/samples-v2/1.sample-macro.zip`
- `2.sample-pdf2excel.zip` → `https://github.com/mignonwhale/automation-landing-page/releases/download/samples-v2/2.sample-pdf2excel.zip`
- `3.sample-vba.xlsm` → `https://github.com/mignonwhale/automation-landing-page/releases/download/samples-v2/3.sample-vba.xlsm`

`lib/constants.ts`의 `SOLUTIONS` 배열에서 각 항목의 다운로드 URL로 연결되어 있다.

## 참고

- 저장소가 public이므로 Release 첨부파일은 별도 인증 없이 누구나 다운로드 가능하다.
- Windows에서 서명되지 않은 exe를 다운로드하면 SmartScreen 경고("Windows에서 PC를 보호했습니다")가 뜬다. 코드사이닝 인증서 적용 전까지는 다운로드 버튼 근처에 안내 문구를 넣는 것을 권장한다 (`dev-plan.md`의 "향후 확장 여지" 참고).
