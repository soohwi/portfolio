/**
 * components/sections
 * project/ProjectTab.tsx
**/

import { useMemo } from 'react';
import styles from './project.module.scss';
import { ProjectData } from 'data/projectData';
import { PROJECT_TABS, type ProjectTabType } from 'data/projectTabs';


interface TabProps {
  selectedTab: ProjectTabType;
  setSelectedTab: (tab: ProjectTabType) => void;// void=반환값없음
}

// 2자릿수 포매팅
const formatCount = (count: number) => String(count).padStart(2, '0');

function ProjectTab({ selectedTab, setSelectedTab }: TabProps) {

  // 각 탭별 개수 계산
  const tabItemCount = useMemo(() => {
    return PROJECT_TABS.map((tab) => {
      if (tab === 'All') return ProjectData.length;
      return ProjectData.filter((item) => item.comp === tab).length;
    });
  }, []);

  return (
    <div className={styles.projectTab}>
      <ul role="tablist">
        {PROJECT_TABS.map((tab, i) => (
          <li key={tab}>
            <button
              type="button"
              className={tab === selectedTab ? styles.tabOn : ''}
              role="tab"
              aria-selected={tab === selectedTab}
              aria-label={`${tab} 프로젝트 ${tabItemCount[i]}건`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
              <span
                className={styles.tabItemNum}
                aria-hidden="true"
              >
                {formatCount(tabItemCount[i])}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectTab;