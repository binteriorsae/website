import { asset } from './site';

const SIZES = [600, 1200, 1800];

/**
 * Turns an image value from the CMS into a URL.
 *  - Unsplash placeholder photos: resized by their server.
 *  - Photos uploaded in the CMS (/uploads/..): the resized WebP copies made at build time.
 *  - Anything else: used as it is.
 */
export function imgSrc(src: string, width = 1200): string {
  if (!src) return '';
  if (src.includes('images.unsplash.com')) {
    return `${src.split('?')[0]}?w=${width}&q=75&auto=format&fit=crop`;
  }
  if (src.startsWith('/uploads/') && /\.(jpe?g|png|webp|avif)$/i.test(src)) {
    const size = SIZES.find((s) => s >= width) ?? SIZES[SIZES.length - 1];
    const name = src.replace(/^\/uploads\//, '').replace(/\.[^.]+$/, '');
    return asset(`uploads/_opt/${name}-${size}.webp`);
  }
  return src.startsWith('/') ? asset(src) : src;
}
