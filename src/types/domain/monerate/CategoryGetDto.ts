export default interface CategoryGetDto {
  id: number | null
  userId: number | null
  name: string
  icon: string
  bgColor: string
  createdAt: string
  updatedAt: string
}

export const newCategory: CategoryGetDto = {
  id: null,
  userId: null,
  name: "",
  icon: "",
  bgColor: "#C862AC",
  createdAt: "",
  updatedAt: "",
}
