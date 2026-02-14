<template>
<div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Поиск -->
    <div class="mb-6 flex justify-center">
      <UInput ref="input" v-model="searchQuery" icon="i-lucide-search" class="w-full max-w-md" > 
        <template #trailing>
            <UKbd value="meta" />
            <UKbd value="f" />
        </template>
    </UInput>
    </div>

    <!-- Список карточек -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      <PodcastCard 
        v-for="podcast in filteredPodcasts" 
        :key="podcast.id"
        :podcast="podcast"
      />
    </div>

</div>
</template>

<script setup>
    import { getAllPodcasts } from '~/utils/podcasts.ts'

    const input = useTemplateRef('input')

    defineShortcuts({
        'meta_f': () => {  // Meta+F
            input.value?.inputRef?.focus()
        },
        'meta_а': () => {  // Meta+А для кириллицы
            input.value?.inputRef?.focus()
        },
        escape: { // очистка строки поиска
            usingInput: true,
            handler: () => clearSearch()
        }
    })

    const searchQuery = ref('')
    const allPodcasts = getAllPodcasts()

    const filteredPodcasts = computed(() => {
        if (!allPodcasts) return []

        const q = searchQuery.value.trim().toLowerCase()

        const podcasts = q 
            ? allPodcasts.filter(podcast => {
                const title = podcast.title?.toLowerCase() || ''
                const desc = podcast.description?.toLowerCase() || ''
                const station_name = podcast.station_name?.toLowerCase() || ''
                return title.includes(q) || desc.includes(q) || station_name.includes(q)
            })
            : allPodcasts

        return [...podcasts].sort((p1, p2) => 
        p1.title.toLowerCase().localeCompare(p2.title.toLowerCase())
    )
    })

    const clearSearch = ()=>{
        searchQuery.value=''
    }


</script>