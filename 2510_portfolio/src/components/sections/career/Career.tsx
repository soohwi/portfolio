/**
 * components/sections
 * career/Career.tsx
**/

import styles from './career.module.scss';
import clsx from 'clsx';
import { careerData } from 'data/careerData';

function Career() {
  return (
    <section id="career" className={styles.career}>
      <div className="hwiInner">
        {/* 타이틀 */}
        <h2 className={clsx('hwiTitle', styles.careerTitle)}>Career</h2>
        {/*-- 타이틀 */}

        {/* 경력리스트 */}
        <div className={styles.careerBox}>
          <ol className={styles.careerList}>
            {careerData.map((item) => (
              <li key={item.id} className={styles.careerItem}>
                <i className={styles[`careerLogo_${item.logo}`]} aria-hidden="true"></i>
                <dl>
                  <dt>{item.company}</dt>
                  <dd className={styles.textInfo}>
                    {item.team} | {item.role} | {item.position} | {item.period}
                  </dd>
                  <dd className={styles.summary}>
                    <ul className="textList" role="list">
                      {item.summary.map((sentence, idx) => (
                        <li key={`${item.id}-sum-${idx}`}>
                          {sentence.map((part, i) => (
                            part.bold ?
                            <strong key={`${item.id}-sum-${idx}-${i}`}>{part.text}</strong>
                            : <span key={`${item.id}-sum-${idx}-${i}`}>{part.text}</span>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </dd>
                  <dd className={styles.projects}>
                    <h4 className={styles.projectsTitle}>주요 프로젝트</h4>
                    <ul className="textList" role="list">
                      {item.projects.map((p) => <li key={`${item.id}-${p}`}>{p}</li>)}
                    </ul>
                  </dd>
                  <dd className={styles.badges}>
                    <ul className="badgeList" role="list">
                      {item.skills.map((skill) => (
                        <li className="badge" key={`${item.id}-${skill}`}>{skill}</li>
                      ))}
                    </ul>
                  </dd>
                </dl>
              </li>
            ))}
          </ol>
        </div>
        {/*-- 경력리스트 */}
      </div>
    </section>
  )
}

export default Career;