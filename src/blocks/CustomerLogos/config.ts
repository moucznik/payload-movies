import { Block } from "payload";

export const TrustedBy: Block = {
  slug: 'trustedBy',
  interfaceName: 'TrustedBySection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
      defaultValue: 'TRUSTED BY TEAMS FROM AROUND THE WORLD',
      admin: {
        description: 'Text displayed above the logo section',
      },
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Logos',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'logoSVG',
          type: 'textarea',
          label: 'Logo SVG Code',
          required: true,
          admin: {
            description: 'Paste the SVG code for the logo here.',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Trusted By Section',
    plural: 'Trusted By Sections',
  },
}
