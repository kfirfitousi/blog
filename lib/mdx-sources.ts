import { createMdxSource } from "./mdx";
import z from "zod";

export const BlogSource = createMdxSource({
  contentPath: "content",
  basePath: "/",
  sortBy: "date",
  sortOrder: "desc",
  frontmatter: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
  }),
});

export type BlogMdxNode = Awaited<ReturnType<typeof BlogSource.getMdxNode>>;
