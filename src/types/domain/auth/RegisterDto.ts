export interface RegisterDto {
  username: string
  email: string
  password: string
  password2: string
}

export const buildRegisterDto = (p?: Partial<RegisterDto>): RegisterDto => ({
  username: "",
  email: "",
  password: "",
  password2: "",
  ...p,
})
