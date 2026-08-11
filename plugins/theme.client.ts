export default defineNuxtPlugin({
  name: 'theme',
  hooks: {
    'app:beforeMount'() {
      const THEME_KEY = 'app-theme'
      const stored = localStorage.getItem(THEME_KEY) as
        | 'light'
        | 'dark'
        | 'system'
        | null
      let theme = stored || 'system'

      if (theme === 'system') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
        theme = prefersDark ? 'dark' : 'light'
      }

      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    },
  },
})
