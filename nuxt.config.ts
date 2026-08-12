import tailwindcss from "@tailwindcss/vite";

const SITE_URL = 'https://wannabelynx.github.io';
const DESCRIPTION =
  'Nino Bär (wannabelynx) — Frontend Developer at cobra GmbH building modern web apps with Nuxt, Vue, TypeScript & Tailwind CSS. Astronomy enthusiast. See my projects, tech stack & contact.';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nino Bär',
  alternateName: ['Nino Baer', 'wannabelynx'],
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/apple-touch-icon.png`,
  jobTitle: 'Frontend Developer',
  worksFor: { '@type': 'Organization', name: 'cobra GmbH' },
  knowsAbout: ['Nuxt', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Frontend Development', 'Astronomy'],
  sameAs: [
    'https://github.com/WannabeLynx',
    'https://www.linkedin.com/in/nino-baer/',
    'https://www.instagram.com/wannabelynx',
  ],
};

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['../assets/css/main.css', '../assets/css/space.css', 'rory-components/style.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Nino Bär — Frontend Developer',
      meta: [
        { name: 'description', content: DESCRIPTION },
        { name: 'author', content: 'Nino Bär' },
        { name: 'theme-color', content: '#070B14' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Nino Bär' },
        { property: 'og:title', content: 'Nino Bär — Frontend Developer' },
        { property: 'og:description', content: DESCRIPTION },
        { property: 'og:url', content: `${SITE_URL}/` },
        { property: 'og:image', content: `${SITE_URL}/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Nino Bär — Frontend Developer' },
        { property: 'og:locale', content: 'en_GB' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Nino Bär — Frontend Developer' },
        { name: 'twitter:description', content: DESCRIPTION },
        { name: 'twitter:image', content: `${SITE_URL}/og-image.png` },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        { type: 'application/ld+json', innerHTML: JSON.stringify(personJsonLd) },
      ],
    },
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-svgo',
  ],
  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', iso: 'en-gb', name: '🇬🇧 English', file: 'en.json' },
			{ code: 'de', iso: 'de', name: '🇩🇪 Deutsch', file: 'de.json' },
		],
    defaultLocale: 'en',
    langDir: 'locales/',
    detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'lang',
			redirectOn: 'root',
		},
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  nitro: {
    devProxy: {
      host: 'localhost',
    },
  },
  svgo: {
    autoImportPath: '../assets/icons/',
  },
});