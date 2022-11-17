import "@/styles/hljs.css";

import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import BlogSource from "@/lib/mdx";

import { MdxContent } from "@/components/mdx-content";
import { PostTags } from "@/components/post-tags";

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
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });

  return (
    <article className="px-8 pt-4 md:pt-8 lg:pt-12">
      <div className="flex flex-col space-y-4 p-3">
        <h1 className="text-slate-800 dark:text-slate-200 md:leading-12 text-3xl font-bold leading-[1.2] sm:text-4xl md:text-5xl">
          {post.frontMatter.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Published {new Date(post.frontMatter.date).toLocaleDateString()}
        </p>
        <PostTags tags={post.frontMatter.tags} />
      </div>
      <div
        className="
          pt-8 prose prose-slate dark:prose-invert md:prose-lg lg:prose-xl max-w-none 
          prose-pre:p-0 sm:prose-pre:p-0 md:prose-pre:p-0 lg:prose-pre:p-0 
          prose-blockquote:border-l-slate-800 dark:prose-blockquote:border-l-slate-300
          prose-a:no-underline prose-li:marker:text-slate-600 dark:prose-li:marker:text-slate-400"
      >
        <MdxContent source={mdx} />
      </div>
    </article>
  );
}
