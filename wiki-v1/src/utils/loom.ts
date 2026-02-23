const LOOM_REGEX = /https?:\/\/(www\.)?loom\.com\/share\/([a-zA-Z0-9]+)/g;

export function replaceLoomLinksWithEmbeds(html: string): string {
  return html.replace(
    /<a[^>]*href="(https?:\/\/(www\.)?loom\.com\/share\/[a-zA-Z0-9]+)"[^>]*>[^<]*<\/a>/g,
    (_match, url) => {
      const embedUrl = loomShareToEmbed(url);
      if (!embedUrl) return _match;
      return `<div class="loom-embed"><iframe src="${embedUrl}" frameborder="0" allowfullscreen style="width:100%;aspect-ratio:16/9;border-radius:8px;"></iframe></div>`;
    }
  );
}

export function replaceLoomUrlsInText(html: string): string {
  return html.replace(LOOM_REGEX, (match) => {
    const embedUrl = loomShareToEmbed(match);
    if (!embedUrl) return match;
    return `<div class="loom-embed"><iframe src="${embedUrl}" frameborder="0" allowfullscreen style="width:100%;aspect-ratio:16/9;border-radius:8px;"></iframe></div>`;
  });
}

function loomShareToEmbed(url: string): string | null {
  const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
  if (!match) return null;
  return `https://www.loom.com/embed/${match[1]}`;
}
