import { describe, it, expect } from 'vitest';
import { htmlToMarkdown, markdownToHtml } from '../utils/markdown';

describe('markdown', () => {
  describe('htmlToMarkdown', () => {
    it('converts heading to markdown', () => {
      const md = htmlToMarkdown('<h1>Hello</h1>');
      expect(md).toContain('# Hello');
    });

    it('converts bold to markdown', () => {
      const md = htmlToMarkdown('<strong>bold</strong>');
      expect(md).toContain('**bold**');
    });

    it('converts italic to markdown', () => {
      const md = htmlToMarkdown('<em>italic</em>');
      expect(md).toContain('_italic_');
    });

    it('preserves image with base64 src', () => {
      const src = 'data:image/png;base64,iVBORw0KGgo=';
      const md = htmlToMarkdown(`<img src="${src}" alt="test">`);
      expect(md).toContain(src);
      expect(md).toContain('![test]');
    });

    it('converts links', () => {
      const md = htmlToMarkdown('<a href="https://example.com">link</a>');
      expect(md).toContain('[link](https://example.com)');
    });
  });

  describe('markdownToHtml', () => {
    it('converts heading to HTML', () => {
      const html = markdownToHtml('# Hello');
      expect(html).toContain('<h1');
      expect(html).toContain('Hello');
    });

    it('converts bold to HTML', () => {
      const html = markdownToHtml('**bold**');
      expect(html).toContain('<strong>bold</strong>');
    });

    it('converts links to HTML', () => {
      const html = markdownToHtml('[link](https://example.com)');
      expect(html).toContain('href="https://example.com"');
    });
  });
});
