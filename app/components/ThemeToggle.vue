<template>
  <div class="theme-toggle">
    <BaseToggle @change="toggleTheme" />

    <transition name="icon-fade" mode="out-in">
      <span
        :key="buttonIcon"
        class="theme-toggle__icon"
        :class="{ 'theme-toggle__icon-active': isDarkTheme }"
      >
        {{ buttonIcon }}
      </span>
    </transition>
  </div>
</template>

<script setup lang="ts">
import BaseToggle from '@/components/base/BaseToggle.vue'

const { theme, toggleTheme } = useTheme()

const isDarkTheme = computed(() => theme.value === 'dark')

const buttonIcon = computed(() => {
  if (isDarkTheme.value) return '☀️'
  return '🌙'
})

defineProps<{
  showLabel?: boolean
}>()
</script>

<style scoped lang="scss">
.theme-toggle {
  position: relative;

  &:hover {
    background: var(--bg-primary);
    border-color: var(--border-focus);
  }

  :deep(.base-toggle__track) {
    width: 52px;
    height: 30px;
  }

  :deep(.base-toggle__input) {
    &:checked + .base-toggle__track .base-toggle__thumb {
      transform: translateX(24px);
    }
  }

  :deep(.base-toggle__thumb) {
    width: 22px;
    height: 22px;
  }

  &__icon {
    position: absolute;
    margin: auto 0;
    right: 8px;
    top: 0;
    bottom: 0;
    height: 28px;
    width: 18px;
    font-size: 18px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: right var(--transition-duration-m) ease;

    &-active {
      right: 28px;
    }
  }
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.3s ease;
}

.icon-fade-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(-30deg);
}

.icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(30deg);
}
</style>
