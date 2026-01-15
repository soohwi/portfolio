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
        { text: 'Vue.js 기반 HR 플랫폼의 ' },
        { text: '화면 구조 및 컴포넌트 단위 UI를 설계 및 구현', bold: true },
        { text: '하며, 공통 컴포넌트 도입을 통해 중복 UI와 수정 범위를 줄임' }
      ],
      [
        { text: '조직·인사·근태·신청/승인 등 ' },
        { text: '권한·상태·승인 흐름을 고려한 업무 시스템 UI를 구현', bold: true },
        { text: '하며 예외 케이스와 사용자 역할별 분기 처리 경험' }
      ],
      [
        { text: '모바일 고도화 작업 과정에서 ' },
        { text: '모달·테이블·폼 등의 공통 UI 구조를 정리', bold: true },
        { text: '하여 화면별 UI 중복과 유지보수 부담을 개선' }
      ],
      [
        { text: 'Figma 기반 협업 환경에서 ' },
        { text: '디자인 가이드 및 개발 기준을 문서화', bold: true },
        { text: '하여 디자인·개발 간 커뮤니케이션 혼선을 줄임' }
      ]
    ],
    projects: ['대한적십자사 e-HR 서비스 구축','GS칼텍스 통합 HR 플랫폼 구축', 'SK바이오사이언스 HR 서비스 구축', 'HCG HR 솔루션 고도화'],
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
        { text: '대형 브랜드몰 및 커머스 사이트에서 ' },
        { text: '반응형 웹 UI 구축과 UX 개선 중심의 퍼블리싱을 담당', bold: true }
      ],
      [
        { text: 'SCSS 구조화 및 JavaScript 기반 공통 UI 모듈 설계를 통해 ' },
        { text: '반복 작업 감소와 유지보수 효율을 개선', bold: true }
      ],
      [
        { text: '다수의 커머스 프로젝트에서 퍼블리싱 PL로 참여하여 ' },
        { text: '공통 UI 기준을 정리하고 작업 우선순위를 조율', bold: true },
        { text: '하며, 기획·디자이너·개발자와의 협업을 주도' }
      ]
    ],
    projects: ['내셔널지오그래픽몰 리뉴얼', 'HAGO 쇼핑몰 리뉴얼', '패션플러스 리뉴얼', '엠몬스타 신규 솔루션 구축'],
    skills: ['JavaScript', 'jQuery', 'SCSS(SASS)', 'HTML5', 'Adobe XD'],
  }
];
