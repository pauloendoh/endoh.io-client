import { ProfileDto } from "types/domain/_common/ProfileDto"

export interface SimpleUserDto {
  id: number
  username: string
  email: string
  isAdmin: boolean
  createdAt: string
  updatedAt: string
  expiresAt?: string
  profile: ProfileDto
}
