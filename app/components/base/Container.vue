<template>
  <div class="base-container" :class="[`base-container--${size}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** Размер контейнера (ограничивает максимальную ширину) */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'max'
}>()
</script>

<style scoped lang="scss">
.base-container {
  width: 100%;
  padding: var(--container-padding, 16px);
  margin: var(--container-margin, 0 auto);
  max-width: var(--breakpoint-max, 1584px);
  box-sizing: border-box;

  &--sm {
    max-width: var(--breakpoint-sm, 0px);
  }
  &--md {
    max-width: var(--breakpoint-md, 672px);
  }
  &--lg {
    max-width: var(--breakpoint-lg, 1056px);
  }
  &--xl {
    max-width: var(--breakpoint-xl, 1312px);
  }
  &--max {
    max-width: var(--breakpoint-max, 1584px);
  }
}
</style>
