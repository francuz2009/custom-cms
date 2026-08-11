<template>
  <button class="theme-toggle" @click="toggle" :title="buttonTitle">
    <span class="icon">{{ buttonIcon }}</span>
    <span v-if="showLabel" class="label">{{ buttonTitle }}</span>
  </button>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useTheme()

const toggle = () => {
  toggleTheme()
}

const buttonTitle = computed(() => {
  if (theme.value === 'light') return 'Тёмная тема'
  if (theme.value === 'dark') return 'Светлая тема'
  return 'Системная тема'
})

const buttonIcon = computed(() => {
  if (theme.value === 'light') return '🌙'
  if (theme.value === 'dark') return '☀️'
  return '💻'
})

defineProps<{
  showLabel?: boolean
}>()
</script>

<style scoped lang="scss">
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: var(--radius-sm, 4px);
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--bg-primary);
    border-color: var(--border-focus);
  }

  .icon {
    font-size: 1.2em;
  }

  .label {
    font-size: 0.9em;
  }
}
</style>
