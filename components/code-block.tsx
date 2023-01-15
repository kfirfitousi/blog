import { useState } from 'react';
import { CopyCode } from '@/components/copy-code';

type CodeBlockProps = {
  children: React.ReactNode;
};

export function CodeBlock({ children }: CodeBlockProps) {
  const [showCopy, setShowCopy] = useState(false);

  return (
    <pre
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
      onFocus={() => setShowCopy(true)}
      onBlur={() => setShowCopy(false)}
    >
      {showCopy && <CopyCode codeElement={children as React.ReactElement} />}
      {children}
    </pre>
  );
}
