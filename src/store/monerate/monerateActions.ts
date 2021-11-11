import { IExpenseFilter } from "components/Monerate/ExpenseFilter/IExpenseFilter";
import { action } from "typesafe-actions";
import CategoryGetDto, {
  newCategory,
} from "../../types/domain/monerate/CategoryGetDto";
import ExpenseGetDto, {
  newExpenseDto,
} from "../../types/domain/monerate/ExpenseGetDto";
import PlaceGetDto, { newPlace } from "../../types/domain/monerate/PlaceGetDto";
import { monerateActionTypes } from "./monerateTypes";

export const setExpenses = (expenses: ExpenseGetDto[]) =>
  action(monerateActionTypes.SET_EXPENSES, expenses);

export const addOrUpdateExpense = (expense: ExpenseGetDto) =>
  action(monerateActionTypes.ADD_OR_UPDATE_EXPENSE, expense);

export const removeExpense = (id: number) =>
  action(monerateActionTypes.REMOVE_EXPENSE, id);

export const setFilter = (filter: IExpenseFilter) =>
  action(monerateActionTypes.SET_FILTER, filter);

export const setPlaces = (places: PlaceGetDto[]) =>
  action(monerateActionTypes.SET_PLACES, places);

export const setCategories = (places: CategoryGetDto[]) =>
  action(monerateActionTypes.SET_CATEGORIES, places);

export const startNewExpense = () =>
  action(monerateActionTypes.SET_EDITING_EXPENSE, newExpenseDto);
export const editExpense = (expense: ExpenseGetDto) =>
  action(monerateActionTypes.SET_EDITING_EXPENSE, expense);
export const closeExpenseModal = () =>
  action(monerateActionTypes.SET_EDITING_EXPENSE, null);

export const startNewPlace = () =>
  action(monerateActionTypes.SET_EDITING_PLACE, newPlace);
export const editPlace = (place: PlaceGetDto) =>
  action(monerateActionTypes.SET_EDITING_PLACE, place);
export const closePlaceModal = () =>
  action(monerateActionTypes.SET_EDITING_PLACE, null);

export const startNewCategory = () =>
  action(monerateActionTypes.SET_EDITING_CATEGORY, newCategory);
export const editCategory = (category: CategoryGetDto) =>
  action(monerateActionTypes.SET_EDITING_CATEGORY, category);
export const closeCategoryModal = () =>
  action(monerateActionTypes.SET_EDITING_CATEGORY, null);

export const clearMonerateReducer = () =>
  action(monerateActionTypes.CLEAR_MONERATE_REDUCER);

// PE 2/3 - Perigo da pessoa esquecer de colocar aqui....
export type MonerateActionReturns =
  | ReturnType<typeof setExpenses>
  | ReturnType<typeof addOrUpdateExpense>
  | ReturnType<typeof removeExpense>
  | ReturnType<typeof setFilter>
  | ReturnType<typeof setPlaces>
  | ReturnType<typeof startNewExpense>
  | ReturnType<typeof editExpense>
  | ReturnType<typeof closeExpenseModal>
  | ReturnType<typeof startNewPlace>
  | ReturnType<typeof editPlace>
  | ReturnType<typeof closePlaceModal>
  | ReturnType<typeof startNewCategory>
  | ReturnType<typeof editCategory>
  | ReturnType<typeof closeCategoryModal>
  | ReturnType<typeof setCategories>
  | ReturnType<typeof clearMonerateReducer>;
