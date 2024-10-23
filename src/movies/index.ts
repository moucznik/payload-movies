'use server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'

export const searchMovies = async (query: string) => {
  //   const response = await fetch('fff')

  //   const { results } = await response.json()
  console.log(query)

  return [query]
}

export const addMovieAction = async (movieName: string) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const response = await fetch('https://images.seroundtable.com/google-paint-1729074053.jpg')
  const arrayBuffer = await response.arrayBuffer()
  const posterBuffer = Buffer.from(arrayBuffer)

  const posterMedia = await payload.create({
    collection: 'media',
    data: {
      alt: 'image',
    },
    file: {
      data: posterBuffer,
      name: 'image',
      size: posterBuffer.byteLength,
      mimetype: 'image/jpeg',
    },
  })

  const movie = payload.create({
    collection: 'movies',
    data: {
      genres: [{ id: '1', name: 'cool' }],
      name: movieName,
      overview: 'over',
      poster: posterMedia.id,
      tagline: 'tag',
      title: movieName,
      url: 'rifer',
      votes: 0,
    },
  })

  revalidatePath('/')

  return movie
}

export const addVoteToMovie = async (id: number) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const movie = await payload.findByID({
    collection: 'movies',
    id,
  })

  await payload.update({
    collection: 'movies',
    id: movie.id,
    data: {
      votes: movie.votes + 1,
    },
  })

  const movies = await payload.find({
    collection: 'movies',
    sort: '-votes',
  })

  return movies.docs
}
