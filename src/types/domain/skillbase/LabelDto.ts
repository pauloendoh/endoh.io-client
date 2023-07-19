export interface LabelDto {
  id: number | null
  userId: number | null

  name: string
  bgColor: string

  createdAt: string
  updatedAt: string
}

export const newLabelDto = (p?: Partial<LabelDto>): LabelDto => ({
  id: null,
  userId: null,

  name: "",
  bgColor: "#4d4d4d",

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
})
