<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal" :style="{ maxWidth }">
        <header class="modal-header">
          <slot name="header">
            <h2 v-if="title">{{ title }}</h2>
          </slot>
          <button class="modal-close" @click="close">×</button>
        </header>
        <div class="modal-body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title?: string
  maxWidth?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  padding: 20px;
}

.modal {
  background: white;
  border-radius: var(--radius-lg, 8px);
  padding: var(--spacing-5, 20px);
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  pointer-events: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  transform-origin: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-5, 16px);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 8px;
  color: #666;
}

.modal-close:hover {
  color: #000;
}

.modal-body {
  margin-bottom: var(--spacing-5, 16px);
}

.modal-footer {
  margin-top: var(--spacing-5, 16px);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2, 8px);
}

.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(30px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(30px);
}

@media (max-width: 600px) {
  .modal-overlay {
    padding: 10px;
  }
  .modal {
    padding: var(--spacing-2, 12px);
    max-height: 95vh;
    border-radius: var(--radius-sm, 4px);
  }
  .modal-header h2 {
    font-size: 1.2rem;
  }
}
</style>
