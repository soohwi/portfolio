/**
 * data
 * projectTabs.ts
**/

export const PROJECT_TABS = ['All', '개인', '(주)휴먼컨설팅그룹', '(주)엠몬스타'] as const;
export type ProjectTabType = typeof PROJECT_TABS[number];