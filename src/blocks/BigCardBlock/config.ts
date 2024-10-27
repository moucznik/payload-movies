import { link } from '@/fields/link'
import { Block } from 'payload'

export const BigCardBlock: Block = {
  slug: 'bigCardBlock',
  interfaceName: 'BigCardBlock',
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'Action Cards',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Card Title',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Card Description',
        },
        {
          name: 'btnLinks',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
        },
      ],
    },
  ],
}
