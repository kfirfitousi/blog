import "@/styles/globals.css";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-700">
      <head />
      <body className="flex flex-col">
        <div className="flex-grow grid grid-rows-[1fr_4rem] grid-cols-[1fr_3fr_1fr]">
          {/* main content */}
          <main className="col-span-1 col-start-2 bg-slate-200">
            {children}
          </main>

          {/* left column */}
          <div className="col-span-1 col-start-1 row-span-2 row-start-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-700"></div>

          {/* right column */}
          <div className="col-span-1 col-start-3 row-span-2 row-start-1 bg-gradient-to-l from-slate-400 via-slate-500 to-slate-700"></div>

          {/* footer */}
          <footer className="col-span-1 col-start-2 row-span-1 row-start-2 bg-slate-200">
            <div className="h-full flex flex-row items-center justify-center space-x-4">
              <Link href="https://www.github.com/kfirfitousi">
                <Github />
                <label className="sr-only">Github</label>
              </Link>
              <Link href="https://www.linkedin.com/in/kfirp">
                <Linkedin />
                <label className="sr-only">LinkedIn</label>
              </Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
