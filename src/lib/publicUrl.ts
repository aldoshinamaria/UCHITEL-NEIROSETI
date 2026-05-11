/** Префикс из vite.config base (со слэшем на конце). */
export function publicUrl(filePath: string): string {
  const base = import.meta.env.BASE_URL;
  const path = filePath.replace(/^\//, "");
  return `${base}${path}`;
}

/** Фрагмент для BrowserRouter (без завершающего слэша, кроме корня ""). */
export function routerBasename(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}
