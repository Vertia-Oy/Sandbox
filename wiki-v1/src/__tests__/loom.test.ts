import { describe, it, expect } from 'vitest';
import { extractLoomId, isLoomUrl, getLoomEmbedUrl } from '../components/LoomEmbed';

describe('loom utils', () => {
  describe('isLoomUrl', () => {
    it('recognizes loom.com share URLs', () => {
      expect(isLoomUrl('https://www.loom.com/share/abc123')).toBe(true);
      expect(isLoomUrl('https://loom.com/share/abc123')).toBe(true);
      expect(isLoomUrl('http://loom.com/share/abc123')).toBe(true);
    });

    it('rejects non-loom URLs', () => {
      expect(isLoomUrl('https://youtube.com/watch?v=abc')).toBe(false);
      expect(isLoomUrl('https://example.com')).toBe(false);
      expect(isLoomUrl('not a url')).toBe(false);
    });
  });

  describe('extractLoomId', () => {
    it('extracts ID from loom share URL', () => {
      expect(extractLoomId('https://www.loom.com/share/abc123def')).toBe('abc123def');
      expect(extractLoomId('https://loom.com/share/xyz789')).toBe('xyz789');
    });

    it('returns null for non-loom URLs', () => {
      expect(extractLoomId('https://youtube.com/watch?v=abc')).toBeNull();
    });
  });

  describe('getLoomEmbedUrl', () => {
    it('converts share URL to embed URL', () => {
      expect(getLoomEmbedUrl('https://www.loom.com/share/abc123'))
        .toBe('https://www.loom.com/embed/abc123');
    });

    it('returns null for non-loom URLs', () => {
      expect(getLoomEmbedUrl('https://youtube.com/watch?v=abc')).toBeNull();
    });
  });
});
