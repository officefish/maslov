import {
  IBasicInfo,
  IQuote,
  IDomain,
  IAvatar,
  ICover,
  ITartan,
} from './profile.types'
/**
 * Model User
 *
 */
const Role = {
  GUEST: 'GUEST',
  MEMBER: 'MEMBER',
  PUBLISHER: 'PUBLISHER',
  DEVELOPER: 'DEVELOPER',
  ADMIN: 'ADMIN',
}

export type Role = (typeof Role)[keyof typeof Role]

export interface UserMin {
  name?: string | null
  avatar?: string
}

export interface User extends UserMin {
  id: string
  email: string
  verified: boolean
  authenticated: boolean
  role: Role
}

export interface IUserProfile {
  basicInfo?: IBasicInfo
  quote?: IQuote
  domain?: IDomain
  avatar?: IAvatar
  cover?: ICover
  tartan?: ITartan
}
