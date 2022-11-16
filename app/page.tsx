import BlogSource from "@/lib/mdx";

import Link from "next/link";
import { PostTags } from "@/components/post-tags";

export default async function Home() {
  const posts = await BlogSource.getAllMdxNodes();

  return (
    <div className="flex flex-col space-y-4 px-12 pb-12">
      <section className="col-span-3 flex flex-col space-y-4 py-8 md:py-12">
        <h1 className="text-slate-800 text-center text-6xl font-bold">
          Kfir&apos;s Blog
        </h1>

        <h2 className="text-slate-600 text-center text-xl">
          Welcome to my personal blog
        </h2>
      </section>

      <section className="w-full col-start-2 flex flex-col space-y-4">
        {posts.map((post) =>
          post ? (
            <Link
              key={post.slug}
              href={post.url}
              className="group relative w-full h-full"
            >
              <article className="flex flex-col space-y-4 px-10 py-3 rounded bg-slate-100 m-[2px] relative z-10">
                <div className="flex flex-col space-y-2">
                  <h2 className="text-slate-800 text-2xl font-bold leading-normal sm:text-3xl md:text-3xl">
                    {post.frontMatter.title}
                  </h2>
                  <p className="text-slate-600">{post.frontMatter.excerpt}</p>
                  <p className="text-sm text-slate-600">
                    {new Date(post.frontMatter.date).toLocaleDateString()}
                  </p>
                </div>
                <PostTags tags={post.frontMatter.tags} />
              </article>
              <div className="absolute z-20 inset-0 bg-slate-800 w-4 h-[calc(100%-4px)] my-auto rounded-l group-hover:animate-border"></div>
            </Link>
          ) : null
        )}
      </section>
    </div>
  );
}
