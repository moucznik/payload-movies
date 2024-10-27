import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ArrowRight } from 'lucide-react'

type Props = Extract<Page['layout'][0], { blockType: 'bigCardBlock' }>

export const BigCardBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links }) => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(links || []).map(({ title, description, btnLinks }, i) => (
            <div
              key={i}
              className="group bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col"
            >
              <div className="flex justify-end items-start mb-4">
              <ArrowRight
                className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                size={24}
              />
              </div>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
              </div>
              <p className="text-gray-600 mb-6 flex-grow">{description}</p>
              {btnLinks &&
                btnLinks.map(({ link: l }, i) => (
                  <CMSLink
                    key={i}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 text-center"
                    size="lg"
                    {...l}
                  />
                ))}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
