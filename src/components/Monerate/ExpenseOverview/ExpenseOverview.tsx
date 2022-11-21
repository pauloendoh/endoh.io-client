import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Paper, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import NumberFormat from "react-number-format"
import ExpenseGetDto from "../../../types/domain/monerate/ExpenseGetDto"
import FlexYCenter from "../../_UI/Flexboxes/FlexVCenter"

const ExpenseOverview = (props: Props) => {
  const theme = useTheme()

  const [overview, setOverview] = useState<IExpenseOverview>(
    getExpensesOverview(props.expenses)
  )

  useEffect(() => {
    setOverview(getExpensesOverview(props.expenses))
  }, [props.expenses])

  return (
    <FlexYCenter>
      <Paper>
        <Box p={2}>
          <Typography variant="h6"># Expenses</Typography>
          <Typography variant="h4">{overview.count}</Typography>
        </Box>
      </Paper>

      <Box mx={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6">Total Cost</Typography>
            <Typography variant="h4">
              <NumberFormat
                value={overview.totalValue}
                thousandSeparator
                displayType="text"
                prefix="$"
                decimalScale={2}
                fixedDecimalScale={overview.totalValue % 1 !== 0}
              />
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Paper>
        <Box p={2}>
          <Typography variant="h6">Avg. Rating</Typography>
          <Typography variant="h4">
            <FlexYCenter>
              <Box>{overview.avgRating}</Box>

              <FontAwesomeIcon
                icon={faStar}
                color={theme.palette.secondary.main}
                size={"sm"}
                style={{ marginLeft: 5, marginBottom: 5 }}
              />
            </FlexYCenter>
          </Typography>
        </Box>
      </Paper>
    </FlexYCenter>
  )
}

interface IExpenseOverview {
  count: number
  totalValue: number
  avgRating: number
}

const getExpensesOverview = (expenses: ExpenseGetDto[]) => {
  const ratedExpenses = expenses.filter((e) => e.rating > 0)
  let avg =
    ratedExpenses.reduce((sum, expense) => sum + expense.rating, 0) /
    ratedExpenses.length
  if (isNaN(avg)) {
    avg = 0
  } else {
    avg = Number(avg.toFixed(1))
  }

  return {
    count: expenses.length,
    totalValue: expenses.reduce((sum, expense) => sum + expense.value, 0),
    avgRating: avg,
  }
}

interface OwnProps {
  expenses: ExpenseGetDto[]
}
type Props = OwnProps

export default ExpenseOverview
