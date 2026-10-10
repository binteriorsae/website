import type { APIRoute } from 'astro';

// Search engines may crawl everything except the editing screen.
// Whether the site is allowed to appear in results is controlled by PUBLIC_NOINDEX
// (the "noindex" tag on each page), so Google can still read that instruction.
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const body = [
    'User-agent: *',
    'Allow: /',
    `Disallow: ${base}/admin/`,
    '',
    `Sitemap: ${new URL(`${base}/sitemap-index.xml`, site).href}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
