<template>
  <label :class="wrapperClasses">
    <input
      ref="input"
      class="base-toggle__input"
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="modelValue ? 'true' : 'false'"
      :aria-disabled="disabled ? 'true' : 'false'"
      @change="onChange"
    />

    <span class="base-toggle__track" aria-hidden="true">
      <span class="base-toggle__thumb" />
    </span>

    <span v-if="$slots.default || label" class="base-toggle__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  disabled: false,
  size: 'md',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const wrapperClasses = computed(() => [
  'base-toggle',
  `base-toggle--size-${props.size}`,
  { 'base-toggle--disabled': props.disabled },
])

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const next = target.checked
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style lang="scss" scoped>
.base-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
  user-select: none;

  &--disabled {
    cursor: default;
    opacity: 0.6;
    pointer-events: none;
  }

  // Размеры
  &--size-sm {
    .base-toggle__track {
      width: 28px;
      height: 16px;
      padding: 1px;
    }
    .base-toggle__thumb {
      width: 14px;
      height: 14px;
    }
    .base-toggle__input:checked + .base-toggle__track .base-toggle__thumb {
      transform: translateX(12px);
    }
  }

  &--size-md {
    .base-toggle__track {
      width: 40px;
      height: 24px;
      padding: 2px;
    }
    .base-toggle__thumb {
      width: 20px;
      height: 20px;
    }
    .base-toggle__input:checked + .base-toggle__track .base-toggle__thumb {
      transform: translateX(14px);
    }
  }

  &--size-lg {
    .base-toggle__track {
      width: 52px;
      height: 30px;
      padding: 3px;
    }
    .base-toggle__thumb {
      width: 24px;
      height: 24px;
    }
    .base-toggle__input:checked + .base-toggle__track .base-toggle__thumb {
      transform: translateX(22px);
    }
  }

  &__input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
  }

  &__track {
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: 999px;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    background-color: var(--color-bg-generic-medium);
    transition: background-color var(--transition-duration-s) ease;

    .base-toggle__input:checked + & {
      background-color: var(--color-bg-brand);
    }

    .base-toggle__input:disabled + & {
      opacity: 0.6;
      cursor: default;
    }

    .base-toggle__input:focus-visible + & {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }
  }

  &__thumb {
    display: block;
    border-radius: 50%;
    background-color: var(--color-bg-base);
    box-shadow: var(--shadow-s);
    transition:
      transform var(--transition-duration-s) ease,
      background-color var(--transition-duration-s) ease;
  }

  &__label {
    line-height: 1.2;
    display: flex;
    flex-wrap: nowrap;
    gap: var(--spacing-1);
    align-items: center;
    color: var(--color-text-primary);
    font-size: var(--text-body-1-size);
  }
}
</style>
