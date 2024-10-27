'use client'

import React, { useEffect, useRef } from 'react'
import type { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'trustedBy' }> & {
  id?: string
}

export const TrustedBy: React.FC<Props> = ({ title, logos }) => {
  return (
    <div className="py-14 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h3 className="font-semibold text-lg text-gray-800 text-center mb-8">{title}</h3>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          <ul className="flex items-center justify-center space-x-16 whitespace-nowrap">
            {[...logos, ...logos].map((logo, index) => (
              <li
                key={index}
                className="flex-none transition-transform duration-300 ease-in-out hover:scale-102"
              >
                <div
                  className="w-auto h-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
                  dangerouslySetInnerHTML={{ __html: logo.logoSVG }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
