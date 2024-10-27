import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const Hero: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
      localized: true,
    },
    {
      name: 'subHeadline',
      type: 'text',
      required: true,
      label: 'Subheadline',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      localized: true,
      admin: {
        description: 'Main paragraph text in the hero section.',
      },
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Ensure 'media' is a collection in your Payload setup
      required: true,
      label: 'Hero Image',
    },
  ],
  labels: {
    plural: 'Heros',
    singular: 'Hero',
  },
}
