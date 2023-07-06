import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "hooks/react-query/queryKeys"
import ExpenseGetDto from "types/domain/monerate/ExpenseGetDto"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"

export default function useSimilarExpensesQuery(value: number) {
  return useQuery(
    [queryKeys.similarExpenses],
    () =>
      myAxios
        .get<ExpenseGetDto[]>(urls.api.monerate.similarExpenses(value))
        .then((res) => res.data),
    { refetchOnWindowFocus: false, initialData: [] }
  )
}
