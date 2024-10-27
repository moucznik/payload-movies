import React from 'react'
import type { Page } from '@/payload-types'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

type Props = Extract<Page['layout'][0], { blockType: 'smCardBlock' }>

export const SmCardBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links }) => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(links || []).map(({ title, image }, i) => (
            <div
              key={i}
              className="group cursor-pointer bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <ArrowRight
                  className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                  size={24}
                />
              </div>
              {image && typeof image === 'object' && image?.url && (
                <div className="relative h-48 w-full">
                  <Image fill src={image.url} alt={image.alt || title} className="object-contain" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-green-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
