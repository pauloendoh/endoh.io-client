import CategoryGetDto from './CategoryDtos/CategoryGetDto'
import PlaceGetDto from './PlaceGetDto'

export default interface ExpenseGetDto {
    id: number,
    userId: number,

    name: string,
    value: number,
    rating: number,

    place: PlaceGetDto,
    description: string,
    category: CategoryGetDto,

    createdAt: string,
    updatedAt: string,
}

export const newExpenseDto: ExpenseGetDto = {
    id: null,
    userId: null,

    name: '',
    value: null,
    rating: null,

    place: null,
    description: '',
    category: null,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}