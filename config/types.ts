import { type GiscusProps, type Theme as GiscusTheme } from '@giscus/react';
import { type Theme as ShikiTheme } from 'shiki';

/**
 * This type represents the configuration of the blog.
 * This should not be edited, unless you wish to add additional configurations.
 */
export type BlogConfig = {
  /**
   * The URL of the blog.
   * Used as the base URL for the OG image and as the siteUrl in the sitemap.
   */
  url: string;
  /**
   * The name of the blog. Visible in the header and the OG image.
   * Also used as the prefix for the `<title>` in the `<head>` of each page.
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
   * The descriptions for the home page and the posts page.
   */
  descriptions: {
    home: string;
    posts: string;
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
      light?: string;
      /**
       * @default #fda4af // rose-300
       */
      dark?: string;
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
