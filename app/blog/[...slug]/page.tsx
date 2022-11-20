import "@/styles/hljs.css";
import "@/styles/code-title.css";

import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeTitles from "rehype-code-titles";
import BlogSource from "@/lib/mdx-sources";

import { MdxContent } from "@/components/mdx-content";
import { PostIntro } from "@/components/post-intro";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  const files = await BlogSource.getMdxFiles();

  return files.map((file) => ({
    slug: file.slug.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await BlogSource.getMdxNode(params.slug);

  if (!post) {
    notFound();
  }

  const mdx = await serialize(post.content, {
    mdxOptions: { rehypePlugins: [rehypeCodeTitles, rehypeHighlight] },
  });

  return (
    <article className="min-h-[calc(100vh-176px)] px-8">
      <PostIntro
        title={post.frontMatter.title}
        date={post.frontMatter.date}
        tags={post.frontMatter.tags}
      />
      <MdxContent source={mdx} />
    </article>
  );
}
