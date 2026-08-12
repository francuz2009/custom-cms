export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
export type InputMode =
  | 'text'
  | 'numeric'
  | 'tel'
  | 'email'
  | 'url'
  | 'search'
  | 'decimal'
  | 'none'
export interface BaseInputProps {
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

export type BaseInputEmits = {
  (e: 'update:modelValue' | 'input' | 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur' | 'click' | 'clear'): void
}
