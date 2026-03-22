/**
 * components/sections
 * project/Project.tsx
**/

import styles from './project.module.scss';
import { useState } from 'react';
import ProjectList from './ProjectList';
import ProjectTab from './ProjectTab';
import { PROJECT_TABS, type ProjectTabType } from 'data/projectTabs';
import InnerContainer from 'common/InnerContainer';
import SectionTitle from 'common/SectionTitle';

function Project() {
  const [selectedTab, setSelectedTab] = useState<ProjectTabType>('All');

  return (
    <section id="project" className={styles.project}>
      <InnerContainer>
        <SectionTitle>Project</SectionTitle>
        <ProjectTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </InnerContainer>

      <ProjectList selectedTab={selectedTab} />
    </section>
  )
}

export default Project;