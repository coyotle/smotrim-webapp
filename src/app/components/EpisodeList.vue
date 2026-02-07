<template>
  <div>
    <div v-if="loading" class="loading text-center py-12">
      Загрузка...
    </div>

    <div v-else-if="error" class="error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      Ошибка: {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 gap-6">
      <EpisodeCard
        v-for="episode in episodes"
        :key="episode.id"
        :episode="episode"
        :is-playing="isCurrentlyPlaying(episode)"
        @play="handlePlay"
      />
    </div>

    <!-- Пустое состояние -->
    <div 
      v-if="!loading && !error && episodes.length === 0" 
      class="text-center py-12 text-gray-500"
    >
      <p class="text-lg">Эпизоды не найдены</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  episodes: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['play'])

// Состояние плеера
const { play, pause, toggle, currentEpisode, isPlaying } = usePlayer()

// Проверяет, играет ли сейчас этот эпизод
const isCurrentlyPlaying = (episode) => {
  return currentEpisode.value?.id === episode.id && isPlaying.value
}

// Переключает воспроизведение эпизода
const handlePlay = (episode) => {
  if (currentEpisode.value?.id === episode.id && isPlaying.value) {
    pause()
  } 
  else if (currentEpisode.value?.id === episode.id && !isPlaying.value) {
    toggle()
  }
  else {
    play(episode)
  }
}
</script>