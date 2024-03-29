export default interface ExpensePostDto {
  id: number;
  placeId?: number;
  description: string;
  name: string;
  rating: number;
  value: number;

  categoryId?: number;
}
