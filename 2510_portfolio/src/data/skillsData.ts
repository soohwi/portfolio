/**
 * data
 * skillsData.ts
**/

type Skill = {
  name: string;
  isLearning?: boolean;
}

type CompetencySeg = {
  text: string;
  bold?: boolean;
}

export interface SkillsItem {
  id: string;
  title?: string;
  skills?: Skill[];
  isCompetency?: boolean;
  compList?: CompetencySeg[][];
}

export const skillsData: SkillsItem[] = [
  {
    id: 'Core',
    title: 'Core',
    skills: [
      { name: 'Vue.js' },
      { name: 'JavaScript(ES6+)' },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'SCSS/SASS' },
    ]
  },
  {
    id: 'Expanding',
    title: 'Expanding',
    skills: [
      { name: 'React.js', isLearning: true },
      { name: 'TypeScript', isLearning: true },
      { name: 'styled-components', isLearning: true }
    ]
  },
  {
    id: 'Tools',
    title: 'Design & Tools',
    skills: [
      { name: 'Figma' },
      { name: 'Adobe XD' },
      { name: 'Git/GitHub' }
    ]
  },
  {
    id: 'Competency',
    isCompetency: true,
    compList: [
      [
        { text: 'B2C 커머스 UI와 B2B 업무 시스템 UI를 모두 경험하며, ' },
        { text: '사용자 관점과 운영 관점의 균형', bold: true },
        { text: '을 고려한 화면을 구현' },
      ],
      [
        { text: 'Vue.js 기반 화면 개발에서 ' },
        { text: '컴포넌트 단위 구조화', bold: true },
        { text: '를 통해 재사용성과 유지보수성 향상' },
      ],
      [
        { text: '권한/상태/승인 흐름 등 ' },
        { text: '데이터 흐름을 고려한 UI 설계', bold: true },
        { text: ' 및 예외 케이스 처리 경험' },
      ],
      // [
      //   { text: '모바일 고도화 작업 과정에서 ' },
      //   { text: '모달·테이블·폼 등의 공통 컴포넌트 구조를 정리', bold: true },
      //   { text: '하고, 화면별 중복 UI를 개선' },
      // ],
      [
        { text: '모달·테이블·폼·리스트 등 반복 UI를 ' },
        { text: '공통 컴포넌트로 구조화', bold: true },
        { text: '하여 재사용성과 유지보수성을 개선' },
      ],
      [
        { text: '기획/디자인/백엔드와의 협업 과정에서 ' },
        { text: '이슈를 원인과 대안 중심으로 정리', bold: true },
        { text: '하며 합의점을 찾는 커뮤니케이션 방식을 실천' },
      ],
      [
        { text: 'React.js + TypeScript는 포트폴리오 프로젝트를 통해 ' },
        { text: '컴포넌트 설계와 상태 관리 패턴', bold: true },
        { text: '을 학습하며 실전 적용을 준비 중' },
      ]
    ]
  }
]