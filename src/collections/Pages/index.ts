import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { Hero } from '../../blocks/Hero/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { InfoCard } from '@/blocks/InfoCard/config'
import { TrustedBy } from '@/blocks/CustomerLogos/config'
import { BigCardBlock } from '@/blocks/BigCardBlock/config'
import { SmCardBlock } from '@/blocks/SmallCardBlock/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { isAdminOrHasFieldAccess, isAdminOrHasSiteAccess } from '@/access/isAdminOrHasSiteAccess'
import { TextRevealByWord } from '@/blocks/TextReveal/config'
export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: isAdminOrHasSiteAccess('id'),
    delete: isAdminOrHasSiteAccess('id'),
    read: authenticatedOrPublished,
    update: isAdminOrHasSiteAccess('id'),
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
        })

        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
      })

      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites',
      required: true,
      // If user is not admin, set the site by default
      // to the first site that they have access to
      access: {
        read: authenticated,
        update: isAdminOrHasFieldAccess('id'),
        create: isAdminOrHasFieldAccess('id'),
      },
      defaultValue: ({ user }) => {
        if (!user.roles.includes('admin') && user.sites?.[0]) {
          return user.sites[0]
        }
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                Hero,
                BigCardBlock,
                SmCardBlock,
                InfoCard,
                TextRevealByWord,
                TrustedBy
              ],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
