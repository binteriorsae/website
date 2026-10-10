import type { Lang } from './i18n';
import { tx } from './i18n';
import ui from '../../content/ui.json';

const files = import.meta.glob('../../content/projects/*.json', { eager: true }) as Record<string, { default: any }>;

export interface Project {
  slug: string; order: number; name: any; category: string; property: any; year: string; location: any;
  line: any; brief: any; scope: any[]; heroImage: string; cardImage: string;
  pairs: { caption: any; before?: string; after: string }[];
}

/** All projects, in the order set in the CMS. */
export const projects: Project[] = Object.entries(files)
  .map(([path, m]) => ({ slug: path.split('/').pop()!.replace('.json', ''), ...m.default }))
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const categoryLabel = (cat: string, lang: Lang) => tx((ui.categories as any)[cat], lang) || cat;
