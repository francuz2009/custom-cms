<template>
  <component
    :is="componentTag"
    v-bind="componentAttrs"
    :type="type"
    :class="buttonClasses"
    :disabled="isLoading || disabled"
  >
    <span v-if="$slots.default || label" class="base-button__text">
      <slot>{{ label }}</slot>
    </span>

    <span v-if="$slots.icon" class="base-button__icon">
      <slot name="icon" />
    </span>

    <span v-if="isLoading" class="base-button__loader" />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'

type Size = 'md' | 'm' | 's'

interface Props {
  to?: string
  type?: 'button' | 'submit' | 'reset'
  tag?: string
  variant?: Variant | string
  size?: Size | string
  isLoading?: boolean
  external?: boolean
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: '',
  type: 'button',
  tag: '',
  variant: 'primary',
  size: 'md',
  isLoading: false,
  external: false,
  label: '',
  disabled: false,
})

const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--loading': props.isLoading,
    'base-button--disabled': props.disabled,
  },
])

const isExternalLink = computed(() => {
  if (!props.to) return false
  if (props.external) return true
  return (
    typeof props.to === 'string' &&
    (props.to.startsWith('http://') || props.to.startsWith('https://'))
  )
})

// Определяем тег компонента
const componentTag = computed(() => {
  if (props.tag) return props.tag
  if (props.to) {
    return isExternalLink.value ? 'a' : NuxtLink
  }
  return 'button'
})

// Атрибуты для компонента
const componentAttrs = computed(() => {
  // Заменяем any на unknown для устранения предупреждения линтера
  const attrs: Record<string, unknown> = {
    ...props,
  }

  // Удаляем лишние пропсы, чтобы они не попали в DOM
  delete attrs.variant
  delete attrs.size
  delete attrs.isLoading
  delete attrs.external
  delete attrs.label
  delete attrs.disabled

  if (props.to) {
    if (isExternalLink.value) {
      attrs.href = props.to
      attrs.target = '_blank'
      attrs.rel = 'noopener noreferrer'
      delete attrs.to
    } else {
      attrs.to = props.to
    }
  }

  return attrs
})
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  font-family: var(--font-family);
  font-weight: var(--font-weight-semibold);
  border: 1px solid transparent;
  border-radius: var(--border-radius-m);
  cursor: pointer;
  transition:
    background-color var(--transition-duration-s) ease,
    border-color var(--transition-duration-s) ease,
    transform var(--transition-duration-xs) ease;
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  position: relative;

  &:active:not(.base-button--disabled) {
    transform: scale(0.97);
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  // Primary — брендовый фон
  &--primary {
    background-color: var(--color-bg-brand);
    color: var(--color-text-brand-contrast);
    border-color: var(--color-bg-brand);

    &:hover:not(.base-button--disabled) {
      background-color: var(--color-bg-brand-hover);
      border-color: var(--color-bg-brand-hover);
    }
  }

  // Secondary — светлый фон с границей
  &--secondary {
    background-color: var(--color-bg-base);
    color: var(--color-text-brand);
    border-color: var(--color-border-generic);

    &:hover:not(.base-button--disabled) {
      background-color: var(--color-bg-generic-hover);
      border-color: var(--color-border-generic-hover);
    }
  }

  // Tertiary — прозрачный, без границы
  &--tertiary {
    background-color: transparent;
    color: var(--color-text-brand);
    border-color: transparent;

    &:hover:not(.base-button--disabled) {
      background-color: var(--color-bg-generic-hover);
    }
  }

  // Success
  &--success {
    background-color: var(--color-bg-positive-heavy);
    color: var(--color-text-light-primary);
    border-color: var(--color-bg-positive-heavy);

    &:hover:not(.base-button--disabled) {
      background-color: var(--color-bg-positive-heavy-hover);
      border-color: var(--color-bg-positive-heavy-hover);
    }
  }

  // Warning
  &--warning {
    background-color: var(--color-bg-warning-heavy);
    color: var(--color-text-light-primary);
    border-color: var(--color-bg-warning-heavy);

    &:hover:not(.base-button--disabled) {
      background-color: var(--color-bg-warning-heavy-hover);
      border-color: var(--color-bg-warning-heavy-hover);
    }
  }

  // Danger
  &--danger {
    background-color: var(--color-bg-danger-heavy);
    color: var(--color-text-light-primary);
    border-color: var(--color-bg-danger-heavy);

    &:hover:not(.base-button--disabled) {
      background-color: var(--color-bg-danger-heavy-hover);
      border-color: var(--color-bg-danger-heavy-hover);
    }
  }

  /* ===== SIZES ===== */

  &--md {
    min-height: 56px;
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--text-subheader-1-size);
    line-height: var(--text-subheader-1-line-height);
    border-radius: var(--border-radius-m);

    .base-button__icon {
      width: 24px;
      height: 24px;
    }
  }

  &--m {
    min-height: 44px;
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--text-body-1-size);
    line-height: var(--text-body-1-line-height);
    border-radius: var(--border-radius-s);

    .base-button__icon {
      width: 24px;
      height: 24px;
    }
  }

  &--s {
    min-height: 32px;
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--text-body-3-size);
    border-radius: var(--border-radius-s);

    .base-button__icon {
      width: 20px;
      height: 20px;
    }
  }

  /* ===== ICON & TEXT ===== */

  &__text {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    line-height: 1;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ===== LOADING ===== */

  &--loading {
    pointer-events: none;

    .base-button__text,
    .base-button__icon {
      opacity: 0.5;
    }
  }

  &__loader {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin var(--transition-duration-xl) linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
