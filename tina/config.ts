import { defineConfig } from 'tinacms';

// ---------------------------------------------------------------------------
// What Bayan can edit in the CMS. Style, fonts and layout are NOT editable.
//
// Every piece of text is a pair: English + Arabic side by side.
// In headlines, wrap a word in *asterisks* to show it in the gold accent style,
// and press Enter for a new line. Example:  Spaces with *quiet elegance*
// ---------------------------------------------------------------------------

const branch = process.env.GITHUB_BRANCH || process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

/** A text field with an English and an Arabic version. */
const bi = (name: string, label: string, opts: { long?: boolean; description?: string } = {}) => ({
  type: 'object' as const,
  name,
  label,
  description: opts.description,
  fields: [
    { type: 'string' as const, name: 'en', label: 'English', ui: opts.long ? { component: 'textarea' } : undefined },
    { type: 'string' as const, name: 'ar', label: 'Arabic · العربية', ui: opts.long ? { component: 'textarea' } : undefined },
  ],
});

/** A list of bilingual texts (e.g. the scope of a service). */
const biList = (name: string, label: string) => ({
  type: 'object' as const,
  name,
  label,
  list: true,
  ui: { itemProps: (item: any) => ({ label: item?.en || 'New item' }) },
  fields: [
    { type: 'string' as const, name: 'en', label: 'English' },
    { type: 'string' as const, name: 'ar', label: 'Arabic · العربية' },
  ],
});

const image = (name: string, label: string, description?: string) => ({
  type: 'image' as const, name, label, description,
});

/** A page whose content is one file, so it can be edited but not created or deleted. */
const page = (name: string, label: string, fields: any[]) => ({
  name,
  label,
  path: 'content',
  format: 'json' as const,
  match: { include: name },
  ui: { allowedActions: { create: false, delete: false, createNestedFolder: false } },
  fields,
});

const header = (extra: any[] = []) => ({
  type: 'object' as const, name: 'header', label: 'Page header',
  fields: [
    bi('eyebrow', 'Small label above the title'),
    bi('title', 'Title', { description: 'Put *asterisks* around the word to show in gold.' }),
    bi('lead', 'Short introduction', { long: true }),
    ...extra,
  ],
});

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
    // when the site is served from a sub-folder (before the real domain is connected)
    basePath: (process.env.BASE_PATH || '').replace(/^\/|\/$/g, '') || undefined,
  },
  media: { tina: { mediaRoot: 'uploads', publicFolder: 'public' } },

  schema: {
    collections: [
      // -------------------------------------------------------------- pages
      page('home', 'Home page', [
        {
          type: 'object', name: 'hero', label: 'Top of the page',
          fields: [
            bi('eyebrow', 'Small label'),
            bi('headline', 'Headline', { long: true, description: 'One line per row. *Asterisks* = gold accent word.' }),
            bi('lead', 'Introduction', { long: true }),
            image('photo', 'Main photo', 'Landscape or portrait both work. The system makes it web-sized for you.'),
            bi('photoAlt', 'Photo description (for accessibility)'),
          ],
        },
        biList('marquee', 'Scrolling services strip'),
        {
          type: 'object', name: 'studio', label: 'The Studio section',
          fields: [
            image('photo', 'Photo'),
            bi('photoAlt', 'Photo description'),
            bi('caption', 'Text on the photo'),
            bi('eyebrow', 'Small label'),
            bi('title', 'Title', { long: true }),
            { type: 'object', name: 'paragraphs', label: 'Paragraphs', list: true,
              ui: { itemProps: (item: any) => ({ label: (item?.en || 'Paragraph').slice(0, 40) }) },
              fields: [
                { type: 'string', name: 'en', label: 'English', ui: { component: 'textarea' } },
                { type: 'string', name: 'ar', label: 'Arabic · العربية', ui: { component: 'textarea' } },
              ] },
          ],
        },
      ]),

      page('about', 'About page', [
        header([image('photo', 'Header photo')]),
        {
          type: 'object', name: 'story', label: 'My story',
          fields: [
            image('photo', 'Photo'), bi('photoAlt', 'Photo description'), bi('caption', 'Text on the photo'),
            bi('eyebrow', 'Small label'), bi('title', 'Title', { long: true }),
            { type: 'object', name: 'paragraphs', label: 'Paragraphs', list: true,
              ui: { itemProps: (item: any) => ({ label: (item?.en || 'Paragraph').slice(0, 40) }) },
              fields: [
                { type: 'string', name: 'en', label: 'English', ui: { component: 'textarea' } },
                { type: 'string', name: 'ar', label: 'Arabic · العربية', ui: { component: 'textarea' } },
              ] },
          ],
        },
        {
          type: 'object', name: 'principles', label: 'Principles',
          fields: [
            bi('eyebrow', 'Small label'), bi('title', 'Title'),
            { type: 'object', name: 'items', label: 'Principles', list: true,
              ui: { itemProps: (item: any) => ({ label: item?.title?.en || 'New principle' }) },
              fields: [bi('title', 'Title'), bi('text', 'Text', { long: true })] },
          ],
        },
        {
          type: 'object', name: 'process', label: 'How we work',
          fields: [
            bi('eyebrow', 'Small label'), bi('title', 'Title'),
            { type: 'object', name: 'steps', label: 'Steps', list: true,
              ui: { itemProps: (item: any) => ({ label: item?.title?.en || 'New step' }) },
              fields: [bi('title', 'Title'), bi('text', 'Text', { long: true })] },
          ],
        },
      ]),

      page('services', 'Services page', [
        header(),
        {
          type: 'object', name: 'items', label: 'Services', list: true,
          ui: { itemProps: (item: any) => ({ label: item?.title?.en || 'New service' }) },
          fields: [bi('title', 'Service name'), bi('description', 'Description', { long: true }), biList('scope', 'What is included')],
        },
      ]),

      page('portfolio', 'Portfolio page', [header([image('photo', 'Header photo')])]),

      page('contact', 'Contact page', [
        header(),
        { type: 'object', name: 'info', label: 'Contact details heading', fields: [bi('eyebrow', 'Small label'), bi('title', 'Title')] },
        bi('thanks', 'Thank-you message after the form is sent', { long: true }),
      ]),

      page('site', 'Contact details & footer', [
        { type: 'string', name: 'email', label: 'Email address' },
        { type: 'string', name: 'phone', label: 'Phone / WhatsApp' },
        { type: 'string', name: 'instagramLabel', label: 'Instagram name (shown)', description: 'For example @binteriors' },
        { type: 'string', name: 'instagramUrl', label: 'Instagram link', description: 'The full address of the Instagram page.' },
        bi('location', 'Location'),
        bi('footerAbout', 'Short text in the footer', { long: true }),
        bi('siteTitle', 'Website name shown in the browser tab and Google'),
        bi('siteDescription', 'Short description for Google', { long: true }),
        image('ogImage', 'Picture shown when the site is shared (WhatsApp, Instagram, Google)', 'A wide photo, at least 1200 pixels across.'),
        { type: 'string', name: 'formEndpoint', label: 'Contact form address (set up once, then leave alone)',
          description: 'The link given by the form service so enquiries reach your email.' },
      ]),

      page('ui', 'Buttons & small labels', [
        {
          type: 'object', name: 'nav', label: 'Menu',
          fields: ['home', 'about', 'services', 'portfolio', 'contact'].map((k) => bi(k, k)),
        },
        {
          type: 'object', name: 'buttons', label: 'Buttons',
          fields: [bi('startProject', 'Start a project'), bi('viewPortfolio', 'View portfolio'), bi('meetBayan', 'Meet Bayan'),
                   bi('workWithMe', 'Work with me'), bi('send', 'Send enquiry')],
        },
        {
          type: 'object', name: 'common', label: 'Common labels',
          fields: [bi('scroll', 'Scroll'), bi('estBadge', 'Badge on the home photo'), bi('menu', 'Menu button (accessibility)')],
        },
        {
          type: 'object', name: 'projects', label: 'Project pages',
          fields: ['allProjects', 'previous', 'next', 'brief', 'briefTitle', 'beforeAfter', 'transformation', 'beforeAfterIntro',
                   'before', 'after', 'drag', 'type', 'property', 'year', 'location', 'scope', 'gallery', 'galleryTitle', 'morePhotos',
                   'close', 'prevPhoto', 'nextPhoto'].map((k) => bi(k, k)),
        },
        {
          type: 'object', name: 'categories', label: 'Project categories',
          fields: ['all', 'residential', 'commercial', 'styling'].map((k) => bi(k, k)),
        },
        {
          type: 'object', name: 'contact', label: 'Contact form labels',
          fields: ['email', 'phone', 'studio', 'follow', 'name', 'phoneField', 'projectType', 'message', 'typeResidential',
                   'typeCommercial', 'typeStyling', 'typeConsultation', 'error'].map((k) => bi(k, k)),
        },
        {
          type: 'object', name: 'footer', label: 'Footer',
          fields: ['explore', 'services', 'contact', 'rights'].map((k) => bi(k, k)),
        },
      ]),

      // ----------------------------------------------------------- projects
      {
        name: 'projects',
        label: 'Projects',
        path: 'content/projects',
        format: 'json',
        ui: {
          filename: { readonly: false, slugify: (v: any) => (v?.name?.en || 'new-project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') },
        },
        fields: [
          { type: 'number', name: 'order', label: 'Position in the portfolio (1 = first)' },
          bi('name', 'Project name'),
          { type: 'string', name: 'category', label: 'Category', options: [
            { value: 'residential', label: 'Residential' }, { value: 'commercial', label: 'Commercial' }, { value: 'styling', label: 'Styling' },
          ] },
          bi('property', 'Type of property', { description: 'For example Villa, Apartment, Retail' }),
          { type: 'string', name: 'year', label: 'Year' },
          bi('location', 'Location'),
          bi('line', 'One-line summary', { long: true }),
          bi('brief', 'The brief (the story of the project)', { long: true }),
          biList('scope', 'What was done'),
          image('heroImage', 'Header photo (wide)', 'Shown across the top of the project page.'),
          image('cardImage', 'Portfolio card photo', 'Shown in the portfolio grid. Can be the same as the header photo.'),
          {
            type: 'object', name: 'pairs', label: 'Before & after photos', list: true,
            description: 'With a BEFORE and an AFTER photo, the pair becomes a draggable comparison slider. With only an AFTER photo it is shown as a normal photo. The first one is shown large; photos 1 to 5 appear in the main gallery, and from the 6th onwards they appear in a smaller grid that opens larger when clicked.',
            ui: { itemProps: (item: any) => ({ label: item?.caption?.en || 'New pair' }) },
            fields: [
              bi('caption', 'Caption (e.g. Living room)'),
              image('before', 'BEFORE photo (optional)', 'Leave empty to show just the AFTER photo, with no slider.'),
              image('after', 'AFTER photo (or the photo itself)'),
            ],
          },
        ],
      },
    ],
  },
});
