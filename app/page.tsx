import Link from "next/link";
import BlogSource from "@/lib/mdx";

export default async function Home() {
  const posts = await BlogSource.getAllMdxNodes();

  return (
    <section className="container mx-auto pt-8 md:w-max-3xl md:pt-12 lg:pt-16">
      <div className="flex flex-col space-y-4">
        <h1 className="text-slate-800 text-center text-6xl font-bold">
          My Blog
        </h1>

        <h2 className="text-slate-600 text-center text-xl">
          Welcome to my personal blog
        </h2>

        <div className="w-2/3 md:w-1/2 mx-auto flex flex-col space-y-4">
          {posts.map((post) =>
            post ? (
              <Link key={post.slug} href={post.url}>
                <article className="flex flex-col space-y-4 px-6 py-3 rounded bg-slate-100 hover:bg-slate-300 hover:border border-slate-800">
                  <div className="flex flex-col space-y-2">
                    <h2 className="max-w-[80%] text-2xl font-bold leading-normal sm:text-3xl md:text-3xl">
                      {post.frontMatter.title}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {post.frontMatter.date}
                    </p>
                  </div>
                  <p className="text-slate-600">{post.frontMatter.excerpt}</p>
                  <p className="flex flex-row space-x-1">
                    {post.frontMatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs text-slate-100 bg-slate-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                </article>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
