const STORAGE_KEY = 'wiki_v1_content';

export const DEFAULT_CONTENT = `# Tervetuloa Wikiin

Tämä on wiki-sivusi. Voit muokata tätä sisältöä vapaasti.

## Ominaisuudet

- **Lihavointi** ja *kursivointi*
- [Linkit](https://example.com)
- Otsikot (H1–H3)
- Listat
- Kuvien lisäys (raahaa, liitä tai valitse tiedosto)
- Loom-videoiden upotus

Aloita kirjoittaminen tähän...
`;

export function loadContent(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ?? DEFAULT_CONTENT;
  } catch {
    return DEFAULT_CONTENT;
  }
}

export function saveContent(content: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, content);
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }
}
