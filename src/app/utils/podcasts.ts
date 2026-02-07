import stationsData from '~/data/podcasts.json'

export const getAllPodcasts = () => {
  return stationsData.stations.flatMap(station => 
    station.podcasts.map(p => ({
      ...p, 
      station_id: station.id, 
      station_name: station.name,
      link: p.brand_id ? `/p/brand/${p.brand_id}` : `/p/rubric/${p.rubric_id}`
    }))
  )
}


export const findPodcast = (id: string | number, type: string) => {
  const numericId = Number(id)
  
  for (const station of stationsData.stations) {
    const podcast = station.podcasts.find(p => {
      if (type === 'brand') {
        return p.brand_id === numericId
      } else if (type === 'rubric') {
        return p.rubric_id === numericId
      }
      return false
    })
    
    if (podcast) {
      return {
        ...podcast,
        station_id: station.id,
        station_name: station.name,
        link: podcast.brand_id 
          ? `/p/brand/${podcast.brand_id}` 
          : `/p/rubric/${podcast.rubric_id}`
      }
    }
  }
  
  return null
}