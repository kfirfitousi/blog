import "@/styles/globals.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Red_Hat_Display, Newsreader } from "@next/font/google";
import clsx from "clsx";

const fontSans = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat",
});

const fontSerif = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "bg-slate-300 dark:bg-slate-500 font-sans",
        fontSans.variable,
        fontSerif.variable
      )}
    >
      <head />
      <body className="h-screen flex-grow grid grid-rows-[fit-content_1fr_fit-content] grid-cols-1 sm:grid-cols-[1fr_minmax(600px,3fr)_1fr]">
        {/* header */}
        <div className="col-span-1 sm:col-span-1 sm:col-start-2 row-span-1 row-start-1 bg-slate-200 dark:bg-slate-700">
          <Header />
        </div>

        {/* main content */}
        <main className="col-span-1 row-start-2 sm:col-start-2 bg-slate-200 dark:bg-slate-700">
          {children}
        </main>

        {/* footer */}
        <div className="col-span-3 sm:col-span-1 sm:col-start-2 row-span-1 row-start-3 bg-slate-200 dark:bg-slate-700">
          <Footer />
        </div>

        {/* left column */}
        <div
          className="
              hidden sm:block col-span-1 col-start-1 row-span-3 row-start-1
              bg-gradient-to-r from-slate-400 via-slate-500 to-slate-700 
              dark:from-slate-300 dark:via-slate-400 dark:to-slate-500"
        >
          <div className="invisible dark:visible w-full h-full bg-opacity-5 bg-gradient-to-r from-rose-50 to-transparent" />
        </div>

        {/* right column */}
        <div
          className="
              hidden sm:block col-span-1 col-start-3 row-span-3 row-start-1
              bg-gradient-to-l from-slate-400 via-slate-500 to-slate-700 
              dark:from-slate-300 dark:via-slate-400 dark:to-slate-500"
        >
          <div className="invisible dark:visible w-full h-full bg-opacity-5 bg-gradient-to-l from-rose-50 to-transparent" />
        </div>
      </body>
    </html>
  );
}
