import type { Block } from 'payload'

export const InfoCard: Block = {
  slug: 'infoCard',
  interfaceName: 'Info Card',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
    },
    {
      name: 'subHeadline',
      type: 'text',
      required: true,
      label: 'Subheadline',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Ensure 'media' is a collection in your Payload setup
      required: true,
      label: 'Hero Image',
    },
    {
      name: 'imagePosition', // New field for image position
      type: 'select',
      label: 'Image Position',
      required: true,
      defaultValue: 'left', // Default image position
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
  ],
  labels: {
    plural: 'Info Cards',
    singular: 'Info Card',
  },
}
