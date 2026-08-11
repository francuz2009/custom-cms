export type Theme = 'light' | 'dark' | 'system'

const THEME_KEY = 'app-theme'

export const useTheme = () => {
  const theme = ref<Theme>('light')
  const isDark = ref(false)

  const applyTheme = (themeValue: Theme) => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const isDarkTheme =
      themeValue === 'dark' || (themeValue === 'system' && prefersDark)

    const html = document.documentElement
    if (isDarkTheme) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    isDark.value = isDarkTheme
  }

  const loadTheme = () => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    const initialTheme = stored || 'system'
    theme.value = initialTheme
    applyTheme(initialTheme)
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem(THEME_KEY, newTheme)
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    if (theme.value === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  let mediaListener: ((e: MediaQueryListEvent) => void) | null = null

  const startSystemThemeListener = () => {
    if (mediaListener) return
    mediaListener = (e: MediaQueryListEvent) => {
      if (theme.value === 'system') {
        applyTheme('system')
      }
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', mediaListener)
  }

  const stopSystemThemeListener = () => {
    if (mediaListener) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', mediaListener)
      mediaListener = null
    }
  }

  onMounted(() => {
    loadTheme()
    startSystemThemeListener()
  })

  onUnmounted(() => {
    stopSystemThemeListener()
  })

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    loadTheme,
  }
}
