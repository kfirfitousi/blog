import type { GiscusProps, Theme as GiscusTheme } from '@giscus/react';
import type { Theme as ShikiTheme } from 'shiki';

/**
 * This type represents the configuration of the blog.
 * It should not be edited, unless you wish to add additional configurations.
 */
export type BlogConfig = {
  /**
   * The URL of the blog.
   * You can use localhost while developing, but make sure to change it to the actual URL when deploying.
   * Should not include a trailing slash.
   * @example 'https://blog.kfirfitousi.com'
   * @example 'http://localhost:3000'
   */
  url: string;
  /**
   * The title of the blog. Visible in the header and the OG image.
   * Also used as the prefix for the title of each page.
   */
  title: string;
  /**
   * If you want to keep the styling of the title (i.e ‹xxx/yyy›),
   * pass the two parts separately.
   * @example ['kfir', 'blog']
   */
  titleParts?: [string, string];
  /**
   * The name of the blog's author. Visible in the footer.
   */
  author: string;
  /**
   * The two main pages of the blog, the home page and the posts page.
   * To add a markdown page (e.g. about, contact, etc.),
   * simply add a new file to the `content/pages` directory.
   */
  pages: {
    home: {
      /**
       * The title of the home page (the part after the pipe).
       * When omitted, only the blog's name is used (without the pipe).
       * @example 'Home' --> '‹blog/name› | Home'
       * @example undefined --> '‹blog/name›'
       */
      title?: string;
      /**
       * The description of the home page.
       */
      description: string;
    };
    posts: {
      /**
       * The URL of the posts page.
       * If you want to use a different URL,
       * make sure to rename the `app/posts` directory to match.
       */
      url: `/${string}`;
      /**
       * The title of the posts page (the part after the pipe).
       */
      title: string;
      /**
       * The description of the posts page.
       */
      description: string;
    };
  };
  /**
   * Customize the blog's theme.
   */
  theme?: {
    /**
     * The accent color to use.
     */
    accentColor?: {
      /**
       * @default #be123c // rose-700
       */
      light?: `#${string}`;
      /**
       * @default #fda4af // rose-300
       */
      dark?: `#${string}`;
    };
    /**
     * The themes to use for the code blocks.
     * Must be a valid {@link ShikiTheme}.
     */
    codeBlockTheme?: {
      /**
       * @default 'github-light'
       */
      light: ShikiTheme;
      /**
       * @default 'github-dark'
       */
      dark: ShikiTheme;
    };
  };
  /**
   * Giscus comment sections configuration.
   * @see https://giscus.app
   */
  giscus: Omit<GiscusProps, 'theme'> & {
    /**
     * The themes to use in the Giscus comment sections.
     * Must be a valid {@link GiscusTheme}.
     */
    theme?: {
      /**
       * @default 'light'
       */
      light?: GiscusTheme;
      /**
       * @default 'dark_dimmed'
       */
      dark?: GiscusTheme;
    };
  };
  /**
   * Footer links.
   */
  footerLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
    storybook?: string;
    buyMeAPizza?: string;
  };
  /**
   * Topics to show in the hero section typing animation.
   */
  topics: string[];
};
