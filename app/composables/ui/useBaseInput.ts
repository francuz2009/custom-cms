import { ref, computed } from 'vue'

import type {
  BaseInputProps,
  BaseInputEmits,
} from '~/components/base/base-input/base-input.types'

export function useBaseInput(props: BaseInputProps, emit: BaseInputEmits) {
  const inputRef = ref<HTMLInputElement | null>(null)
  const isFocused = ref(false)
  const hasValue = ref(false)
  const errorMessage = ref('')
  const displayValue = ref('')
  const inputType = computed(() => 'text')
  const inputMode = computed(() => 'text')
  const classes = computed(() => ({}))
  const showClear = ref(false)
  const showCounter = ref(false)
  const counterValue = ref(0)
  const counterError = ref(false)

  const onInput = () => {}
  const onFocus = () => {}
  const onBlur = () => {}
  const onClick = () => {}
  const clear = () => {}
  const focus = () => {}
  const blur = () => {}
  const validate = () => true

  return {
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
  }
}
