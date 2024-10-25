import { Site } from '@/payload-types'
import { Access, FieldAccess } from 'payload'

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

// Field-level access function
export const isAdminOrHasFieldAccess =
  (siteIDFieldName: string = 'site'): FieldAccess =>
  ({ req: { user }, data }) => {
    if (user) {
      // Admin role can access all fields
      if (user.roles.includes('admin')) return true

      // Editor role with specific site access
      if (user.roles.includes('editor') && user.sites && user.sites.length > 0) {
        const siteIDs = user.sites
          .filter((site): site is Site => typeof site === 'object' && 'id' in site)
          .map((site) => site.id)

        // Check if the field's site ID matches one of the user's sites
        if (data?.[siteIDFieldName] && siteIDs.includes(data[siteIDFieldName])) {
          return true
        }

        // Deny access if the field’s site ID does not match
        return false
      }
    }

    // Deny access for all others
    return false
  }
