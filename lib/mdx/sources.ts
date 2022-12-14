import { type MdxNode, createMdxSource } from '@/lib/mdx';
import { rehypePlugins } from './plugins';
import z from 'zod';

const blogSchema = z.object({
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
});

export const BlogSource = createMdxSource({
  contentPath: 'content/posts',
  urlBase: '/posts',
  sortBy: 'date',
  sortOrder: 'desc',
  frontmatterSchema: blogSchema,
  rehypePlugins,
});

export type BlogMdxNode = MdxNode<typeof blogSchema>;

const pagesSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const PagesSource = createMdxSource({
  contentPath: 'content/pages',
  urlBase: '/',
  sortBy: 'title',
  sortOrder: 'desc',
  frontmatterSchema: pagesSchema,
  rehypePlugins,
});

export type PageMdxNode = MdxNode<typeof pagesSchema>;
