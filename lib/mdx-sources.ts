import { createMdxSource } from '@/lib/mdx';
import z from 'zod';

export const BlogSource = createMdxSource({
  contentPath: 'content/posts',
  basePath: '/posts',
  sortBy: 'date',
  sortOrder: 'desc',
  frontmatter: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
  }),
});

export type BlogMdxNode = NonNullable<
  Awaited<ReturnType<typeof BlogSource.getMdxNode>>
>;

export const PagesSource = createMdxSource({
  contentPath: 'content/pages',
  basePath: '/',
  sortBy: 'title',
  sortOrder: 'desc',
  frontmatter: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type PageMdxNode = NonNullable<
  Awaited<ReturnType<typeof PagesSource.getMdxNode>>
>;
