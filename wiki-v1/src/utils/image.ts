const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

export interface ImageResult {
  dataUrl: string;
  error?: never;
}

export interface ImageError {
  dataUrl?: never;
  error: string;
}

export type ImageProcessResult = ImageResult | ImageError;

export function processImageFile(file: File): Promise<ImageProcessResult> {
  return new Promise((resolve) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      resolve({ error: `Tyyppiä ${file.type} ei tueta. Sallitut: PNG, JPEG, WebP, GIF.` });
      return;
    }

    if (file.size > MAX_SIZE) {
      resolve({ error: `Kuva on liian suuri (${(file.size / 1024 / 1024).toFixed(1)} MB). Maksimi on 5 MB.` });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      resolve({ dataUrl: reader.result as string });
    };
    reader.onerror = () => {
      resolve({ error: 'Kuvan lukeminen epäonnistui.' });
    };
    reader.readAsDataURL(file);
  });
}
