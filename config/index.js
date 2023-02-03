// @ts-check

/** @type {import('./types').BlogConfig} */
const blogConfig = {
  url: 'https://blog.kfirfitousi.com',
  title: '‹kfir/blog›',
  titleParts: ['kfir', 'blog'],
  author: 'Kfir Fitousi',
  descriptions: {
    home: "My name is Kfir and I'm a Full Stack Developer. Welcome to my personal dev blog! I write about Web Development and other topics I'm interested in.",
    posts:
      "All my blog posts. I write about Web Development and other topics I'm interested in.",
  },
  theme: {
    accentColor: {
      light: '#be123c',
      dark: '#fda4af',
    },
    codeBlockTheme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
  giscus: {
    repo: 'kfirfitousi/blog',
    repoId: 'R_kgDOIcM7JA',
    category: 'Comments',
    categoryId: 'DIC_kwDOIcM7JM4CTdK0',
    mapping: 'title',
    theme: {
      light: 'light',
      dark: 'dark_dimmed',
    },
  },
  footerLinks: {
    twitter: 'https://twitter.com/kp2c',
    github: 'https://github.com/kfirfitousi',
    linkedin: 'https://www.linkedin.com/in/kfirp',
    email: 'kfirfitousi@gmail.com',
    storybook: 'https://story.blog.kfirfitousi.com',
    buyMeAPizza: 'https://buymeacoffee.com/kfirfitousi',
  },
  topics: [
    'Web Development',
    'React',
    'TypeScript',
    'Next.js',
    'Design',
    'Computer Vision',
  ],
};

module.exports = { blogConfig };
