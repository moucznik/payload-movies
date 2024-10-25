import { Site } from '@/payload-types'
import { Access } from 'payload'

export const isAdminOrHasSiteAccess =
  (siteIDFieldName: string = 'site'): Access =>
  ({ req: { user } }) => {
    // Need to be logged in
    if (user) {
      // If user has role of 'admin'
      if (user.roles.includes('admin')) return true

      // If user has role of 'editor' and has access to a site,
      // return a query constraint to restrict the documents this user can edit
      // to only those that are assigned to a site, or have no site assigned
      if (user.roles.includes('editor') && user.sites && user.sites?.length > 0) {
        // Otherwise, we can restrict it based on the `site` field

        const siteIDs = user.sites
          .filter((site): site is Site => typeof site === 'object' && 'id' in site)
          .map((site) => site.id)

        return {
          or: [
            {
              [siteIDFieldName]: {
                in: siteIDs,
              },
            },
            // WHy is this here GPT I dont get it? Do i need it here?
            {
              [siteIDFieldName]: {
                exists: false,
              },
            },
          ],
        }
      }
    }

    // Reject everyone else
    return false
  }
