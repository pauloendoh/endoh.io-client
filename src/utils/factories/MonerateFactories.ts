import CategoryGetDto from '../../interfaces/dtos/monerate/CategoryDtos/CategoryGetDto';
import PlaceGetDto from '../../interfaces/dtos/monerate/PlaceGetDto';

// PE 1/3 - não precisa disso. Faz no mesmo lugar das interfaces?


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