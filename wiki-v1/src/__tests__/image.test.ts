import { describe, it, expect } from 'vitest';
import { processImageFile } from '../utils/image';

function createMockFile(name: string, size: number, type: string): File {
  const buffer = new ArrayBuffer(size);
  return new File([buffer], name, { type });
}

describe('image processing', () => {
  it('rejects unsupported file type', async () => {
    const file = createMockFile('test.bmp', 100, 'image/bmp');
    const result = await processImageFile(file);
    expect(result.error).toBeDefined();
    expect(result.error).toContain('ei tueta');
  });

  it('rejects file over 5 MB', async () => {
    const file = createMockFile('big.png', 6 * 1024 * 1024, 'image/png');
    const result = await processImageFile(file);
    expect(result.error).toBeDefined();
    expect(result.error).toContain('liian suuri');
  });

  it('accepts valid PNG file', async () => {
    const file = createMockFile('test.png', 1024, 'image/png');
    const result = await processImageFile(file);
    expect(result.dataUrl).toBeDefined();
    expect(result.dataUrl).toContain('data:');
  });

  it('accepts valid JPEG file', async () => {
    const file = createMockFile('test.jpg', 1024, 'image/jpeg');
    const result = await processImageFile(file);
    expect(result.dataUrl).toBeDefined();
  });

  it('accepts valid WebP file', async () => {
    const file = createMockFile('test.webp', 1024, 'image/webp');
    const result = await processImageFile(file);
    expect(result.dataUrl).toBeDefined();
  });

  it('accepts valid GIF file', async () => {
    const file = createMockFile('test.gif', 1024, 'image/gif');
    const result = await processImageFile(file);
    expect(result.dataUrl).toBeDefined();
  });
});
