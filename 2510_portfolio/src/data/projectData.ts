/**
 * data
 * projectData.ts
**/

export interface ProjectItem {
  id: string;
  imgSrc: string;
  comp: string;
  title: string;
  period?: string;
  position?: string;
  skill: string[];
}

export const ProjectData: ProjectItem[] = [
  {
    id: 'portfolio',
    imgSrc: '/assets/images/project/work_thumb-portfolio.png',
    comp: '개인',
    title: '포트폴리오',
    period: '약 3주',
    position: '1인 (기여도 100%)',
    skill: ['React', 'TypeScript', 'SCSS', 'Firebase']
  },
  {
    id: 'hwitter',
    imgSrc: '/assets/images/project/work_thumb-hwitter.png',
    comp: '개인',
    title: 'Hwitter (SNS 클론)',
    period: '약 2주',
    position: '1인 (기여도 100%)',
    skill: ['React', 'TypeScript', 'SCSS', 'Firebase']
  },
  // {
  //   id: 'movieApp',
  //   imgSrc: '/assets/images/project/work_thumb-movie.png',
  //   comp: '개인',
  //   title: '영화 앱 클론',
  //   period: '약 2주',
  //   position: '1인 (기여도 100%)',
  //   skill: ['React', 'TypeScript', 'Styled-components', 'Github-pages']
  // },
  {
    id: 'hcgHr',
    imgSrc: '/assets/images/project/work_thumb-hcg.png',
    comp: '(주)휴먼컨설팅그룹',
    title: '휴먼컨설팅그룹 HR 서비스 고도화',
    period: '2024.10 - 진행 중',
    skill: ['Vue', 'JavaScript(ES6+)', 'SCSS', 'HTML5', 'Figma']
  },
  {
    id: 'skBio',
    imgSrc: '/assets/images/project/work_thumb-sk.png',
    comp: '(주)휴먼컨설팅그룹',
    title: '"SK바이오사이언스" HR 서비스',
    period: '2024.07 - 2024.09 (2개월)',
    position: '1인 (기여도 100%)',
    skill: ['Vue', 'JavaScript(ES6+)', 'SCSS', 'HTML5', 'Figma']
  },
  {
    id: 'gs',
    imgSrc: '/assets/images/project/work_thumb-gs.png',
    comp: '(주)휴먼컨설팅그룹',
    title: '"GS칼텍스" 통합 HR 플랫폼 개발',
    period: '2024.02 - 2024.08 (6개월)',
    position: '1인 (기여도 100%)',
    skill: ['JavaScript(ES6+)', 'SCSS', 'HTML5', 'Figma']
  },
  {
    id: 'mmon',
    imgSrc: '/assets/images/project/work_thumb-mmon.png',
    comp: '(주)엠몬스타',
    title: '엠몬 솔루션 신규 구축 (회사 자체 솔루션)',
    period: '2022.02 - 2023.01 (11개월)',
    position: 'Project Leader (기여도 80%)',
    skill: ['JavaScript', 'SCSS', 'HTML5', 'AdobeXD']
  },
  {
    id: 'nStation',
    imgSrc: '/assets/images/project/work_thumb-nstation.png',
    comp: '(주)엠몬스타',
    title: '"내셔널지오그래픽" 온라인몰 리뉴얼',
    period: '2021.08 - 2021.12 (5개월)',
    position: 'Project Leader (기여도 80%)',
    skill: ['JavaScript', 'SCSS', 'HTML5', 'AdobeXD']
  },
  {
    id: 'hago',
    imgSrc: '/assets/images/project/work_thumb-hago.png',
    comp: '(주)엠몬스타',
    title: '"HAGO" 쇼핑몰 리뉴얼',
    period: '2021.05 - 2021.08 (4개월)',
    position: 'Project Leader (기여도 80%)',
    skill: ['JavaScript', 'SCSS', 'HTML5', 'AdobeXD']
  },
  {
    id: 'fp',
    imgSrc: '/assets/images/project/work_thumb-fp.png',
    comp: '(주)엠몬스타',
    title: '"패션플러스" 2021 리뉴얼',
    period: '2020.09 - 2021.01 (5개월)',
    position: 'Project Leader (기여도 80%)',
    skill: ['JavaScript', 'jQuery', 'SCSS', 'HTML5', 'AdobeXD']
  },
]