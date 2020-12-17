import CategoryGetDto from '../../interfaces/dtos/monerate/CategoryDtos/CategoryGetDto';
import ExpenseGetDto from '../../interfaces/dtos/monerate/ExpenseGetDto';
import PlaceGetDto from '../../interfaces/dtos/monerate/PlaceGetDto';

// PE 1/3 - não precisa disso. Faz no mesmo lugar das interfaces?
export const newExpense: ExpenseGetDto = {
  id: null,
  userId: null,
  name: '',
  value: null,
  rating: null,
  place: null,
  description: '',
  category: null,
  createdAt: '',
  updatedAt: ''
}

export const newPlace: PlaceGetDto = {
  id: null,
  userId: null,
  name: '',
  icon: '',
  bgColor: '#3DAC8D',
  createdAt: '',
  updatedAt: '',
}

export const newCategory: CategoryGetDto = {
  id: null,
  userId: null,
  name: '',
  icon: '',
  bgColor: '#C862AC',
  createdAt: '',
  updatedAt: '',
}