<template>
  <Transition name="fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <Transition name="slide">
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
      </Transition>
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
  padding: var(--space-md, 20px);
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  pointer-events: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md, 16px);
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
  margin-bottom: var(--space-md, 16px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

@media (max-width: 600px) {
  .modal-overlay {
    padding: 10px;
  }
  .modal {
    padding: var(--space-sm, 12px);
    max-height: 95vh;
    border-radius: var(--radius-sm, 4px);
  }
  .modal-header h2 {
    font-size: 1.2rem;
  }
}
</style>
