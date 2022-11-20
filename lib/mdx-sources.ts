import { createMdxSource } from "./mdx";
import z from "zod";

const BlogSource = createMdxSource({
  contentPath: "content",
  basePath: "/blog",
  sortBy: "date",
  sortOrder: "desc",
  frontMatter: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
  }),
});

export default BlogSource;

export type BlogMdxNode = Awaited<ReturnType<typeof BlogSource.getMdxNode>>;
