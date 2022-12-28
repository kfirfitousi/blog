import '@/styles/globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Search } from '@/components/search';
import { Analytics } from '@/components/analytics';
import { BlogSource } from '@/lib/mdx/sources';
import { Red_Hat_Display, Newsreader } from '@next/font/google';
import clsx from 'clsx';

const fontSans = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-red-hat',
});

const fontSerif = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const posts = await BlogSource.getAllMdxNodes();

  return (
    <html
      lang="en"
      className={clsx(
        'scroll-pt-16 overflow-auto overscroll-none font-sans',
        fontSans.variable,
        fontSerif.variable,
      )}
    >
      <head />
      <body
        className="grid min-h-screen grid-cols-1 grid-rows-[6rem_minmax(calc(100vh-14rem),1fr)_8rem]
        bg-slate-200 dark:bg-slate-700 sm:grid-cols-[1fr_minmax(640px,1024px)_1fr]"
      >
        <section className="sticky top-0 z-30 col-span-1 row-span-1 row-start-1 h-full self-start sm:col-start-2">
          <Header />
        </section>
        <main className="col-span-1 row-start-2 bg-slate-200 dark:bg-slate-700 sm:col-start-2">
          {children}
        </main>
        <section className="col-span-3 row-span-1 row-start-3 bg-slate-200 dark:bg-slate-700 sm:col-span-1 sm:col-start-2">
          <Footer />
        </section>
        <div // left column
          className="col-span-1 col-start-1 row-span-3 row-start-1 hidden bg-gradient-to-r
            from-slate-400 via-slate-500 to-slate-700 dark:from-slate-300 
            dark:via-slate-400 dark:to-slate-500 sm:block"
        >
          <div className="invisible h-full w-full bg-opacity-5 bg-gradient-to-r from-rose-50 to-transparent dark:visible" />
        </div>
        <div // right column
          className="col-span-1 col-start-3 row-span-3 row-start-1 hidden bg-gradient-to-l
            from-slate-400 via-slate-500 to-slate-700 dark:from-slate-300 
            dark:via-slate-400 dark:to-slate-500 sm:block"
        >
          <div className="invisible h-full w-full bg-opacity-5 bg-gradient-to-l from-rose-50 to-transparent dark:visible" />
        </div>
        <Search posts={posts} />
        <Analytics />
      </body>
    </html>
  );
}
