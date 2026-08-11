<template>
  <Teleport to="body">
    <div v-if="modals.length" class="modal-container">
      <ModalWrapper
        v-for="modal in modals"
        :key="modal.id"
        :is-open="modal.isOpen"
        :title="modal.title"
        :max-width="modal.maxWidth"
        @close="closeModal(modal.id)"
      >
        <component
          :is="modal.component"
          v-bind="modal.props"
          @close="closeModal(modal.id)"
        />
      </ModalWrapper>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ModalState {
  id: string
  component: any
  props?: Record<string, any>
  title?: string
  maxWidth?: string
  isOpen: boolean
}

const modals = ref<ModalState[]>([])

// Глобальный идентификатор для модалок
let modalIdCounter = 0

// Функции для управления
function openModal(
  component: any,
  props?: Record<string, any>,
  options?: { title?: string; maxWidth?: string }
): string {
  const id = `modal-${++modalIdCounter}`
  modals.value.push({
    id,
    component,
    props: props || {},
    title: options?.title || '',
    maxWidth: options?.maxWidth || '600px',
    isOpen: true,
  })
  return id
}

function closeModal(id: string) {
  const index = modals.value.findIndex((m) => m.id === id)
  if (index !== -1) {
    modals.value[index].isOpen = false
    setTimeout(() => {
      modals.value.splice(index, 1)
    }, 300) // подождать окончания анимации
  }
}

function closeAllModals() {
  modals.value.forEach((m) => (m.isOpen = false))
  setTimeout(() => {
    modals.value = []
  }, 300)
}

// Предоставляем API глобально
provide('modal', {
  open: openModal,
  close: closeModal,
  closeAll: closeAllModals,
})

// Для использования в компонентах через composable
onMounted(() => {
  // ничего не требуется
})

// Экспортируем для useModal
defineExpose({
  open: openModal,
  close: closeModal,
  closeAll: closeAllModals,
})
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}
</style>
