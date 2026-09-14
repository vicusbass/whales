import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// One build stamp for every <url> in the sitemap. The site is a static
// snapshot of one dataset, so "when did this deploy happen" is the honest
// answer to "when did this page last change".
const lastmod = new Date();

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://whales.rocks',
  // Canonical tags, internal links and sitemap entries all have to agree on
  // one spelling of a URL, and Vercel is configured to 308 the slashed form
  // here (see vercel.json). 'never' is the spelling the internal links already
  // used, so this makes the canonical follow the links rather than the reverse.
  trailingSlash: 'never',
  integrations: [
    icon(),
    sitemap({
      // The 404 page is a real route in the build but is served with a 404
      // status, so it has no business being advertised for crawling.
      filter: (page) => !/\/404\/?$/.test(page),
      serialize(item) {
        return { ...item, lastmod };
      },
    }),
  ],
});
