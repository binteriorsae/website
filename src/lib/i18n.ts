export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];
export const DIR: Record<Lang, 'ltr' | 'rtl'> = { en: 'ltr', ar: 'rtl' };
export const LANG_NAME: Record<Lang, string> = { en: 'English', ar: 'العربية' };
export const other = (l: Lang): Lang => (l === 'en' ? 'ar' : 'en');

/** Pick the text for a language from an { en, ar } pair (falls back to English). */
export const tx = (v: any, lang: Lang): string => (v && (v[lang] || v.en)) || '';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Light formatting for headlines:
 *   *word*  -> accent style (<em>)
 *   newline -> line break
 * Everything else is escaped, so editors can't break the page.
 */
export const rich = (s: string): string =>
  esc(s || '').replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');

/** Plain text version of a rich string (no asterisks). */
export const plain = (s: string): string => (s || '').replace(/\*/g, '');

/** Lists saved by the CMS can disappear when emptied; treat a missing list as empty. */
export const list = <T,>(v: T[] | undefined | null): T[] => (Array.isArray(v) ? v : []);
