export const usePlayer = () => {
  // Глобальное состояние плеера
  const currentEpisode = useState('player-episode', () => null)
  const isPlaying = useState('player-playing', () => false)
  const currentTime = useState('player-time', () => 0)
  const duration = useState('player-duration', () => 0)
  const volume = useState('player-volume', () => 1)
  const shouldAutoplay = useState('player-autoplay', () => false) // Новый флаг

  // Методы управления
  const play = (episode) => {
    // Если это новый эпизод - сбрасываем время и включаем автоплей
    if (!currentEpisode.value || currentEpisode.value.id !== episode.id) {
      currentTime.value = 0
      shouldAutoplay.value = true // Флаг для автозапуска
    }
    currentEpisode.value = episode
    isPlaying.value = true
  }

  const pause = () => {
    isPlaying.value = false
  }

  const toggle = () => {
    isPlaying.value = !isPlaying.value
  }

  const stop = () => {
    currentEpisode.value = null
    isPlaying.value = false
    currentTime.value = 0
    shouldAutoplay.value = false
  }

  const seek = (time) => {
    currentTime.value = time
  }

  const setVolume = (vol) => {
    volume.value = Math.max(0, Math.min(1, vol))
  }

  return {
    // State
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    volume,
    shouldAutoplay,
    // Methods
    play,
    pause,
    toggle,
    stop,
    seek,
    setVolume
  }
}