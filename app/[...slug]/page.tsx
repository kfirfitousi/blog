import "@/styles/markdown.css";

import { MdxContent } from "@/components/mdx-content";
import { PagesSource } from "@/lib/mdx-sources";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const files = await PagesSource.getAllMdxFiles();

  return files.map((file) => ({
    slug: file.slug.split("/"),
  }));
}

export default async function Page({ params }: PageProps) {
  const page = await PagesSource.getMdxNode(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="h-full px-8">
      <MdxContent source={page.serialized} />
    </article>
  );
}
