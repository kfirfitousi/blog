import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
} from 'contentlayer/source-files';
import { s } from 'hastscript';
import rehypeAutolinkHeadings, {
  type Options as AutolinkOptions,
} from 'rehype-autolink-headings';
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { blogConfig } from './config';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    description: 'The slug of the post, e.g. my-topic/my-post',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'When the post was published',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'Short summary of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'A list of keywords that relate to the post',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      description: 'The URL of the post, e.g. /posts/my-post',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    ...computedFields,
  },
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the page',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the page',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      description: 'The URL of the page, e.g. /about',
      resolve: (post) =>
        `/${post._raw.flattenedPath.split('/').slice(1).join('/')}`,
    },
    ...computedFields,
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [
      /**
       * Adds support for GitHub Flavored Markdown
       */
      remarkGfm,
    ],
    rehypePlugins: [
      /**
       * Adds ids to headings
       */
      rehypeSlug,
      [
        /**
         * Adds auto-linking button after h1, h2, h3 headings
         */
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
      [
        /**
         * Enhances code blocks with syntax highlighting, line numbers,
         * titles, and allows highlighting specific lines and words
         */
        rehypePrettyCode,
        {
          theme: blogConfig.theme?.codeBlockTheme || {
            light: 'github-light',
            dark: 'github-dark',
          },
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word'];
          },
          tokensMap: {
            fn: 'entity.name',
            type: 'entity.name',
            prop: 'entity.name',
            const: 'variable.other.constant',
          },
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
  },
});
