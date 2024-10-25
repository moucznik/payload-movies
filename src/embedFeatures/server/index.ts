import { createServerFeature } from '@payloadcms/richtext-lexical'
import { EmbedNode } from '../nodes'

export const LexicalServerFeature = createServerFeature({
  key: 'embed',
  feature: {
    ClientFeature: { path: '@/embedFeatures/client/' },
    nodes: [
      {
        node: EmbedNode,
      },
    ],
    // C:\dev\poc payload\poc1\src\embedFeatures
  },
})
