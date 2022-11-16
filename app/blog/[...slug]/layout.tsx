import "@/styles/hljs.css";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PostLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return (
    <div className="flex flex-col jusitfy-center px-8 pb-4">
      <Link
        href="/"
        className="pt-6 flex flex-row space-x-1 text-slate-700 hover:text-slate-500"
      >
        <ArrowLeft />
        <label className="cursor-pointer">Back</label>
      </Link>

      {children}

      <Link
        href="/"
        className="pt-8 flex flex-row space-x-1 text-slate-700 hover:text-slate-500"
      >
        <ArrowLeft />
        <label className="cursor-pointer">Back</label>
      </Link>
    </div>
  );
}
