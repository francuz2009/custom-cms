export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  envDir: './config',

  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    databaseUrl: process.env.NUXT_DATABASE_URL,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://default.api.com',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'UI Kit',
    },
  },

  css: ['@/assets/styles/global.scss'],
})
