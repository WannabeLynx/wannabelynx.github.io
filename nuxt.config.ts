import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['../assets/css/main.css'],
  modules: ['@nuxtjs/i18n'],
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
});