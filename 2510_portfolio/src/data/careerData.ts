/**
 * data
 * careerData.ts
**/

type Summary = {
  text: string;
  bold?: boolean;
}

export interface CareerItem {
  id: string;
  company: string;
  logo: string;
  team: string;
  role: string;
  position: string;
  period: string;
  summary: Summary[][];
  projects: string[];
  skills: string[];
}

export const careerData: CareerItem[] = [
  {
    id: 'hcg',
    company: '(주)휴먼컨설팅그룹',
    logo: 'hcg',
    team: 'UX Team',
    role: '프론트엔드(UI) 개발',
    position: '선임',
    period: '2023.11 - 재직 중',
    summary: [
      [
        { text: 'HR 플랫폼(GS칼텍스, SK바이오사이언스 등) ' },
        { text: 'UI 개발 및 컴포넌트 기반 커스터마이징 구현', bold: true },
      ],
      [
        { text: 'JSP 기반 ' },
        { text: '레거시 시스템 내 Vue 2/3 혼재 구조를 분석', bold: true },
        { text: '하여 공통 컴포넌트로 재설계' }
      ],
      [
        { text: '권한·승인 로직을 ' },
        { text: '공통 컴포넌트로 모듈화하고 Props 기반 로직/렌더링 분리 구조 구현', bold: true },
      ],
      [
        { text: 'HR 대시보드 데이터 ' },
        { text: '누락·예외 케이스 선제 처리 및 차트 스타일 시스템(SCSS Mixin) 수립', bold: true },
      ],
      [
        // 
        { text: 'BEM 네이밍 컨벤션 기반 스타일 격리 및 드래그앤드롭 등 사용자 UX 개선 기능 직접 구현' },
      ]
    ],
    projects: [
      '대한적십자사 e-HR 서비스 구축',
      '휴먼컨설팅그룹 HR 서비스 고도화',
      'SK바이오사이언스 HR 서비스 구축',
      'GS칼텍스 통합 HR 플랫폼 구축',
    ],
    skills: ['Vue.js', 'JavaScript(ES6+)', 'SCSS(SASS)', 'HTML5', 'Figma'],
  },
  {
    id: 'mm',
    company: '(주)엠몬스타',
    logo: 'mm',
    team: 'Publisher Team',
    role: '웹 퍼블리셔',
    position: '매니저',
    period: '2018.07 - 2023.01 (4년 6개월)',
    summary: [
      [
        { text: '커머스 전용 솔루션(이지옵스) ' },
        { text: 'PL로서 UI 아키텍처 설계 및 10개 이상 타입별 컴포넌트 구축', bold: true }
      ],
      [
        { text: 'SCSS 변수·Mixin 체계 직접 설계', bold: true },
        { text: '및 팀 구현 ' },
        { text: '가이드 문서화로 온보딩 기준 정립', bold: true }
      ],
      [
        { text: '내셔널지오그래픽·HAGO·패션플러스 등 대형 커머스 리뉴얼에 ' },
        { text: 'PL로 참여, BEM 기반 마크업 및 웹 접근성 적용', bold: true },
      ]
    ],
    projects: [
      '커머스 전용 솔루션(이지옵스) 구축',
      '내셔널지오그래픽몰 리뉴얼',
      'HAGO 쇼핑몰 신규 구축',
      '패션플러스 2021 리뉴얼',
    ],
    skills: ['JavaScript', 'jQuery', 'SCSS(SASS)', 'HTML5', 'Adobe XD'],
  }
];
