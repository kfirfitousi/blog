import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="h-full flex flex-row items-center justify-center space-x-6 text-slate-800 dark:text-slate-200">
      <Link href="https://www.github.com/kfirfitousi">
        <Github className="hover:text-slate-500 dark:hover:text-slate-400" />
        <label className="sr-only">Github</label>
      </Link>
      <Link href="https://www.linkedin.com/in/kfirp">
        <Linkedin className="hover:text-slate-500 dark:hover:text-slate-400" />
        <label className="sr-only">LinkedIn</label>
      </Link>
    </footer>
  );
}
