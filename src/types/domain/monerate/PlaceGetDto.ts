export default interface PlaceGetDto {
  id: number | null
  userId: number | null
  name: string
  icon: string
  bgColor: string
  createdAt: string
  updatedAt: string
}

export const newPlace: PlaceGetDto = {
  id: null,
  userId: null,
  name: "",
  icon: "",
  bgColor: "#3DAC8D",
  createdAt: "",
  updatedAt: "",
}
