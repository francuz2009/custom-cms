<template>
  <div class="base-input" :class="[classes, overlayClasses]">
    <div class="base-input__inner">
      <!-- Prefix slot -->
      <div v-if="hasPrefix" class="base-input__prefix">
        <slot name="prefix" />
      </div>

      <input
        :id="inputId"
        ref="inputRef"
        :value="displayValue"
        :type="inputType"
        :inputmode="inputMode as InputMode"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        :minlength="minLength"
        :autocomplete="autocomplete"
        :name="name"
        :aria-invalid="!!errorMessage"
        :aria-describedby="describedById"
        :aria-required="required || undefined"
        class="base-input__unit"
        @input="onInput"
        @focus="onFocus"
        @click="onClick"
        @blur="onBlur"
      />

      <label
        v-if="label && !hideLabel"
        :for="inputId"
        class="base-input__label"
        :class="{
          'base-input__label_floating': isFocused || hasValue,
          'base-input__label_required': required,
        }"
      >
        {{ label }}
      </label>

      <div
        v-if="hasValueOverlay"
        class="base-input__value-overlay"
        aria-hidden="true"
      >
        <slot name="value-overlay" />
      </div>

      <!-- Clear button -->
      <button
        v-if="showClear"
        type="button"
        class="base-input__clear"
        aria-label="Clear input"
        :aria-controls="inputId"
        @click.stop="clear"
        @keydown.enter="clear"
        @keydown.space.prevent="clear"
      >
        <span class="base-input__clear-icon">✕</span>
      </button>

      <!-- Loading spinner -->
      <div v-if="loading" class="base-input__loading">
        <div class="base-input__loading-spinner" />
      </div>

      <!-- Suffix slot -->
      <div v-if="hasSuffix" class="base-input__suffix">
        <slot name="suffix" />
      </div>
    </div>

    <!-- Character counter -->
    <div
      v-if="showCounter"
      class="base-input__counter"
      :class="{ 'base-input__counter_error': counterError }"
    >
      {{ counterValue }}/{{ maxLength || minLength }}
    </div>

    <transition name="slide-fade">
      <div
        v-if="errorMessage"
        :id="errorId"
        class="base-input__error"
        role="alert"
        aria-live="assertive"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, useId } from 'vue'
import { useBaseInput } from '@/composables/ui/useBaseInput'

type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
type InputMode =
  | 'text'
  | 'numeric'
  | 'tel'
  | 'email'
  | 'url'
  | 'search'
  | 'decimal'
  | 'none'

interface BaseInputProps {
  modelValue?: string | number
  id?: string
  label?: string
  placeholder?: string
  type?: InputType
  inputMode?: InputMode
  name?: string
  autocomplete?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  hideLabel?: boolean
  clearable?: boolean
  loading?: boolean
  counter?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  error?: string
  autofocus?: boolean
  hasValueOverlay?: boolean
  customClasses?: Record<string, boolean>
  phoneMask?: boolean
}

type BaseInputEmits = {
  (e: 'update:modelValue' | 'input' | 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur' | 'click' | 'clear'): void
}

// Теперь используем интерфейсы без импорта
const props = withDefaults(defineProps<BaseInputProps>(), {
  modelValue: '',
  type: 'text',
  clearable: false,
  loading: false,
  counter: false,
  hideLabel: false,
  required: false,
  disabled: false,
  readonly: false,
  autocomplete: 'off',
  hasValueOverlay: false,
  phoneMask: false,
})

const emit = defineEmits<BaseInputEmits>()
const slots = useSlots()

const inputId = props.id || useId()

const hasPrefix = !!slots.prefix
const hasSuffix = !!slots.suffix

const {
  inputRef,
  isFocused,
  hasValue,
  errorMessage,
  displayValue,
  inputType,
  inputMode,
  classes,
  showClear,
  showCounter,
  counterValue,
  counterError,
  onInput,
  onFocus,
  onBlur,
  onClick,
  clear,
  focus,
  blur,
  validate,
} = useBaseInput(props, emit)

const errorId = `${inputId}-error`

const describedById = computed(() => (errorMessage.value ? errorId : undefined))

const overlayClasses = computed(() => ({
  'base-input--with-value-overlay': props.hasValueOverlay,
}))

defineExpose({
  focus,
  blur,
  validate,
  inputRef,
})
</script>

<style lang="scss" scoped>
.base-input {
  position: relative;
  width: 100%;
  border-radius: var(--radius-m);
  height: 56px;

  &__inner {
    position: relative;
    width: 100%;
    border-radius: var(--radius-m);
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    border: 2px solid var(--color-border-focus);
    border-radius: inherit;
    pointer-events: none;
    transition: opacity var(--transition-duration-m) ease;
  }

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &--focused {
    &:after {
      opacity: 1;
    }
    .base-input__label_floating {
      color: var(--color-text-primary);
    }
  }

  &--has-value {
    .base-input__label {
      color: var(--color-text-secondary);
    }
  }

  &--with-label {
    &.base-input--focused .base-input__unit,
    &.base-input--has-value .base-input__unit {
      padding: 24px 26px 8px 16px;
    }
  }

  &--with-prefix {
    .base-input__unit {
      padding-left: 48px;
    }
    .base-input__label {
      left: 48px;
    }
  }

  &--with-suffix {
    .base-input__unit {
      padding-right: 48px;
    }
  }

  &--with-value-overlay {
    .base-input__unit,
    .base-input__unit:disabled {
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
    &:not(.base-input--focused) {
      .base-input__unit {
        caret-color: transparent;
      }
    }
  }

  &__value-overlay {
    position: absolute;
    inset: 0;
    padding: 16px;
    display: flex;
    align-items: baseline;
    gap: 6px;
    pointer-events: none;
    font-size: var(--text-body-1-size);
    line-height: var(--text-body-1-line-height);
    white-space: nowrap;
    overflow: hidden;
    border-radius: inherit;
    z-index: 1;
  }

  &--with-label.base-input--with-value-overlay {
    .base-input__value-overlay {
      padding: 24px 48px 8px 16px;
    }
  }

  &--error {
    .base-input__unit {
      border-color: var(--color-border-danger);
      background-color: var(--color-bg-danger-light);
    }
    .base-input__label {
      color: var(--color-text-danger);
    }
  }

  &__unit {
    width: 100%;
    height: 100%;
    padding: 16px;
    border: 1px solid var(--color-border-generic);
    font-size: var(--text-body-1-size);
    line-height: var(--text-body-1-line-height);
    height: 56px;
    border-radius: var(--radius-m);
    transition:
      background-color var(--transition-duration-m) ease,
      border-color var(--transition-duration-m) ease;
    outline: none;
    color: var(--color-text-primary);
    background-color: var(--color-bg-generic-ultralight);

    &:focus {
      background-color: var(--color-bg-generic);
    }

    &:hover:not(:focus):not(:disabled) {
      background-color: var(--color-bg-generic);
      border-color: var(--color-border-focus);
    }

    &:disabled {
      background-color: var(--color-bg-disabled);
      border-color: var(--color-text-disabled);
      cursor: not-allowed;
      color: var(--color-text-disabled);
    }

    &::placeholder {
      color: var(--color-text-hint);
      opacity: 0;
      transition: opacity var(--transition-duration-m) ease;
    }

    &:focus::placeholder {
      opacity: 1;
    }

    &[type='number'] {
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &::-webkit-calendar-picker-indicator {
      display: none;
      -webkit-appearance: none;
    }
  }

  &__label {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-complementary);
    pointer-events: none;
    transition: all var(--transition-duration-m) ease;

    &_floating {
      top: 8px;
      font-size: var(--text-body-3-size);
      line-height: var(--text-body-3-line-height);
      transform: unset;
      color: var(--color-text-primary);
    }

    &_required::after {
      content: '*';
      margin-left: 2px;
      color: var(--color-text-danger);
    }
  }

  &__prefix,
  &__suffix {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    pointer-events: none;
    z-index: 1;
  }

  &__prefix {
    left: 12px;
  }

  &__suffix {
    right: 12px;
  }

  &__clear {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--transition-duration-s) ease;
    z-index: 2;
    border-radius: var(--radius-xs);

    &:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }
  }

  &__clear-icon {
    width: 20px;
    height: 20px;
    color: var(--color-text-hint);
    font-size: 18px;
    line-height: 1;
  }

  &__loading {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
  }

  &__loading-spinner {
    width: 100%;
    height: 100%;
    border: 2px solid var(--color-border-focus);
    border-radius: 50%;
    animation: spin var(--transition-duration-l) linear infinite;
    border-top-color: transparent;
  }

  &__counter {
    position: absolute;
    right: 0;
    top: calc(100% + 4px);
    font-size: var(--text-body-3-size);
    color: var(--color-text-secondary);

    &_error {
      color: var(--color-text-danger);
    }
  }

  &__error {
    position: absolute;
    bottom: -18px;
    font-size: var(--text-body-3-size);
    line-height: 1.4;
    color: var(--color-text-danger);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.slide-fade-enter-active {
  transition: all var(--transition-duration-m) ease;
}
.slide-fade-leave-active {
  transition: all var(--transition-duration-s) ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-4px);
  opacity: 0;
}
</style>
