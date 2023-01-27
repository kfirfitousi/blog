import { s } from 'hastscript';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { type Pluggable } from 'unified';

export const remarkPlugins: Pluggable[] = [
  // GitHub Flavored Markdown
  remarkGfm,
];

export const rehypePlugins: Pluggable[] = [
  // Add IDs to headings
  rehypeSlug,

  // Add links to headings
  [
    rehypeAutolinkHeadings,
    {
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
          'aria-label': 'Anchor link',
        },
        [
          s('line', { x1: '4', y1: '9', x2: '20', y2: '9' }),
          s('line', { x1: '4', y1: '15', x2: '20', y2: '15' }),
          s('line', { x1: '10', y1: '3', x2: '8', y2: '21' }),
          s('line', { x1: '16', y1: '3', x2: '14', y2: '21' }),
        ],
      ),
    },
  ],

  // Add titles to code blocks
  rehypeCodeTitles,

  // Syntax highlighting in code blocks
  rehypeHighlight,
];
