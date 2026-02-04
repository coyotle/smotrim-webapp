<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

//const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Главная',
    to: '/',
  },
  {
    label: 'О проекте',
    to: '/about',
  },
])
</script>

<template>
  <UHeader title="📻 (не)Смотрим.ру">

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />
      <UTooltip text="На кофе 🥰">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://pay.cloudtips.ru/p/a368e9f8"
          target="_blank"
          icon="i-simple-icons-kofi"
          aria-label="Донат"
        />
      </UTooltip>
      <UTooltip text="Проект на GitHub">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/coyotle/smotrim-webapp"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>

  </UHeader>
</template>
