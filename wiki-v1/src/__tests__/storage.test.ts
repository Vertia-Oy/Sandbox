import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadContent, saveContent, DEFAULT_CONTENT } from '../utils/storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('loadContent', () => {
    it('returns default content when localStorage is empty', () => {
      const content = loadContent();
      expect(content).toBe(DEFAULT_CONTENT);
    });

    it('returns saved content from localStorage', () => {
      localStorage.setItem('wiki_v1_content', '# Test');
      const content = loadContent();
      expect(content).toBe('# Test');
    });

    it('returns default content when localStorage throws', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });
      const content = loadContent();
      expect(content).toBe(DEFAULT_CONTENT);
      vi.restoreAllMocks();
    });
  });

  describe('saveContent', () => {
    it('saves content to localStorage', () => {
      saveContent('# Hello');
      expect(localStorage.getItem('wiki_v1_content')).toBe('# Hello');
    });

    it('does not throw when localStorage is full', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });
      expect(() => saveContent('# Hello')).not.toThrow();
      vi.restoreAllMocks();
    });
  });
});
