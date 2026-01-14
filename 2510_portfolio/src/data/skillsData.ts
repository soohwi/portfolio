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
    id: 'Frontend',
    title: 'Frontend',
    skills: [
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'SCSS(SASS)' },
      { name: 'JavaScript(ES6+)' },
      { name: 'TypeScript', isLearning: true }
    ]
  },
  {
    id: 'Framework',
    title: 'Framework / Library',
    skills: [
      { name: 'Vue.js' },
      { name: 'React.js', isLearning: true }
    ]
  },
  {
    id: 'Tools',
    title: 'Tools',
    skills: [
      { name: 'VS Code' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Figma' },
      { name: 'Adobe XD' }
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
      [
        { text: '모바일 고도화 작업 과정에서 ' },
        { text: '모달·테이블·폼 등의 공통 컴포넌트 구조를 정리', bold: true },
        { text: '하고, 화면별 중복 UI를 개선' },
      ],
      [
        { text: '복잡한 폼·리스트 UI를 ' },
        { text: '확장 가능한 구조로 설계', bold: true },
        { text: '하고 공통화·리팩토링 관점에서 유지보수성 개선' },
      ],
      [
        { text: '기획/디자인/백엔드와의 협업 과정에서 ' },
        { text: '이슈를 원인 → 대안 → 합의로 정리', bold: true },
        { text: '하며 커뮤니케이션 및 문제 해결' },
      ],
      [
        { text: 'React.js + TypeScript는 개인 프로젝트로 ' },
        { text: '컴포넌트 설계/상태 관리 패턴', bold: true },
        { text: '을 학습하며 실무 확장 기반을 강화 중' },
      ]
    ]
  }
]