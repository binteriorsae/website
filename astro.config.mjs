import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const base = process.env.BASE_PATH || '/';

// SITE_URL / BASE_PATH are set by the deploy workflow.
// While the site lives at binteriorsae.github.io/website the base path is /website;
// on the real domain it is just /.
export default defineConfig({
  site: process.env.SITE_URL || 'https://binteriors.ae',
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // list every page in both languages, with links between the two versions
      i18n: { defaultLocale: 'en', locales: { en: 'en', ar: 'ar' } },
      // leave out the language-picker page at the root and the editing screen
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '');
        return path !== base.replace(/\/$/, '') && !path.includes('/admin');
      },
    }),
  ],
});
