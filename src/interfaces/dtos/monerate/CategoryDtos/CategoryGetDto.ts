export default interface CategoryGetDto {
    id: number;
    userId: number;
    name: string;
    icon: string;
    bgColor: string;
    createdAt: string
    updatedAt: string
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