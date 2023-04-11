import { SetMetadata } from '@nestjs/common'
import { type UserRoleEnum } from './user'

export const USER_ROLE_KEY = 'userRole'
export const UserRole = (role: UserRoleEnum) =>
  SetMetadata(USER_ROLE_KEY, role)
