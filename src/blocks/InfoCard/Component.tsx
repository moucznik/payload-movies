import React from 'react'
import Image from 'next/image'
import type { Media, Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'infoCard' }>

export const InfoCard: React.FC<
  Props & {
    id?: string
  }
> = ({ headline, subHeadline, image, id, imagePosition }) => {
  // Ensure image is of type 'Media' and has a valid URL
  const media = typeof image === 'object' ? (image as Media) : null

  // Determine the layout based on the imagePosition
  const imageOnLeft = imagePosition === 'left'

  return (
    <div id={id} className="relative w-full py-20">
      <div
        className={`container mx-auto flex flex-col md:flex-row ${imageOnLeft ? 'md:flex-row-reverse' : ''} items-center justify-between space-y-6 md:space-y-0 md:space-x-6 animate-fade-in`}
      >
        <div className="order-2 md:order-1 w-full md:w-1/2">
          {media?.url && (
            <Image
              src={media.url}
              alt={media.alt || 'Info card image'}
              width={media.width || 600} // Default width
              height={media.height || 400} // Default height
              className="w-full h-auto transition-transform transform hover:scale-105 duration-300"
            />
          )}
        </div>
        <div className="order-1 md:order-2 w-full md:w-1/2 text-left">
          <h2 className="text-3xl font-semibold mb-4">{headline}</h2>
          <p className="text-lg">{subHeadline}</p>
        </div>
      </div>
    </div>
  )
}
