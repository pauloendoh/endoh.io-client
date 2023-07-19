import CategoryGetDto from "./CategoryGetDto"
import PlaceGetDto from "./PlaceGetDto"

export default interface ExpenseGetDto {
  id: number | null
  userId: number | null

  name: string
  value: number | null
  rating: number | null

  place: PlaceGetDto | null
  description: string
  category: CategoryGetDto | null

  createdAt: string
  updatedAt: string
}

export const newExpenseDto: ExpenseGetDto = {
  id: null,
  userId: null,

  name: "",
  value: null,
  rating: null,

  place: null,
  description: "",
  category: null,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
