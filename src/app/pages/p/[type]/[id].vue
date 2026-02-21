<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Заголовок подкаста -->
    <PodcastHeader
      :title="podcast?.title || ''"
      :description="podcast?.description"
    />

    <!-- Список эпизодов -->
    <EpisodeList
      :episodes="allEpisodes || []"
      :loading="pending"
      :error="error?.message"
    />

    <!-- Кнопка "Ещё" -->
    <div
      v-if="hasMore && !pending"
      class="my-4 text-center"
    >
      <button
        :disabled="loadingMore"
        class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        @click="loadMore"
      >
        <span v-if="!loadingMore">Ещё</span>
        <span v-else class="flex items-center justify-center gap-2">
          <LoadingIcon />
          Загрузка...
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { type, id } = route.params

if (!['brand', 'rubric'].includes(type)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    message: 'Invalid podcast type'
  })
}

if (!id || isNaN(Number(id))) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    message: 'Invalid podcast ID'
  })
}

const { data, pending, error } = await useFetch(`/api/p/${type}/${id}`)
const podcast = computed(() => data.value?.podcast)

// Динамические SEO мета-теги для страницы подкаста
useHead(() => ({
  title: podcast.value ? `Подкаст "${podcast.value.title}" - ${podcast.value.station_name}` : 'Подкаст',
  meta: [
    { 
      name: 'description', 
      content: podcast.value?.description 
        ? `Слушайте подкаст "${podcast.value.title}". ${podcast.value.description?.substring(0, 120)}...`
        : 'Слушайте подкасты радиостанций Вести ФМ, Маяк и других'
    },
    { name: 'keywords', content: `подкаст, радио, слушать онлайн, выпуски, аудиопрограмма, ${podcast.value.title}, ${podcast.value.station_name}` },
    { property: 'og:title', content: podcast.value ? `${podcast.value.title} - Смотрим` : 'Подкаст' },
    { property: 'og:description', content: podcast.value?.description || 'Слушайте подкасты российских радиостанций' },
    { property: 'og:type', content: 'website' }
  ]
}))

// Пагинация
const currentPage = ref(1)
const allEpisodes = ref([])
const hasMore = ref(true)
const loadingMore = ref(false)

// Инициализируем список эпизодов
watchEffect(() => {
  if (data.value?.episodes) {
    allEpisodes.value = data.value.episodes
    hasMore.value = data.value.hasMore !== false
  }
})

// Загрузка дополнительных эпизодов
const loadMore = async () => {
  if (loadingMore.value || !hasMore.value) return

  try {
    loadingMore.value = true
    currentPage.value++

    const response = await $fetch(`/api/p/${type}/${id}?page=${currentPage.value}`)

    if (response?.episodes && response.episodes.length > 0) {
      // Добавляем новые эпизоды в конец списка
      allEpisodes.value = [...allEpisodes.value, ...response.episodes]
      hasMore.value = response.hasMore !== false
    } else {
      hasMore.value = false
    }
  } catch (err) {
    console.error('Ошибка при загрузке дополнительных эпизодов:', err)
  } finally {
    loadingMore.value = false
  }
}

</script>