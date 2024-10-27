import { Block } from 'payload'

export const SmCardBlock: Block = {
  slug: 'smCardBlock',
  interfaceName: 'SmallCardBlock',
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'Action Cards',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Ensure 'media' is a collection in your Payload setup
          required: true,
          label: 'Icon Image',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Card Title',
        },
      ],
    },
  ],
}
