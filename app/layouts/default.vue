<template>
  <div class="main-layout">
    <!-- Шапка -->
    <header class="main-layout__header">
      <BaseContainer class="main-layout__header-inner">
        <slot name="header">
          <nav class="main-layout__navigation">
            <NuxtLink class="main-layout__navigation-link" to="/">
              Главная
            </NuxtLink>
            <NuxtLink class="main-layout__navigation-link" to="/components">
              Компоненты
            </NuxtLink>
          </nav>
          <ThemeToggle />
        </slot>
      </BaseContainer>
    </header>

    <!-- Основной контент -->
    <main class="main-layout__main">
      <BaseContainer>
        <slot />
      </BaseContainer>
    </main>

    <!-- Подвал -->
    <footer class="main-layout__footer">
      <BaseContainer>
        <slot name="footer">
          <p>© 2026 UI Kit</p>
        </slot>
      </BaseContainer>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-base-background);
  color: var(--color-text-primary);

  &__header {
    background: var(--color-base-background-complementary);
    border-bottom: 1px solid var(--color-base-border);
    box-shadow: var(--shadow-s);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  &__header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: var(--spacing-16);
  }

  &__main {
    flex: 1;
    padding: var(--spacing-6) 0;
  }

  &__navigation {
    display: flex;
    gap: var(--spacing-2);
    align-items: center;
  }

  &__navigation-link {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--border-radius-s);
    color: var(--color-text-complementary);
    text-decoration: none;
    font-weight: var(--font-weight-medium, 500);
    transition:
      color var(--transition-duration-s, 0.15s),
      background var(--transition-duration-s, 0.15s);

    &:hover {
      color: var(--color-text-primary);
      background: var(--color-base-background-hover);
    }

    &.router-link-active {
      color: var(--color-text-brand);
      background: var(--color-base-info-light);
    }

    @media (max-width: 480px) {
      padding: var(--spacing-2) var(--spacing-4);
    }
  }

  &__footer {
    background: var(--color-base-background-complementary);
    border-top: 1px solid var(--color-base-border);
    text-align: center;
    padding: var(--spacing-4) 0;
    color: var(--color-text-secondary);
    font-size: var(--text-body-2-size, 13px);
  }
}

@media (max-width: 672px) {
  .main-layout {
    &__header-inner {
      min-height: var(--spacing-14);
    }

    &__main {
      padding: var(--spacing-4) 0;
    }
  }
}
</style>
