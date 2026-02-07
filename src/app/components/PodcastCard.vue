<template>
  <NuxtLink 
    :to="`${podcast.link}`"
  >
  <UCard 
      class="h-full flex flex-col transition-all duration-100 dark:hover:ring-1 dark:hover:ring-primary-900 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    >
    <!-- Изображение -->
    <div class="aspect-square overflow-hidden">
      <img 
        :src="podcast.image" 
        :alt="podcast.title"
        class="w-full h-full object-cover"
      >
    </div>
    
    <!-- Контент карточки -->
    <div class="pt-4">
      <p class="text-xs line-clamp-3 mb-1">
        {{ podcast.station_name }}
      </p>
      <h3 class="text-xl font-semibold mb-1 line-clamp-2">
        {{ podcast.title }}
      </h3>
      <p class="text-sm line-clamp-4">
        {{ podcast.description }}
      </p>
    </div>
  </UCard>
  </NuxtLink>
</template>

<script setup>
defineProps({
  podcast: {
    type: Object,
    required: true
  }
})
</script>