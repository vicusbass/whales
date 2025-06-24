import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://whales.rocks',
  integrations: [icon(), sitemap()]
});