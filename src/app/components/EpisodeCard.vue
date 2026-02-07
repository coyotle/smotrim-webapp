<template>
  <UCard variant="subtle">
    
      <p class="text-sm line-clamp-3">{{ episode.published }}</p>
      <h3 class="text-xl font-semibold mb-2 line-clamp-2">{{ episode.anons }}</h3>
      <p class="text-sm line-clamp-3">{{ episode.description }}</p>
      
      <!-- Кнопки управления -->
      <div class="mt-4 flex items-center gap-2">
        <!-- Кнопка воспроизведения -->
        <button
          :class="[
                'px-4 py-2 rounded-lg transition flex items-center gap-2',
                isPlaying
                  ? 'bg-gray-500 hover:bg-gray-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              ]"
@click="$emit('play', episode)"
        >
          <PlayIcon v-if="!isPlaying" />
          <PauseIcon v-else />
        </button>

        <!-- Кнопка скачивания -->
        <DownloadButton v-if="episode.media" :url="episode.media" />
      </div>
  </UCard>
</template>

<script setup>
defineProps({
  episode: {
    type: Object,
    required: true
  },
  isPlaying: {
    type: Boolean,
    default: false
  }
})

defineEmits(['play'])
</script>