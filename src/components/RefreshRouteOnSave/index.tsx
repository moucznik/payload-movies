'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'
import React from 'react'

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter()

  const serverURL = process.env.NEXT_PUBLIC_PAYLOAD_URL
  if (!serverURL) return null

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={serverURL}
    />
  )
}
