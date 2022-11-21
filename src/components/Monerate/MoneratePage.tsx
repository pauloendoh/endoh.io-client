import { Box } from "@mui/material"
import { useAxios } from "hooks/utils/useAxios"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ApplicationState } from "store/store"
import * as monerateActions from "../../store/monerate/monerateActions"
import CategoryGetDto from "../../types/domain/monerate/CategoryGetDto"
import ExpenseGetDto from "../../types/domain/monerate/ExpenseGetDto"
import PlaceGetDto from "../../types/domain/monerate/PlaceGetDto"
import ExpenseFilter from "./ExpenseFilter/ExpenseFilter"
import { getFilteredExpenses } from "./ExpenseFilter/IExpenseFilter"
import ExpenseList from "./ExpenseList/ExpenseList"
import ExpenseOverview from "./ExpenseOverview/ExpenseOverview"
import EditCategoryModal from "./Modals/EditCategoryModal"
import EditPlaceModal from "./Modals/EditPlaceModal"
import MonerateLayout from "./MonerateLayout/MonerateLayout"

// PE 3/3
const MoneratePage = (props: Props) => {
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseGetDto[]>([])

  const axios = useAxios()
  useEffect(
    () => {
      document.title = "Monerate"

      axios.get<ExpenseGetDto[]>("/monerate/expense/").then((res) => {
        props.setExpenses(res.data)
      })

      axios.get<PlaceGetDto[]>("/monerate/place").then((res) => {
        props.setPlaces(res.data)
      })

      axios.get<CategoryGetDto[]>("/monerate/category").then((res) => {
        props.setCategories(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    setFilteredExpenses(getFilteredExpenses(props.filter, props.expenses))
  }, [props.expenses, props.filter])

  return (
    <MonerateLayout>
      <Box mt={3}>
        <ExpenseFilter />
      </Box>

      <Box mt={3}>
        <ExpenseOverview expenses={filteredExpenses} />
      </Box>

      <Box mt={3}>
        <ExpenseList expenses={filteredExpenses} />
      </Box>

      <EditPlaceModal />
      <EditCategoryModal />
    </MonerateLayout>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  expenses: state.monerate.expenses,
  filter: state.monerate.filter,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setExpenses: (expenses: ExpenseGetDto[]) =>
    dispatch(monerateActions.setExpenses(expenses)),
  setPlaces: (places: PlaceGetDto[]) =>
    dispatch(monerateActions.setPlaces(places)),
  setCategories: (categories: CategoryGetDto[]) =>
    dispatch(monerateActions.setCategories(categories)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MoneratePage)
