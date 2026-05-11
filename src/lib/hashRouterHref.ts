/** Ссылки вида `/x` с HashRouter на GitHub Pages ведут на `origin/x`, а не на приложение — нужен hash. */
export function hashRouterHref(href: string): string {
  if (
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }
  if (href.startsWith("/")) {
    return `#${href}`;
  }
  return href;
}
