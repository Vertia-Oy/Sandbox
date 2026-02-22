import { Node, mergeAttributes } from '@tiptap/react';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    loomEmbed: {
      setLoomEmbed: (options: { src: string }) => ReturnType;
    };
  }
}

export const LoomEmbed = Node.create({
  name: 'loomEmbed',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-loom-embed]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const src = HTMLAttributes.src;
    return [
      'div',
      mergeAttributes({ 'data-loom-embed': '', class: 'loom-embed' }),
      [
        'iframe',
        {
          src,
          frameborder: '0',
          allowfullscreen: 'true',
          style: 'width:100%;aspect-ratio:16/9;border-radius:8px;border:none;',
        },
      ],
    ];
  },

  addCommands() {
    return {
      setLoomEmbed:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

const LOOM_URL_REGEX = /https?:\/\/(www\.)?loom\.com\/share\/([a-zA-Z0-9]+)/;

export function extractLoomId(url: string): string | null {
  const match = url.match(LOOM_URL_REGEX);
  return match ? match[2] : null;
}

export function isLoomUrl(url: string): boolean {
  return LOOM_URL_REGEX.test(url);
}

export function getLoomEmbedUrl(shareUrl: string): string | null {
  const id = extractLoomId(shareUrl);
  return id ? `https://www.loom.com/embed/${id}` : null;
}
