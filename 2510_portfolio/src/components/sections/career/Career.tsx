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
                <i className={`${styles[`careerLogo_${item.logo}`]}`} aria-hidden="true"></i>
                <dl>
                  <dt>{item.company}</dt>
                  <dd className={styles.textInfo}>
                    {item.team} | {item.role} | {item.position} | {item.period}
                  </dd>
                  <dd>
                    <ul className="textList" role="list">
                      {item.summary.map((sentence, idx) => (
                        <li key={idx}>
                          {sentence.map((part, i) => (
                            part.bold ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>
                          ))}
                        </li>
                      ))}
                      <li><strong>주요 프로젝트</strong>: {item.project}</li>
                    </ul>
                  </dd>
                  <dd>
                    <ul className="badgeList" role="list">
                      {item.skills.map((item, idx) => (
                        <li className="badge" key={idx}>{item}</li>
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