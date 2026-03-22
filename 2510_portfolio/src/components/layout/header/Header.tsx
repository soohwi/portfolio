/**
 * components/layout
 * Header.tsx
**/

import clsx from 'clsx';
import styles from './header.module.scss';
import { useEffect, useState } from 'react';
import InnerContainer from 'common/InnerContainer';

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const $home = document.querySelector('#home');
    if (!$home) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // home 영역(하단 120px 기준)을 벗어나면 header show
        setIsVisible(!entry.isIntersecting);
      },
      {
        rootMargin: '-120px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe($home);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={clsx(
      styles.header,
      isVisible ? styles.show : ''
    )}>
      <InnerContainer className={styles.headerInner}>
        <h1 className={styles.logo}><i className={styles.logoIcon}></i><span className={styles.logoTitle}>SOOHWI.DEV</span></h1>

        {/* 일반 GNB (데스크탑용) */}
        <nav className={styles.gnb}>
          <ul className={styles.gnbList}>
            <li><a href="#home">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#project">Project</a></li>
            <li><a href="#career">Career</a></li>
          </ul>
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button className={clsx(styles.mobileMenuBtn, isMenuOpen && styles.menuOpen)} onClick={toggleMenu}><span /><span /><span /></button>

        {/* 모바일 메뉴 */}
        <nav className={clsx(styles.mobileMenu, isMenuOpen && styles.menuOpen)}>
          <ul>
            <li><a href="#home" onClick={closeMenu}>Home</a></li>
            <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
            <li><a href="#project" onClick={closeMenu}>Project</a></li>
            <li><a href="#career" onClick={closeMenu}>Career</a></li>
          </ul>
        </nav>
      </InnerContainer>
    </header>
  )
}

export default Header;