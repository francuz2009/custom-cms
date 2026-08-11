import { inject } from 'vue'

export function useModal() {
  const modalApi = inject<{
    open: (
      component: any,
      props?: any,
      options?: { title?: string; maxWidth?: string }
    ) => string
    close: (id: string) => void
    closeAll: () => void
  }>('modal')

  if (!modalApi) {
    throw new Error(
      'useModal must be used within a Nuxt app with ModalManager plugin installed'
    )
  }

  return modalApi
}
