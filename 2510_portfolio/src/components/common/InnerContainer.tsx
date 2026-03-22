/**
 * components/common
 * InnerContainer.tsx
**/

import { ReactNode } from 'react';

interface InnerContainerProps {
  children: ReactNode;
  className?: string;
}

function InnerContainer({ children, className = '' }: InnerContainerProps) {
  return (
    <div className={`hwiInner ${className}`.trim()}>
      {children}
    </div>
  );
}

export default InnerContainer;
