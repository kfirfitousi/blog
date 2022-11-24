import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="h-full flex flex-row items-center justify-center space-x-6 py-8 text-slate-700 dark:text-rose-50">
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
