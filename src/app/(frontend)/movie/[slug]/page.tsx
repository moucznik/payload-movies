import type { Metadata } from 'next'

import Image from 'next/image'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Media } from '@/payload-types'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { generateMeta } from '@/utilities/generateMeta'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const posts = await payload.find({
    collection: 'movies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function MovieDetails({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/movie/' + slug
  const post = await queryMoviesBySlug({ slug })
  if (!post) return <PayloadRedirects url={url} />

  const movie = post

  return (
    <div className="flex gap-2 mt-5">
      <Image
        src={(movie.poster as Media)?.url ?? ''}
        alt={(movie.poster as Media)?.alt ?? ''}
        width={(movie.poster as Media)?.width ?? 100}
        height={(movie.poster as Media)?.height ?? 100}
        className="w-1/3 rounded-3xl"
      />
      <div className="flex flex-col gap-2 w-2/3">
        <h1 className="font-bold text-4xl border-b-2">{movie.name}</h1>
        {movie.tagline && <h2 className="font-light text-3xl mb-3">{movie.tagline}</h2>}
        <p className="font-light mb-3 text-right">
          {movie.genres.map(({ name }) => name).join(', ')}
        </p>
        <p className="italic">{movie.overview}</p>
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryMoviesBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryMoviesBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'movies',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
