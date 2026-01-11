/**
 * components/sections
 * project/Project.tsx
**/

import styles from './project.module.scss';
import { useState } from 'react';
import ProjectList from './ProjectList';
import ProjectTab from './ProjectTab';

function Project() {
  const [selectedTab, setSelectedTab] = useState('All');

  return (
    <section id="project" className={styles.project}>
      <div className="hwiInner">
        <h2 className="hwiTitle">Project</h2>
        <ProjectTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>

      <ProjectList selectedTab={selectedTab} />
    </section>
  )
}

export default Project;