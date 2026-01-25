/**
 * components/sections
 * project/ProjectCardModal.tsx
**/

import styles from './project.module.scss';
import clsx from 'clsx';
import { ProjectItem } from 'data/projectData';
import { ProjectDetail } from 'data/projectDetailData';

interface ProjectCardModalProps {
  item: ProjectItem;
  detail?: ProjectDetail;
}

function ProjectCardModal({ item, detail }: ProjectCardModalProps) {
  return (
    <div className={clsx(
      styles.modalDetail,
      styles[`type_${item.id}`]
    )}>
      {/* 기본정보 */}
      <div className={styles.modalInfo}>
        <div className={styles.modalInfoTitle}>
          <h4 className={styles.infoTitle}>{item.title}</h4>
          {detail?.overview && (
            <p>{detail.overview}</p>
          )}
        </div>
        <p className={styles.infoPosition}>{item.position}</p>
        <ul className={styles.badgeSkill}>
          {item.skill.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <dl>
          <dt>작업 기간</dt>
          <dd>{item.period}</dd>
        </dl>
        {/* <dl>
          <dt>사용 언어</dt>
          <dd>{item.skill}</dd>
        </dl> */}
        {detail?.purpose && (
          <dl>
            <dt>개발 목적</dt>
            <dd>{detail.purpose}</dd>
          </dl>
        )}

        {/* 링크버튼 */}
        {(detail?.link || detail?.git) && (
          <div className={styles.infoBtnGroup}>
            {detail?.link && (
              <a
                href={detail.link}
                className={styles.btnLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="사이트 바로가기"
              ><i className={styles.btnLinkIcon}></i>바로가기</a>
            )}
            {detail?.git && (
              <a
                href={detail.git}
                className={clsx(styles.btnLink, styles.typeGit)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="사이트 바로가기"
              ><i className={styles.btnLinkIcon}></i>Git 바로가기</a>
            )}
          </div>
        )}
      </div>

      {/* 보안문구 */
        detail?.security && (
          <p className={styles.textSecurity}>
            <i className={styles.icon}></i>
            <span>본 프로젝트는 보안상 코드와 화면을 상세히 공개할 수 없어, <strong>프로젝트 구조 흐름과 회고 중심으로 구성했습니다.</strong></span>
          </p>
        )
      }

      {detail?.thumbnail && (
        <div className={styles.thumbnail}>
          <img src={detail.thumbnail} alt="hwitter 전체 이미지" />
        </div>
      )}

      {detail?.features && detail?.techStack && (
        <div className={styles.modalContent}>
          {/* 주요기능 */}
          {detail?.features && detail.features.length > 0 && (
            <section className={styles.modalSection}>
              <h5 className={styles.modalSubTitle}>주요 기능</h5>
              <ul className={styles.modalList}>
                {detail.features?.map((text, idx) => (
                  <li key={`features-${idx}`}>{text}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 기술 스택 및 구조적 시도 */}
          {detail?.techStack && detail.techStack.length > 0 && (
            <section className={styles.modalSection}>
              <h5 className={styles.modalSubTitle}>기술 스택 및 구조적 시도</h5>
              <ul className={styles.modalList}>
                {detail.techStack?.map((text, idx) => (
                  <li key={`techStack-${idx}`}>{text}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      <div className={styles.modalContent}>
        {/* 문제 해결 사례 */}
        {detail?.issues && detail.issues.length > 0 && (
          <section className={styles.modalSection}>
            <h5 className={styles.modalSubTitle}>문제 해결 사례</h5>
            <ul className={styles.issueList}>
              {detail.issues?.map((text, idx) => (
                <li key={`issues-${idx}`}>
                  <p className={styles.textIssueTitle}>{idx + 1}. {text.title}</p>
                  <div className={styles.textIssueContent}>
                    <p>{text.summary}</p>

                    {text.cause && (
                      <dl>
                        <dt>원인</dt>
                        <dd>
                          <ul className={styles.modalList}>
                            {text.cause?.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </dd>
                      </dl>
                    )}

                    {text.solution && (
                      <dl className={styles.typeSolution}>
                        <dt>해결방법</dt>
                        <dd>
                          <ul className={styles.modalList}>
                            {text.solution?.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </dd>
                      </dl>
                    )}

                    <div className={styles.issueImg}>
                      <img src={text.img} alt="코드 이미지" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 실무에서 겪은 문제 */}
        {detail?.problem && detail.problem.length > 0 && (
          <section className={styles.modalSection}>
            <h5 className={styles.modalSubTitle}>실무에서 겪은 문제</h5>
            <ul className={styles.modalList}>
              {detail.problem?.map((text, idx) => (
                <li key={`problem-${idx}`}>{text}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 내가 했던 개선 */}
        {detail?.solution && detail.solution.length > 0 && (
          <section className={styles.modalSection}>
            <h5 className={styles.modalSubTitle}>내가 했던 개선</h5>
            <ul className={styles.modalList}>
              {detail.solution.map((text, idx) => (
                <li key={`solution-${idx}`}>{text}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 결과 */}
        {detail?.outcome && detail.outcome.length > 0 && (
          <section className={styles.modalSection}>
            <h5 className={styles.modalSubTitle}>결과</h5>
            <ul className={styles.modalList}>
              {detail.outcome.map((text, idx) => (
                <li key={`outcome-${idx}`}>{text}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 회고 */}
        {detail?.reflection && detail.reflection.length > 0 && (
          <section className={styles.modalSection}>
            <h5 className={styles.modalSubTitle}>회고</h5>
            <ul className={styles.modalList}>
              {detail.reflection.map((text, idx) => (
                <li key={`reflection-${idx}`}>{text}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProjectCardModal;