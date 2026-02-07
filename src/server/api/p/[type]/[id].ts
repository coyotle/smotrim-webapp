import { findPodcast } from '~/utils/podcasts.ts'

export default defineEventHandler(async (event) => {
    const { type, id } = event.context.params as { type: string; id: string }
    const query = getQuery(event)
    const page = query.page || 1
    const limit = query.limit || 10
    
    if (!['brand', 'rubric'].includes(type)) {
        throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: 'Invalid podcast type'
        })
    }
    
    const typeParam = type === 'brand' ? 'brandId' : 'rubricId'
    const podcast = findPodcast(id, type)

    const response = await $fetch(`https://smotrim.ru/api/audios?page=${page}&limit=${limit}&${typeParam}=${id}`)

    const content = response.contents[0]
    const data = {
        podcast,
        episodes: content.list.map(item => ({
        id: item.id,
        title: item.title,
        media: `https://vgtrk-podcast.cdnvideo.ru/audio/listen?id=${item.id}`,
        preview: item.preview.source.main, 
        duration: item.duration,
        anons: stripHtml(item.anons),
        description: stripHtml(item.description),
        published: item.published,
        }))
    }

    return data
})

function stripHtml(html: string) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}