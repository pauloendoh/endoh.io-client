export interface AuthUserGetDto {
  id: number
  username: string
  email: string
  // preference: UserPreferenceDto
  userExpiresAt: string

  token: string
  tokenExpiresAt: string
}

export interface UserPreferenceDto {
  id: number

  relearnAutofillURL: boolean
  relearnLastAccessedRoute: string

  skillbaseSidebarIsOpen: boolean
  skillbaseSortSkill: {
    sortBy: string
    order: "asc" | "desc"
  }
  skillbaseTextFilter: string

  createdAt: string
  updatedAt: string
}
