import TurndownService from 'turndown';
import Showdown from 'showdown';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

// Keep images as-is (including base64)
turndown.addRule('images', {
  filter: 'img',
  replacement: (_content, node) => {
    const el = node as HTMLImageElement;
    const alt = el.getAttribute('alt') || '';
    const src = el.getAttribute('src') || '';
    return `![${alt}](${src})`;
  },
});

const showdown = new Showdown.Converter({
  simplifiedAutoLink: true,
  strikethrough: true,
  tables: true,
  openLinksInNewWindow: true,
});

export function htmlToMarkdown(html: string): string {
  return turndown.turndown(html);
}

export function markdownToHtml(markdown: string): string {
  return showdown.makeHtml(markdown);
}
