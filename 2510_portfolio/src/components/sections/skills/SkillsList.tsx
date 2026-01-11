/**
 * components/sections
 * skills/SkillsList.tsx
**/

import { useMemo } from 'react';
import styles from './skills.module.scss';
import { skillsData, type SkillsItem } from 'data/skillsData';

function SkillsList() {
  // 학습중(*)이 하나라도 있는지: 안내 문구를 하단에 1회만 노출하기 위함
  const anyLearning = useMemo(() => {
    return skillsData.some((item) => item.skills?.some((s) => s.isLearning));
  }, []);

  return (
    <>
      <div className={styles.skillsList}>
        {skillsData.map((item) =>
          item.isCompetency ? (
            <CompetencyItem key={item.id} item={item} />
          ) : (
            <SkillGroupItem key={item.id} item={item} />
          )
        )}
      </div>

      {anyLearning && (
        <p className={styles.textRefer}>
          <span className="badgeMark" aria-hidden="true">*</span> 현재 학습 및 실무 역량 강화 중
        </p>
      )}
    </>
  );
}

export default SkillsList;


/* --------------------------------
 * Internal Components
 * -------------------------------- */

function CompetencyItem({ item }: { item: SkillsItem }) {
  return (
    <div className={styles.skillsItem}>
      <ul className={styles.skillsComp}>
        {item.compList?.map((line, i) => {
          const key = line.map((seg) => seg.text).join('').trim() || `competency-${i}`;

          return (
            <li key={key}>
              {line.map((segment, segIdx) =>
                segment.bold ? (
                  <strong key={`${key}-${segIdx}`}>{segment.text}</strong>
                ) : (
                  <span key={`${key}-${segIdx}`}>{segment.text}</span>
                )
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SkillGroupItem({ item }: { item: SkillsItem }) {
  return (
    <div className={styles.skillsItem}>
      {item.title && <h3 className={styles.textTitle}>{item.title}</h3>}

      <ul className="badgeList" aria-label={`${item.title ?? '기술'} 목록`}>
        {item.skills?.map((skill) => (
          <li className="badge" key={skill.name}>
            {skill.name}
            {skill.isLearning && (
              <span className="badgeMark" aria-label="학습 중">
                *
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
