import { AccessArgs, FieldAccess } from 'payload'
import { User } from '../payload-types'

type IisAdmin = (args: AccessArgs<User>) => boolean

export const isAdmin: IisAdmin = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}
