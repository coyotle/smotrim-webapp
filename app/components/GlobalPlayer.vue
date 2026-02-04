<template>
  <div 
    v-if="currentEpisode" 
    class="fixed bottom-0 left-0 right-0 bg-default shadow-lg z-50">
      <div class="max-w-7xl mx-auto px-4 py-3">
      <!-- Прогресс бар -->
      <div class="mb-2">
        <input
          type="range"
          :value="currentTime"
          :max="duration"
          class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          @input="handleSeek"
        >
        <div class="flex justify-between text-xs mt-1">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Обложка и информация -->
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <img 
            v-if="currentEpisode.image" 
            :src="currentEpisode.image" 
            :alt="currentEpisode.title"
            class="w-14 h-14 rounded-lg object-cover flex-shrink-0"
          >
          <div class="min-w-0 flex-1">
            <h4 class="font-semibold truncate">
              {{ currentEpisode.anons || currentEpisode.title }}
            </h4>
            <p class="text-sm truncate">
              {{ currentEpisode.description }}
            </p>
          </div>
        </div>

        <!-- Управление -->
        <div class="flex items-center gap-3">
          <!-- Кнопка перемотки назад -->
          <button
            class="p-2 hover:bg-gray-100 rounded-full transition"
            title="Назад на 10 сек"
            @click="skip(-10)"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
            </svg>
          </button>

          <!-- Кнопка Play/Pause -->
          <button
            class="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
            @click="toggle"
          >
            <svg v-if="!isPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"/>
            </svg>
          </button>

          <!-- Кнопка перемотки вперед -->
          <button
            class="p-2 hover:bg-gray-100 rounded-full transition"
            title="Вперед на 10 сек"
            @click="skip(10)"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
            </svg>
          </button>

          <!-- Громкость -->
          <div class="hidden md:flex items-center gap-2">
            <button class="p-2 hover:bg-gray-100 rounded-full transition" @click="toggleMute">
              <svg v-if="volume > 0" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z"/>
                <path d="M13.829 7.172a.75.75 0 00-1.061 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.28 5.22a.75.75 0 10-1.06 1.06L16.94 10l-2.72 2.72a.75.75 0 101.06 1.06L18 11.06l2.72 2.72a.75.75 0 101.06-1.06L19.06 10l2.72-2.72a.75.75 0 00-1.06-1.06L18 8.94l-2.72-2.72z"/>
              </svg>
            </button>
            <input
              type="range"
              :value="volume"
              min="0"
              max="1"
              step="0.01"
              class="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              @input="handleVolumeChange"
            >
          </div>

          <!-- Кнопка закрытия -->
          <button
            class="p-2 hover:bg-gray-100 rounded-full transition"
            @click="stop"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
            </svg>
          </button> 
        </div>
      </div>
    </div>

    <!-- HTML5 Audio Element -->
    <audio
      ref="audioElement"
      :src="currentEpisode.media"
      @timeupdate="updateTime"
      @loadedmetadata="updateDuration"
      @ended="onEnded"
      @canplay="onCanPlay"
    />
  </div>
</template>

<script setup>
const { 
  currentEpisode, 
  isPlaying, 
  currentTime, 
  duration, 
  volume,
  shouldAutoplay, // Добавили
  toggle,
  stop,
  seek,
  setVolume
} = usePlayer()

const audioElement = ref(null)
const previousVolume = ref(1)

// Синхронизация воспроизведения
watch(isPlaying, (playing) => {
  if (!audioElement.value) return
  if (playing) {
    audioElement.value.play().catch(err => {
      console.error('Ошибка воспроизведения:', err)
      isPlaying.value = false
    })
  } else {
    audioElement.value.pause()
  }
})

// Автовоспроизведение при загрузке нового эпизода
watch(currentEpisode, (newEpisode, oldEpisode) => {
  if (newEpisode && (!oldEpisode || newEpisode.id !== oldEpisode?.id)) {
    // Новый эпизод загружен
    nextTick(() => {
      if (audioElement.value) {
        audioElement.value.load() // Принудительная загрузка
      }
    })
  }
})

// Автозапуск когда аудио готово
const onCanPlay = () => {
  if (shouldAutoplay.value && isPlaying.value && audioElement.value) {
    audioElement.value.play().catch(err => {
      console.error('Автовоспроизведение заблокировано:', err)
      // Браузер может блокировать автовоспроизведение
      isPlaying.value = false
    })
    shouldAutoplay.value = false // Сбрасываем флаг
  }
}

// Синхронизация громкости
watch(volume, (vol) => {
  if (audioElement.value) {
    audioElement.value.volume = vol
  }
})

// Синхронизация времени
watch(currentTime, (time) => {
  if (audioElement.value && Math.abs(audioElement.value.currentTime - time) > 0.5) {
    audioElement.value.currentTime = time
  }
})

// Обновление времени
const updateTime = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
  }
}

const updateDuration = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration
  }
}

const handleSeek = (e) => {
  seek(parseFloat(e.target.value))
}

const handleVolumeChange = (e) => {
  setVolume(parseFloat(e.target.value))
}

const skip = (seconds) => {
  seek(currentTime.value + seconds)
}

const toggleMute = () => {
  if (volume.value > 0) {
    previousVolume.value = volume.value
    setVolume(0)
  } else {
    setVolume(previousVolume.value || 1)
  }
}

const onEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
}

// Форматирование времени
const formatTime = (seconds) => {
  if (!seconds || !isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Установка начальной громкости при монтировании
onMounted(() => {
  if (audioElement.value) {
    audioElement.value.volume = volume.value
  }
})
</script>