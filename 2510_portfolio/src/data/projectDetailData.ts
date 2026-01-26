/*
 * projectDetailData.ts
*/


export interface ProjectDetail {
  //< 공통
  id: string;
  title: string;
  overview?: string;// 프로젝트 개요
  link?: string;// 사이트 주소
  problem?: string[];// 실무에서 겪은 문제
  solution?: string[];// 내가 했던 개선
  reflection?: string[];// 회고
  //> 공통

  //< 회사
  security?: boolean;// 보안문구
  outcome?: string[];// 결과
  //> 회사

  //< 개인
  git?: string;// 깃허브
  purpose?: string;// 개발 목적
  thumbnail?: string;// 썸네일
  features?: string[];// 주요 기능
  techStack?: string[];// 기술 스택 및 구조적 시도
  issues?: {// 문제 해결 사례
    title: string;
    summary: string;
    cause?: string[];
    img?: string;
    solution?: string[];
  }[];
  //> 개인
}

export const ProjectDetailData: ProjectDetail[] = [
  {
    id: `portfolio`,
    title: `포트폴리오`,
    git: `https://github.com/soohwi/portfolio/tree/master/2510_portfolio`,
    overview:
      `사용자 경험과 성능을 함께 고려한 인터랙티브 포트폴리오 웹사이트입니다.
      3D 요소와 애니메이션을 활용하되, 기기 환경에 따른 퍼포먼스 영향을 고려해 설계했습니다.`,
    purpose:
      `정적인 이력서 페이지를 넘어,
      사용자 흐름과 인터랙션을 고려한 프론트엔드 구조를 설계하고자 기획한 프로젝트입니다.
      시각적 요소 구현 자체보다,
      성능, 유지보수, 확장성을 함께 고려한 UI 설계 경험을 쌓는 데에 중점을 두었습니다.`,
    thumbnail: '/assets/images/portfolio/portfolio.png',
    features: [
      `Three.js + React Three Fiber 기반 3D 달 오브젝트 구현`,
      `마우스 위치에 따른 별 배경 패럴랙스 효과 (모바일 환경에서는 비활성화)`,
      `스크롤 기반 인터랙션으로 콘텐츠 흐름을 단계적으로 노출`,
      `다크모드 / 라이트모드 토글 구현 (localStorage로 상태 유지)`,
      `반응형 레이아웃 설계 및 모바일 성능 고려한 인터랙션 제어`,
      `공통 모달 컴포넌트와 커스텀 훅(useModal)을 통해 상태 관리와 애니메이션 로직 일관화`,
    ],
    techStack: [
      `React + TypeScript + Vite (컴포넌트 구조와 타입 안정성 중심 설계)`,
      `Three.js + @react-three/fiber + @react-three/drei`,
      `SCSS Modules + 커스텀 Mixin으로 스타일 공통화`,
      `IntersectionObserver / Scroll 이벤트 기반 인터랙션`,
      `mousemove 기반 인터랙션은 requestAnimationFrame으로 제어`,
      `3D / 레이아웃 / 섹션 단위로 컴포넌트 역할 분리`,
    ],
    issues: [
      {
        title: `모바일 발열·스크롤 버벅임 개선 (3D/인터랙션 조건부 비활성화)`,
        summary: `모바일에서 3D 캔버스 + 별 배경 + 스크롤 모션이 동시에 동작하며 발열과 프레임 드랍이 발생`,
        cause: [
          `모바일 GPU/CPU 리소스가 제한적인데, 3D 렌더링과 DOM 기반 배경(다수 요소) 애니메이션이 동시에 수행됨`,
          `스크롤 이벤트에서 state 업데이트가 빈번하면 메인 스레드가 바빠져 스크롤이 끊기는 현상이 발생`,
          `불필요한 애니메이션/렌더링이 지속되면 배터리 소모 및 발열로 이어짐`
        ],
        img: `/assets/images/portfolio/issue_perf_mobile.png`,
        solution: [
          `모바일 구간에서는 별 배경 렌더링과 마우스 기반 인터랙션을 비활성화하여 불필요한 연산을 제거`,
          `스크롤 모션은 모바일에서 OFF 처리하고, 텍스트/콘텐츠는 기본 노출(가독성 유지 + 성능 우선)`,
          `타이틀 이동은 state 대신 ref + style transform으로 처리해 리렌더를 줄이고 스크롤 성능을 안정화`
        ]
      },
      {
        title: `Three.js 렌더링 비용 절감 (frameloop 제어 + invalidate 기반 갱신)`,
        summary: `기본 렌더 루프가 유지되며 정적인 장면에서도 GPU가 지속적으로 사용되어, 불필요한 리소스 소모가 발생`,
        cause: [
          `React Three Fiber의 기본 렌더링 방식은 화면 변화가 거의 없어도 매 프레임을 계속 그리기 때문에, 정적인 장면에서도 GPU 연산이 지속적으로 발생`,
          `기본 DPR과 안티앨리어싱 설정은 데스크톱 기준으로는 문제가 없지만, 모바일이나 저사양 환경에서는 픽셀 렌더링 비용이 급격히 증가해 성능 저하로 이어짐`
        ],
        img: `/assets/images/portfolio/issue_frameloop.png`,
        solution: [
          `Canvas에 frameloop="demand"를 적용하여 필요할 때만 렌더링하도록 변경`,
          `gl 옵션(powerPreference: "low-power", antialias: false)과 dpr 제한([1, 1.5])으로 픽셀 렌더 비용을 낮춤`,
          `달 회전은 setInterval(예: 10fps) + invalidate 조합으로 최소 프레임만 갱신하도록 조정`
        ]
      },
      {
        title: `이벤트 기반 애니메이션 최적화 (mousemove rAF 스로틀 + passive 적용)`,
        summary: `별 배경 패럴랙스 효과에서 mousemove 이벤트가 과도하게 발생해 프레임 드랍이 발생`,
        cause: [
          `mousemove 이벤트는 호출 빈도가 매우 높아, 이벤트마다 DOM 스타일을 변경하면 메인 스레드 부하가 빠르게 증가`,
          `마우스 이동과 스크롤 이벤트가 동시에 발생할 경우, 렌더링과 페인팅 비용이 누적되어 프레임 드랍으로 이어짐`
        ],
        img: `/assets/images/portfolio/issue_event.png`,
        solution: [
          `mousemove 핸들러 내부에서 requestAnimationFrame으로 업데이트를 묶어 1프레임당 1회만 DOM 반영`,
          `이벤트 리스너에 passive: true를 적용해 스크롤 처리 우선순위를 방해하지 않도록 구성`,
          `언마운트 시 cancelAnimationFrame 및 removeEventListener로 리소스 누수 방지`
        ]
      }
    ],
    reflection: [
      `3D 요소, 테마 토글, 스크롤 인터랙션 등 다양한 기능을 단순히 추가하는 것이 아니라,
      실제 사용자 환경(특히 모바일)에서의 성능과 사용성을 기준으로 기능을 선별·조정하는 경험을 했습니다.`,
      `Three.js 기반 3D 구현 과정에서 시각적 완성도보다 렌더링 비용과 디바이스 성능 한계를 먼저 고려해야 한다는 점을 체감했고,
      frameloop 제어, invalidate 기반 갱신 등 성능 중심의 설계 방식을 학습했습니다.`,
      `특히 모바일 환경에서 발열과 스크롤 버벅임 이슈를 직접 겪으며,
      모든 인터랙션이 항상 좋은 UX는 아니라는 판단 하에 기기 조건에 따라 기능을 과감히 비활성화하는 선택을 했습니다.`,
      `이번 프로젝트를 통해 단순 구현 능력을 넘어,
      언제 기능을 넣고 언제 덜어내야 하는지 판단하는 기준과 성능, 유지보수, 확장성을 함께 고려하는 설계 관점을 정립할 수 있었습니다.`
    ]
  },
  {
    id: `hwitter`,
    title: `Hwitter (SNS 클론)`,
    link: `https://hwitter-reloaded-6be5b.web.app/`,
    git: `https://github.com/soohwi/portfolio_hwitter/tree/main/portfolio_hwitter`,
    overview:
      `Firebase 기반 실시간 데이터 구조와 인증 흐름을 중심으로 설계한 SNS 클론 웹앱입니다.
      UI 구현뿐 아니라, 데이터 동기화, 권한 제어, 배포까지 포함한 SPA 전체 흐름을 경험했습니다.`,
    purpose:
      `사용자 인증, 실시간 데이터 관리, 배포까지 하나의 서비스로 완성해보는 것을 목표로 진행한 프로젝트입니다.
      단순 기능 구현이 아니라, 컴포넌트 분리, 서비스 로직 구조화, 타입 안정성을 고려한 프론트엔드 구조 설계에 집중했습니다.`,
    thumbnail: '/assets/images/hwitter/hwitter.png',
    features: [
      `Firebase Auth 기반 로그인 (이메일/비밀번호, GitHub OAuth)`,
      `Firestore onSnapshot을 활용한 실시간 트윗 스트리밍`,
      `트윗 작성/수정/삭제 및 이미지 업로드`,
      `작성자 기준 권한 제어 (본인 트윗만 수정/삭제 가능)`,
      `프로필 이미지 업로드 및 사용자 정보 관리`,
      `모바일 중심 반응형 UI 설계`,
      `시맨틱 마크업 및 aria 속성을 활용한 접근성 고려`,
      `Firebase Hosting을 통한 배포 및 환경 분리`,
    ],
    techStack: [
      `React (Vite) + TypeScript + React Router v6`,
      `Firebase (Authentication, Firestore, Hosting)`,
      `SCSS Modules 기반 컴포넌트 스타일 분리`,
      `Firebase 로직을 서비스 레이어로 분리 (tweetService, userService 등)`,
      `Tweet UI를 기능 단위 컴포넌트로 분리 (Header / Content / Actions)`,
      `공통 타입(types/)과 유틸(util/) 분리로 유지보수성 강화`,
    ],
    issues: [
      {
        title: `실시간 데이터 동기화 누락 문제 해결 (onSnapshot 도입)`,
        summary:`트윗 수정/삭제 이후에도 일부 화면에서 최신 데이터가 즉시 반영되지 않는 문제 발생`,
        cause: [
          `getDocs()는 서버 상태를 한 번만 받아오기 때문에, 트윗 수정/삭제 이후에도 화면에는 이전 상태가 그대로 유지됨`
        ],
        img: `/assets/images/hwitter/issue_subscribe.png`,
        solution: [
          `onSnapshot()을 이용해 Firestore 컬렉션을 실시간으로 구독`,
          `userId 기준으로 필터링하고 최신 순 정렬, 25개 제한으로 쿼리 최적화`,
          `컴포넌트 언마운트 시 unsubscribe() 호출로 구독 해제하여 리소스 낭비 방지`
        ]
      },
      {
        title: `Firebase에 undefined 필드 전송 시 에러 발생`,
        summary: `이미지 없이 트윗을 등록할 경우, fileData가 undefined로 전달되면서 Firebase addDoc() 함수에서 에러가 발생`,
        cause: [
          `Firebase는 undefined 값을 문서 필드로 허용하지 않음`,
          `명시적으로 제외 처리하지 않으면 'Unsupported field value: undefined' 오류 발생`
        ],
        img: `/assets/images/hwitter/issue_file.png`,
        solution: [
           `값이 있을 때만 fileData 필드를 전송하도록 && 조건을 사용해 안전하게 처리`
        ]
      },
      {
        title: `verbatimModuleSyntax 활성화로 타입 import 에러 발생`,
        summary: `tsconfig에 verbatimModuleSyntax 옵션이 활성화되면서 타입을 일반 import로 불러올 경우 컴파일 에러가 발생`,
        cause: [
          `해당 옵션이 true일 경우, 타입 전용 데이터는 반드시 import type으로 가져와야 함`,
          `일반 import 사용 시 'is a type and must be imported using a type-only import' 에러가 발생`
        ],
        img: `/assets/images/hwitter/issue_type.png`,
        solution: [
          `TweetType, Unsubscribe 등의 타입은 모두 import type으로 변경`,
          `설정을 유지하면서도 타입 안전성과 코드 명확성을 확보`
        ]
      }
    ],
    reflection: [
      `단순 UI 구현을 넘어, 인증/실시간 데이터/권한 제어가 결합된 서비스 구조를 처음부터 끝까지 설계해볼 수 있었습니다.`,
      `특히 Firestore의 실시간 리스너 구조와 구독 해제 타이밍을 직접 다루며, 상태 동기화와 리소스 관리의 중요성을 체감했습니다.`,
      `컴포넌트 분리, 서비스 레이어 분리, 타입 정의를 통해 코드 규모가 커져도 유지보수가 가능한 구조를 고민하게 되었습니다.`,
      `이 경험을 바탕으로, 이후 실무에서도 데이터 흐름과 컴포넌트 책임을 먼저 설계하는 방식으로 접근하고자 합니다.`,
    ]
  },
  // {
  //   id: `movieApp`,
  //   title: `영화 앱 클론`,
  //   link: `https://soohwi.github.io/portfolio_movieApp/`,
  //   git: `https://github.com/soohwi/portfolio_movieApp/tree/main/portfolio-movie-app`,
  //   overview:
  //     `최신 평점 높은 영화를 조회하고, 장르별로 분류된 영화 리스트와 상세 정보를 확인할 수 있는 영화 정보 웹앱입니다.`,
  //   purpose:
  //     `퍼블리셔 경험을 바탕으로, UI 구현을 넘어 데이터 흐름과 구조 설계를 직접 다루며
  //       React와 TypeScript를 실무 환경에 적용해본 프로젝트입니다.`,
  //   thumbnail: '/assets/images/movieApp/movieApp.png',
  //   features: [
  //     `YTS API 연동 - 영화 목록 및 상세 정보 조회`,
  //     `장르별 자동 분류 - 영화 데이터를 장르 기준으로 나누어 렌더링`,
  //     `싱커 메뉴 이동 - 장르 메뉴 클릭 시 해당 섹션으로 부드럽게 스크롤`,
  //     `설명 요약 / 더보기 토글 - 긴 설명은 일부만 노출하고 토글로 전체 보기 지원`,
  //   ],
  //   techStack: [
  //     `React (Vite 기반) / TypeScript / React Router v6 / Styled-components`,
  //     `Vite를 통한 빠른 개발 환경 구성과 GitHub Pages 배포 최적화 (base 경로, gh-pages 활용)`,
  //     `TypeScript로 Props와 API 데이터 타입 명확화, 공통 타입 분리(types/movie.ts)로 재사용성과 안정성 확보`,
  //     `SVG 아이콘은 vite-plugin-svgr을 사용해 React Component로 import 처리`,
  //     `styled-components로 컴포넌트 기반 스타일 분리 + 동적 props 대응`,
  //     `폴더 구조를 pages, components, styles, types 등으로 기능별 역할에 따라 분리하여 유지보수성과 가독성 확보`,
  //     `접근성 개선을 위해 aria-label, 시맨틱 태그, 버튼 역할 명시 등 고려`
  //   ],
  //   issues: [
  //     {
  //       title: `웹폰트 import 오류`,
  //       summary: `Pretendard Variable 웹폰트가 정상적으로 로드되지 않아 스타일이 기본 시스템 폰트로 fallback되는 현상이 발생`,
  //       cause: [
  //         `public/font/ 폴더 하위의 .woff2 파일을 src 내부에서 직접 import 하려다 TypeScript에서 타입 오류 발생`,
  //         `Vite 환경에서는 public 폴더에 있는 자산은 url()로만 접근 가능하며, import 방식으로 직접 참조 불가`
  //       ],
  //       img: `/assets/images/movieApp/issue_font.png`,
  //       solution: [
  //         `.woff2 타입을 선언하기 위해 declarations.d.ts 파일에 타입 정의 추가`,
  //         `GlobalStyle.ts에서 @font-face 선언 시 url()로 직접 선언`,
  //       ]
  //     },
  //     {
  //       title: `SVG 마스크 아이콘 배포 시 깨짐`,
  //       summary: `마스크 방식(mask, -webkit-mask)으로 구현한 SVG 아이콘이 로컬 개발환경에서는 정상적으로 보이지만, GitHub Pages 배포 시 마스크가 깨지고 아이콘이 표시되지 않음`,
  //       cause: [
  //         `CSS 마스크 방식에서는 url('/src/assets/...') 식의 절대경로 사용 시 Vite의 base 설정과 충돌이 발생해 배포 후 파일 경로를 제대로 참조하지 못함`
  //       ],
  //       img: `/assets/images/movieApp/issue_svg.png`,
  //       solution: [
  //         `CSS 마스크 방식 제거`,
  //         `vite-plugin-svgr을 설정해 SVG를 React 컴포넌트로 import하여 JSX에서 직접 사용`,
  //         `스타일을 styled-components로 처리하여 유지 보수성 확보`
  //       ]
  //     },
  //     {
  //       title: `API 응답 누락 방지`,
  //       summary: `YTS API를 통해 영화를 불러올 때 일부 데이터에서 genres 또는 description_full이 누락되어, 컴포넌트 렌더링 도중 오류가 발생하거나, 페이지에 undefined가 표시되는 문제가 발생`,
  //       cause: [
  //         `API에서 genres는 영화에 따라 없거나 빈 배열일 수 있음`,
  //         `description_full은 API 응답에 따라 존재하지 않을 수 있음`,
  //         `초기에는 해당 필드를 필수(required)로 선언하여 타입 오류 및 렌더링 중 예외 발생`
  //       ],
  //       img: `/assets/images/movieApp/issue_api.png`,
  //       solution: [
  //         `MovieType에서 description_full을 optional로 변경`,
  //         `데이터 사용 시 fallback 값( || summary || '' )으로 안전 처리`,
  //         `장르 배열 접근 시 optional chaining( ?. )으로 안전하게 필터링 처리`
  //       ]
  //     },
  //     {
  //       title: `긴 설명 텍스트 가독성 문제`,
  //       summary: `영화 상세 설명(description_full)이 너무 길어 페이지 레이아웃이 깨지거나, 가독성이 떨어지는 UI가 됨`,
  //       cause: [
  //         `API에서 제공하는 영화 설명은 길이에 제한이 없어 한 페이지에 너무 많은 텍스트가 노출됨`,
  //         `모바일 뷰에서 사용자 경험(UX) 저하`
  //       ],
  //       img: `/assets/images/movieApp/issue_desc.png`,
  //       solution: [
  //         `설명 텍스트가 일정 길이 이상일 경우 잘라서 노출하고, 전체보기/접기 버튼을 통해 토글 기능 제공`,
  //         `텍스트 길이 조건, 상태 관리를 통한 토글 구현으로 사용자 제어권 강화`
  //       ]
  //     }
  //   ],
  //   reflection: [
  //     `퍼블리셔에서 프론트엔드로 역할을 확장하며, React와 TypeScript로 데이터 흐름과 구조 설계를 직접 다룬 첫 프로젝트였습니다.`,
  //     `API 통신 중 useParams의 타입 추론 문제나 비동기 데이터 처리 과정에서 어려움이 있었지만, 문제를 해결해가며 React의 데이터 흐름과 상태 관리에 대한 이해를 높일 수 있었습니다.`,
  //     `또한 SVG 아이콘의 컴포넌트화, 웹폰트 최적화와 같은 실무에서 자주 마주치는 이슈를 직접 겪고 해결하면서, 단순 UI 구현을 넘어 프론트엔드 개발자로서 갖춰야 할 기초 체력을 쌓을 수 있었던 경험이었습니다.`,
  //     `이번 프로젝트를 통해 React와 TypeScript에 대한 흥미가 더 깊어졌고, 향후에는 전역 상태 관리, 테스트 코드 작성 등 실제 서비스에 가까운 구조로 발전시켜 나갈 계획입니다.`
  //   ]
  // },
  {
    id: `hcgHr`,
    title: `휴먼컨설팅그룹 HR 서비스 고도화`,
    overview: `기능이 지속적으로 추가되는 HR 서비스에서 UI 구조를 컴포넌트 기준으로 재정비해, 고도화 대응 비용과 유지보수 리스크를 줄인 경험`,
    security: true,
    problem: [
      `페이지별로 UI 구조와 컴포넌트 사용 방식이 달라 동일한 수정이 여러 화면에 반복 적용되는 비효율 발생`,
      `권한·상태·승인 흐름이 화면마다 개별 구현되어 예외 케이스가 누적되고 QA 비용이 증가`
    ],
    solution: [
      `Vue.js 기반으로 UI를 업무 단위(조회/입력/승인) 기준 컴포넌트 구조로 재설계`,
      `공통 모달·폼·테이블 컴포넌트를 분리하고 권한/상태 로직을 props로 제어하는 구조로 통합`,
      `SCSS 변수·mixin을 정리해 디자인 시스템을 코드 레벨에서 고정`,
      `주 1회 협업 미팅과 개발 가이드 문서화를 통해 코드 일관성과 품질을 관리`
    ],
    outcome: [
      `유사 UI 수정 시 수정 범위가 화면 단위 → 컴포넌트 단위로 축소`,
      `신규 HR 기능 추가 시 기존 구조 재사용이 가능해져 고도화 대응 속도와 안정성 개선`,
      `권한/상태 관련 UI 버그 및 QA 커뮤니케이션 비용 감소`
    ],
    reflection: [
      `UI를 단순 구현이 아닌 구조 관점에서 설계하며, Vue 기반 컴포넌트 설계 역량과 협업 중심 개발 사고를 강화`
    ]
  },
  {
    id: `skBio`,
    title: `SK바이오사이언스 HR 서비스`,
    overview: `데이터 기반 HR 화면에서 차트 시각화의 정확성과 일관성을 우선으로 구조를 정비한 프로젝트`,
    security: true,
    problem: [
      `차트 종류와 데이터 구조가 복잡해 화면은 표시되지만, 수치 신뢰성 관련 이슈가 반복 발생`,
      `차트 화면별로 스타일 기준이 달라 UI 일관성과 유지보수성이 저하된 상태`
    ],
    solution: [
      `ApexCharts 적용 시 실제 운영 데이터를 기준으로 반복 테스트를 진행해 시각화 정확도를 검증`,
      `데이터 없음/부분 누락/0값 등 엣지 케이스를 기준으로 UI 분기 처리`,
      `SCSS 변수 및 믹스인 구조를 재정비해 차트 레이아웃, 컬러, 여백 기준을 통일`,
      `디자이너, 개발자와 협업하여 시각화 요구사항과 UI 가이드 간 정합성을 지속적으로 조율`
    ],
    outcome: [
      `차트 수치 오류 및 데이터 불일치 관련 이슈 감소`,
      `데이터 변경 시 UI 수정 범위가 명확해져 유지보수 안정성 확보`,
      `차트 신뢰성에 대한 사용자 피드백이 줄어들며 QA 부담 감소`
    ],
    reflection: [
      `차트를 단순 UI 요소가 아닌, 업무 의사결정을 지원하는 데이터 도구로 설계하는 관점을 확립`
    ]
  },
  {
    id: `gs`,
    title: `GS칼텍스 통합 HR 플랫폼 개발`,
    overview: `요구사항이 지속적으로 변경되는 대규모 HR 프로젝트에서, 다중 플랫폼 UI를 구조적으로 관리하며 안정적인 확장을 지원한 경험`,
    security: true,
    problem: [
      `PC·모바일·채용 사이트 등 다중 플랫폼을 동시에 지원해야 하는 복잡한 서비스 구조`,
      `차트, 드래그/인터랙션 등 기능 요청이 잦아 기능 간 충돌 및 성능 저하 가능성 존재`,
      `고객사의 세부 디자인 및 기능 수정 요청이 반복되며 일정 압박 상황이 발생`
    ],
    solution: [
      `차트 및 인터랙션 로직을 모듈 단위로 분리해 기능 간 의존도를 최소화`,
      `신규 UI 요소는 기존 화면을 수정하지 않고 확장 가능한 구조로 설계`,
      `BEM 네이밍 체계를 적용해 스타일 충돌을 사전에 차단`,
      `반복되는 수정 요청에 대비해 공통 UI 기준을 유지하며 변경 범위를 제한`
    ],
    outcome: [
      `잦은 요구사항 변경에도 기존 화면에 미치는 영향 최소화`,
      `기능 추가 및 수정 시 사이드 이펙트 감소`,
      `대형 고객사 프로젝트에서 일정과 품질을 동시에 관리할 수 있는 구조 확보`
    ],
    reflection: [
      `요구사항 변화가 잦은 환경에서, 빠른 구현보다 구조적 안정성이 중요하다는 점을 체감`,
      `대규모 서비스에서는 UI 구현뿐 아니라 변경 대응 전략까지 고려한 설계가 필요함을 학습`
    ]
  },
  {
    id: `mmon`,
    title: `엠몬 솔루션 신규 구축 (회사 자체 솔루션)`,
    overview: `다수의 쇼핑몰 템플릿을 동시에 지원해야 하는 커머스 솔루션 환경에서, 공통 UI 구조와 스타일 시스템을 정립해 확장성과 유지보수성을 확보한 경험`,
    security: true,
    problem: [
      `여러 쇼핑몰 템플릿을 지원해야 하는 구조로 인해 UI 코드 중복과 스타일 불일치가 빈번하게 발생`,
      `프로젝트 초기에 공통 컴포넌트 및 스타일 기준이 명확하지 않아 화면별 구현 방식이 달라지는 상황`,
      `기능 추가 시 기존 화면에 영향을 주는 구조로 유지보수 비용이 점점 증가`
    ],
    solution: [
      `SCSS 기반 공통 스타일 가이드와 레이아웃 구조를 설계해 스타일 일관성을 확보`,
      `반복 사용되는 UI 요소를 공통 컴포넌트로 분리해 템플릿별 커스터마이징이 가능하도록 구조화`,
      `자바스크립트 공통 로직을 모듈로 분리해 재사용성과 유지보수성을 개선`,
      `코드 리뷰와 협업 프로세스를 정리해 구현 방식과 코드 품질 기준을 팀 내 기준으로 정립`
    ],
    outcome: [
      `신규 쇼핑몰 템플릿 추가 시 기존 구조를 재사용할 수 있어 개발 속도 개선`,
      `UI 수정 및 확장 시 수정 범위가 명확해져 유지보수 리스크 감소`,
      `템플릿 간 UI 일관성이 확보되어 서비스 완성도 향상`
    ],
    reflection: [
      `공통화와 구조 설계가 장기적인 유지보수 비용을 크게 좌우한다는 점을 실무에서 체감`,
      `공통화와 구조 설계 경험을 바탕으로, 이후 다양한 서비스에서 유지보수를 고려한 컴포넌트 설계를 적용할 수 있는 기준을 갖추게 됨`
    ]
  },
  {
    id: `nStation`,
    title: `내셔널지오그래픽 온라인몰 리뉴얼 (Nstation)`,
    link: `https://www.nstationmall.com/`,
    security: true,
    problem: [
      `페이지별 UI 구조가 상이해 유사 컴포넌트가 중복 구현되고, 유지보수 효율이 낮았던 환경`,
      `공통 UI 모듈화와 코드 구조 정리가 필요한 상태`,
      `메인 노출 영역(인기 검색어 롤링 등)에 사용자 인터랙션 구현이 요구됨`,
    ],
    solution: [
      `공통 UI 컴포넌트를 설계하고 SCSS 구조를 재정비해 유지보수 효율 개선`,
      `JavaScript로 인기 검색어 롤링 인터랙션을 직접 구현해 동적 UI 완성도 향상`,
      `중복 코드를 최소화해 전반적인 코드 일관성 확보`,
    ],
    reflection: [
      `공통화 설계와 인터랙션 구현을 병행하며 UI 구조 설계 관점과 JavaScript 활용 경험을 쌓음`,
      `퍼블리셔 업무에서도 구조와 재사용성을 고려한 접근이 중요하다는 기준을 형성`,
    ]
  },
  {
    id: `hago`,
    title: `HAGO 쇼핑몰 리뉴얼`,
    link: `https://www.hago.kr/`,
    security: true,
    problem: [
      `리뉴얼 과정에서 새로운 슬라이더 스타일과 애니메이션 요구가 추가되어, 기존 구조를 그대로 활용하기 어려운 상황`,
      `기존 UI 컴포넌트를 수정하지 않고 확장 가능한 방식으로 대응할 필요가 있었음`,
    ],
    solution: [
      `기존 슬라이더 컴포넌트를 분석해 옵션 기반으로 확장 가능한 구조로 재설계`,
      `애니메이션 및 전환 효과를 개선해 디자인 의도에 맞는 UX 구현`,
      `공통 UI 구조를 유지한 채 신규 기능을 안전하게 통합`,
    ],
    reflection: [
      `기존 코드 구조를 분석하고 확장 방향을 설계하는 사고력을 기를 수 있었음`,
      `신규 디자인 요구를 코드 구조 안에서 흡수하는 경험을 통해 유지보수 관점의 중요성을 체감`,
    ]
  },
  {
    id: `fp`,
    title: `패션플러스 2021 리뉴얼`,
    link: `https://www.fashionplus.co.kr/`,
    security: true,
    solution: [
      `SCSS 기반 모듈식 스타일 구조로 전환하고 BEM 네이밍 컨벤션을 적용해 협업 효율 개선`,
      `접근성 표준을 고려한 마크업으로 UI 품질 향상`,
    ],
    reflection: [
      `코드 컨벤션과 스타일 가이드가 유지보수와 협업 효율에 미치는 영향을 체감`,
      `대형 커머스 리뉴얼 프로젝트를 통해 구조화된 퍼블리싱의 중요성을 경험`,
    ]
  }
]