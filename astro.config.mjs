import { defineConfig } from 'astro/config';

// SITE_URL / BASE_PATH are set by the deploy workflow.
// While the site lives at binteriorsae.github.io/website the base path is /website;
// on the real domain it is just /.
export default defineConfig({
  site: process.env.SITE_URL || 'https://binteriors.ae',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
