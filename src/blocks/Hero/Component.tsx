'use client'

import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FlipWords } from './FlipWords'

type Props = Extract<Page['layout'][0], { blockType: 'heroBlock' }>

export const HeroBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ headline, image, subHeadline, links, description }) => {
  const flipWords = ['Innovative', 'Powerful', 'Seamless', 'Intuitive']

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center py-16 px-6 md:px-8 bg-gradient-to-br from-gray-50 to-indigo-50 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center md:items-start space-y-8 text-center md:text-left max-w-2xl px-4 md:pr-12">
        <div className="text-indigo-600 font-semibold text-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FlipWords words={flipWords} />
          </motion.h1>
        </div>
        <div className="text-5xl font-bold text-gray-900 md:text-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {headline}
          </motion.div>
        </div>
        <div className="text-gray-700 text-lg md:text-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {links?.map(({ link }, i) => (
              <CMSLink
                key={i}
                className="py-3 px-6 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                size="lg"
                {...link}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {image && typeof image === 'object' && image?.url && (
        <div className="mt-14 md:mt-0 md:max-w-md lg:max-w-lg flex-shrink-0 relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-indigo-300 rounded-lg transform rotate-3 scale-105 z-0"></div>
            <Image
              width={image.width || 600}
              height={image.height || 400}
              src={image.url}
              alt={image.alt || 'Hero Image'}
              className="relative z-10 w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      )}
    </section>
  )
}
