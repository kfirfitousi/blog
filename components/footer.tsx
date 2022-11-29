import { ArrowUp, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative h-full flex flex-row items-center justify-center space-x-6 p-8 text-slate-700 dark:text-rose-50">
      <a href="#header" className="w-fit absolute inset-8">
        <ArrowUp
          className="hover:text-rose-600 dark:hover:text-rose-400"
          aria-label="Scroll to top"
        />
      </a>
      <Link href="https://www.github.com/kfirfitousi">
        <Github
          className="hover:text-rose-600 dark:hover:text-rose-400"
          aria-label="My GitHub profile"
        />
      </Link>
      <Link href="https://www.linkedin.com/in/kfirp">
        <Linkedin
          className="hover:text-rose-600 dark:hover:text-rose-400"
          aria-label="My LinkedIn profile"
        />
      </Link>
    </footer>
  );
}
