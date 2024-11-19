'use client'
import {
  createClientFeature,
  slashMenuBasicGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { EmbedNode } from '../nodes'
import { EmbedIcon } from '../icon/EmbedIcon'
import { EmbedPlugin, INSERT_EMBER_COMMAND } from '../plugins'

const LexicalClientFeature = createClientFeature({
  nodes: [EmbedNode],
  plugins: [
    {
      position: 'normal',
      Component: EmbedPlugin,
    },
  ],
  slashMenu: {
    groups: [
      slashMenuBasicGroupWithItems([
        {
          key: 'embed',
          keywords: ['Embed', 'Youtube'],
          label: 'Embed',
          Icon: EmbedIcon,
          onSelect: ({editor}) => {
            editor.dispatchCommand(INSERT_EMBER_COMMAND, undefined)
          },
        },
      ]),
    ],
  },
})
export default LexicalClientFeature
