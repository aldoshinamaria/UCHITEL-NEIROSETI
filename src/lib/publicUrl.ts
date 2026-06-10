/** URL к файлам из `public/` с учётом `base` в vite.config. */
export function publicUrl(filePath: string): string {
  const path = filePath.replace(/^\/+/, "");
  let base = import.meta.env.BASE_URL;
  if (base === "" || base === undefined) {
    base = "/";
  }
  if (!base.endsWith("/")) {
    base = `${base}/`;
  }
  return `${base}${path}`;
}
