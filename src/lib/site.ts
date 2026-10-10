import type { Lang } from './i18n';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** URL for a file in /public (logo, js, uploads). */
export const asset = (p: string) => `${BASE}/${p.replace(/^\//, '')}`;

/** URL for a page in a language, e.g. href('ar', 'about/') -> /ar/about/ */
export const href = (lang: Lang, path = '') => `${BASE}/${lang}/${path}`;
