import { s } from 'hastscript';
import rehypeAutolinkHeadings, {
  type Options as AutolinkOptions,
} from 'rehype-autolink-headings';
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { type Pluggable } from 'unified';

import { blogConfig } from '../config';

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
    } satisfies Partial<AutolinkOptions>,
  ],

  // Pretty code blocks
  [
    rehypePrettyCode,
    {
      theme: {
        light: blogConfig.theme?.codeBlockTheme?.light || 'github-light',
        dark: blogConfig.theme?.codeBlockTheme?.dark || 'github-dark',
      },
      onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and
        // allow empty lines to be copy/pasted
        if (node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }];
        }
      },
      onVisitHighlightedLine(node) {
        // Each line node by default has `class="line"`.
        node.properties.className.push('highlighted');
      },
      onVisitHighlightedWord(node) {
        // Each word node has no className by default.
        node.properties.className = ['word'];
      },
    } satisfies Partial<PrettyCodeOptions>,
  ],
];
