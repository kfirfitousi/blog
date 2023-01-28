'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';

import { MDXComponents } from '@/components/mdx-components';
import { MDXStyles } from '@/components/mdx-styles';

type MdxContentProps = {
  code: string;
};

export function MDXContent({ code }: MdxContentProps) {
  const Component = useMDXComponent(code);

  return (
    <MDXStyles>
      <Component components={MDXComponents} />
    </MDXStyles>
  );
}
