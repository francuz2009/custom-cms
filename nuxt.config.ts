export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app/',

  devtools: { enabled: true },

  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    databaseUrl: process.env.NUXT_DATABASE_URL,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://default.api.com',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'UI Kit',
    },
  },

  css: ['@/assets/styles/global.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'yandex-verification',
          content: '',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/Onest.woff2',
          crossorigin: 'anonymous' as const,
        },
      ],
    },
    pageTransition: false,
  },

  modules: ['@nuxt/eslint'],

  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
    resolve: {
      extensions: ['.ts', '.vue', '.mjs', '.js', '.jsx', '.tsx', '.json'],
    },
  },
})
