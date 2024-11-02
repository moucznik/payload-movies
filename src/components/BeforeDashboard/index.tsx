import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'
import Image from 'next/image'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h2>Welcome to your dashboard!</h2>
      </Banner>
      <h3> I know you wanted an image of a cat...</h3> <br />
      <Image src="/cat.jpeg" alt="cat" width="200" height="100" />
    </div>
  )
}

export default BeforeDashboard
