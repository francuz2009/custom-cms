import { defineNuxtPlugin } from '#app'
import ModalManager from '~/components/modals/ModalManager.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('ModalManager', ModalManager)
})
