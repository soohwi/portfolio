/**
 * components/layout
 * Footer.tsx
**/

import styles from './footer.module.scss';
import InnerContainer from 'common/InnerContainer';

function Footer() {
  return (
    <footer className={styles.footer}>
      <InnerContainer>
        푸터
      </InnerContainer>
    </footer>
  )
}

export default Footer;