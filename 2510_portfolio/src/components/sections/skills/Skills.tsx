/**
 * components/sections
 * skills/Skills.tsx
**/

import styles from './skills.module.scss';
import SkillsList from './SkillsList';

function Skills() {
  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-title">
      <div className="hwiInner">
        <div className={styles.skillsBox}>
          <div className={styles.skillsInner}>
            {/* 핵심 역량, 보유 기술 및 역량 */}
            <h2 id="skills-title" className="hwiTitle">What I Do Best</h2>
            <p className={styles.skillsSub}>Skills & Competencies</p>
            <SkillsList />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
