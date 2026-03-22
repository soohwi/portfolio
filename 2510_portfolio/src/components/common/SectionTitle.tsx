/**
 * components/common
 * SectionTitle.tsx
**/

import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2 className={`hwiTitle ${className}`.trim()}>
      {children}
    </h2>
  );
}

export default SectionTitle;
