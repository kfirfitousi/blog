import rehypeCodeTitles from 'rehype-code-titles';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { s } from 'hastscript';

export const rehypePlugins = [
  // GitHub Flavored Markdown
  remarkGfm,

  // Add IDs to headings
  rehypeSlug,

  // Add links to headings
  rehypeAutolinkHeadings.bind(null, {
    behavior: 'append',
    test: ['h1', 'h2', 'h3'],
    content: s(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: '24',
        height: '24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
      [
        s('path', {
          d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
        }),
        s('path', {
          d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
        }),
      ],
    ),
  }),

  // Add titles to code blocks
  rehypeCodeTitles,

  // Syntax highlighting in code blocks
  rehypeHighlight,
];
