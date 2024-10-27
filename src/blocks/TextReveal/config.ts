import { Block } from 'payload'

export const TextRevealByWord: Block = {
  slug: 'textRevealByWord',
  interfaceName: 'TextRevealByWordProps',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      label: 'Text',
    },
  ],
  labels: {
    singular: 'Text Reveal By Word',
    plural: 'Text Reveals By Word',
  },
}
