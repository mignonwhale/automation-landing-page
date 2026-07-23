export const SERVICES = [
  { icon: '📊', title: '데이터 정리 자동화', desc: '여러 엑셀 파일을 하나로 취합' },
  { icon: '📄', title: 'PDF ↔ Excel 변환', desc: 'OCR을 활용한 자동 변환' },
  { icon: '📋', title: '보고서 자동 생성', desc: '반복 보고서를 버튼 한 번으로 생성' },
  { icon: '📦', title: '재고 관리', desc: '입출고 및 재고 자동 계산' },
  { icon: '🔗', title: 'API 데이터 연동', desc: '외부 시스템 연계' },
  { icon: '⚙️', title: '맞춤 VBA 개발', desc: '회사 업무에 맞춘 자동화 제작' },
  { icon: '📁', title: '파일 일괄 처리', desc: '이름 변경, 이동, 취합 자동화' },
  { icon: '📝', title: '양식 자동 작성', desc: '거래명세서·발주서·견적서 자동 생성' },
] as const

export const FAQS = [
  {
    q: '견적은 어떻게 정해지나요?',
    a: '작업 범위, 데이터 양, 예외처리 방식에 따라 달라집니다. 이메일로 문의 주시면 대략적인 범위를 먼저 안내해드려요.',
  },
  {
    q: '작업 기간은 얼마나 걸리나요?',
    a: '간단한 작업은 1~2일, 맞춤 자동화는 3~5일 정도 소요됩니다.',
  },
  {
    q: '수정은 몇 번까지 가능한가요?',
    a: '3만원대 작업은 1회, 20만원대 이상은 3회까지 무료 수정이 가능합니다. 이 외 추가 요청은 별도 협의합니다.',
  },
  {
    q: '소스 코드도 받을 수 있나요?',
    a: '별도 프로그램(exe) 형태의 결과물은 소스코드를 제공하지 않습니다. 엑셀 매크로 형태는 완성된 파일 그대로 전달해드리며, 별도 코드 설명서나 문서화는 제공하지 않습니다.',
  },
] as const

export const CHAT = [
  { side: 'left', text: '안녕하세요, 매달 엑셀로 재고 정리하는데 너무 오래 걸려서요. 이것도 자동화 되나요?' },
  {
    side: 'right',
    text: '안녕하세요! 네, 가능합니다. 혹시 지금 하고 계신 방식을 간단히 설명해주실 수 있을까요? (엑셀 파일 예시 있으시면 더 정확해요)',
  },
  { side: 'left', text: '매장별로 재고 엑셀이 따로 있는데, 그걸 하나로 합쳐서 부족한 품목 표시하는 작업이에요' },
  { side: 'right', text: '확인했습니다. 이 정도면 매크로로 충분히 자동화 가능해요. 작업량 보고 견적과 예상 기간 정리해서 바로 안내드릴게요' },
  { side: 'left', text: '네 진행할게요' },
  { side: 'right', text: '감사합니다! 작업 시작하고, 중간에 진행 상황 한 번 공유드릴게요. 완료되면 사용법도 같이 안내해드립니다' },
] as const

export const PROJECTS = [
  { title: '정산 데이터 대사 자동화', desc: '외부 데이터와 내부 DB를 비교하여 오차를 자동 검출하는 배치 개발', tag: '배치 자동화' },
  { title: '물류·재고 현황 대시보드', desc: '입고·재고·주문 데이터를 실시간 시각화', tag: '데이터 시각화' },
  { title: '주문·클레임 데이터 연동', desc: '제휴사 데이터 자동 연동으로 수작업 최소화', tag: 'API 연동' },
  { title: '개인 프로젝트', desc: '기획부터 개발·배포까지 직접 진행', tag: '풀스택 개발' },
] as const

export const TECH_BADGES = ['API 연동', '배치 프로그램', '데이터베이스 설계', '관리자 시스템', '엑셀 자동화'] as const

export const PRICING = [
  {
    label: '아주 간단한 작업',
    price: '3만원부터',
    examples: ['매크로 버튼 하나 추가', '단순 서식 자동 채우기'],
    highlight: false,
  },
  {
    label: '일반 자동화',
    price: '20만원대부터',
    examples: ['데이터 정리·입력 자동화', '반복 보고서 생성'],
    highlight: true,
  },
  {
    label: '맞춤 자동화',
    price: '문의 후 견적',
    examples: ['여러 시트·파일 연동', '예외처리가 많은 작업'],
    highlight: false,
  },
] as const

export const PROBLEMS = [
  { icon: '⌨️', text: '매일 반복되는 데이터 입력, 복사·붙여넣기에 시간을 쓰고 있다' },
  { icon: '📦', text: '재고·입출고·근태 같은 정리 작업을 손으로 하나씩 처리한다' },
  { icon: '📊', text: '매번 같은 형식의 보고서를 수작업으로 만든다' },
  { icon: '🔄', text: '담당자가 바뀌면 업무 방법을 처음부터 다시 설명해야 한다' },
] as const

export const SOLUTIONS = [
  { icon: '🔁', title: '반복 작업 자동화 매크로', desc: '매일 반복하는 작업을 버튼 한 번으로 끝낼 수 있습니다.', btn: '매크로 샘플 다운로드' },
  { icon: '📄', title: 'Excel ↔ PDF 자동 변환', desc: '여러 문서를 자동으로 변환하여 반복적인 문서 작업을 줄여드립니다.', btn: '변환 샘플 다운로드' },
  { icon: '⚙️', title: 'VBA 맞춤 자동화', desc: '회사 업무에 맞춘 자동화 프로그램으로 업무 효율을 높여드립니다.', btn: 'VBA 샘플 다운로드' },
] as const

export const TRUST_POINTS = [
  '현직 11년차 개발자가 직접 개발',
  '기존 엑셀 양식을 최대한 유지하여 제작',
  '소규모 작업도 부담 없이 의뢰 가능',
] as const

export const FOOTER_SERVICES = ['엑셀 매크로 자동화', 'VBA 맞춤 개발', 'PDF ↔ Excel 변환', '데이터 정리 자동화', '보고서 자동 생성'] as const

export const CONTACT_EMAIL = 'mignonwhale@gmail.com'

export const SITE_URL = 'https://automation-landing-page.vercel.app'
export const SITE_TITLE = '업무 자동화 전문가 | 엑셀 매크로·VBA 자동화'
export const SITE_DESCRIPTION =
  '엑셀 매크로(VBA) 자동화부터 맞춤 업무 자동화까지, 반복되는 업무를 더 빠르고 정확하게 처리할 수 있도록 도와드립니다. 11년차 풀스택 개발자가 직접 개발합니다.'
