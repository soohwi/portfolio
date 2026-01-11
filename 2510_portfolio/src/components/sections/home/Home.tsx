/**
 * components/sections
 * home/Home.tsx
**/

import { useState, useEffect, useMemo } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Moon from 'components/threejs/Moon';
import styles from './home.module.scss';
import clsx from 'clsx';

function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isTitleFixed, setIsTitleFixed] = useState(false);
  const [titleOffset, setTitleOffset] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 모바일인지 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 페이지 진입 후 100ms 후 애니메이션 트리거
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTitle(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // 별 배경 마우스위치에 따른 움직임 이벤트
  const starPositions = useMemo(
    () =>
      Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 6 + 2,
      })),
    []
  );

  useEffect(() => {
    if (isMobile) return;

    const starEls = document.querySelectorAll<HTMLElement>('[data-star]');
    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const update = () => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (lastX - innerWidth / 2) / 30;
      const offsetY = (lastY - innerHeight / 2) / 30;

      starEls.forEach((el, i) => {
        const speed = (i % 5 + 1) * 0.4;
        el.style.transform = `translate(${offsetX * speed}px, ${offsetY * speed}px)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);


  // 스크롤에 따른 타이틀 및 컨텐츠 애니메이션
  useEffect(() => {
    let raf = 0;

    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const homeSection = document.getElementById('home');
        if (!homeSection) return;

        setTitleOffset(scrollY * 0.6);

        const homeTop = homeSection.offsetTop;
        const homeBottom = homeTop + homeSection.offsetHeight;
        const scrollMiddle = scrollY + window.innerHeight / 2;

        setHideTitle(prev => {
          const next = scrollMiddle >= homeTop + 800;
          return prev === next ? prev : next;
        });

        setShowContent(prev => {
          const next = scrollMiddle >= homeTop + 700;
          return prev === next ? prev : next;
        });

        setIsTitleFixed(prev => {
          const next = scrollY < homeBottom;
          return prev === next ? prev : next;
        });

      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 달 움직임 컨트롤
  function Controls() {
    const { invalidate } = useThree();
    return (
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={false}
        onChange={() => invalidate()}
      />
    );
  }

  // 다크모드 테마 적용
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = saved || 'light';

    document.documentElement.setAttribute('data-theme', initialTheme);
    setTheme(initialTheme);
  }, []);

  const handleThemeToggle = () => {
    const changeTheme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', changeTheme);
    localStorage.setItem('theme', changeTheme);

    setTheme(changeTheme);
  };

  return (
    <section id="home" className={styles.home}>
      <button
        className={clsx(styles.themeToggle)}
        aria-label="다크모드 토글"
        onClick={handleThemeToggle}
      >
        <i className={styles.icon}></i>
      </button>
      <div className={clsx(styles.homeInner, !isTitleFixed && styles.typeAbsolute)}>
        {/* 배경 (별/달) */}
        <div className={styles.homeVisual}>
          <div className={styles.moonBox}>
            {isMobile ? (
              <div className={styles.moonImageBox}>
                <i className={styles.moonImage} title="달 이미지"></i>
              </div>
            ) : (
              <>
                <p className={styles.moonInfo}><i className={styles.icon}></i>드래그로 달을 움직여 보세요 !</p>

                <Canvas
                  style={{ position: "absolute", top: 0, left: 0 }}
                  camera={{ position: [0, 0, 5], fov: 60 }}
                  gl={{ powerPreference: "low-power", antialias: false, toneMappingExposure: 1.5 }}// 저전력 GPU 선호, 안티앨리어싱 끄면 부하 감소, 전체노출(밝기)값
                  frameloop="demand" //기본 60fps 렌더 끔
                  dpr={[1, 1.5]} //과도한 픽셀 렌더 줄임
                >

                  <ambientLight intensity={1.5} />{/* 전체 기본광 */}
                  <directionalLight position={[4, 4, 4]} intensity={1.8} color="#ffffff" />{/* 달 형태를 살리는 메인 라이트 */}
                  <directionalLight position={[-3, -2, 2]} intensity={0.8} />{/* 반대쪽 보조광 (너무 어두워지는 것 방지) */}
                  <Moon />
                  <Controls />
                </Canvas>
              </>
            )}
          </div>
          <div className={styles.starsBox}>
            {starPositions.map((s) => (
              <div
                className={styles.star}
                key={s.id}
                data-star
                style={{
                  top: `${s.top}%`,
                  left: `${s.left}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                }}
              />
            ))}
          </div>
        </div>
        {/* //배경 (별/달) */}

        {/* 타이틀 */}
        <div className={clsx(styles.homeTitleBox, showTitle && !hideTitle && styles.visible)}>
          <div className={clsx(styles.homeTitle, styles.typeSolid)}>
            <p className={styles.text} style={{ transform: `translate3d(${titleOffset}px, 0, 0)` }}>PARK<br/> SOO HWI</p>
            <p className={styles.text} style={{ transform: `translate3d(-${titleOffset}px, 0, 0)` }}>FRONTEND</p>
          </div>
          <div className={clsx(styles.homeTitle, styles.typeBorder)}>
            <p className={styles.text} style={{ transform: `translate3d(${titleOffset}px, 0, 0)` }}>PARK<br/> SOO HWI</p>
            <p className={styles.text} style={{ transform: `translate3d(-${titleOffset}px, 0, 0)` }}>FRONTEND</p>
          </div>
        </div>
        {/* //타이틀 */}

        {/* 컨텐츠 */}
        <div className={clsx(styles.homeContent, showContent && styles.visible)}>
          <div className={styles.homeContentInner}>
            <p>
              5년 이상의 <strong>B2C 커머스·플랫폼 퍼블리싱 경험</strong>을 통해 사용자 중심 UI 기본기를 쌓고,<br/>
              이후 <strong>Vue.js 기반 B2B HR 서비스 실무 개발</strong>로 영역을 확장해온
              프론트엔드 개발자 박수휘입니다.
            </p>
            <p>
              커머스 환경에서의 UX 경험을 바탕으로,<br/>
              HR 도메인에서는 사용자 역할(대표/관리자/사원)과 데이터 흐름을 고려한<br/>
              <strong>권한·상태·승인 흐름을 포함한 업무 시스템 UI</strong>를 구현해왔으며,<br/>
              복잡한 폼·리스트 화면을 <strong>유지보수 관점</strong>에서 구조화하고 개선해왔습니다.
            </p>
            <p>
              디자인 구현에 그치지 않고, 협업을 고려한 UI 구조 설계와 지속적인 품질 개선에 강점이 있으며,<br/>
              React와 TypeScript는 개인 프로젝트를 통해 컴포넌트 구조와 상태 관리 패턴을 학습하며 기술 확장 기반을 다지고 있습니다.
            </p>
          </div>
        </div>
        {/* //컨텐츠 */}
      </div>
    </section>
  )
}

export default Home;