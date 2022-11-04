import { Container } from "@mui/material"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import useDebounce from "hooks/utils/useDebounce"
import { useMemo, useState } from "react"
import MonerateLayout from "../MonerateLayout/MonerateLayout"
import SimilarExpenseList from "./SimilarExpenseList/SimilarExpenseList"

interface Props {
  test?: string
}

const SimilarExpensesPage = (props: Props) => {
  const [value, setValue] = useState("")

  const debouncedValue = useDebounce(value, 250)

  const numValue = useMemo(() => {
    if (isNaN(Number(debouncedValue))) return null
    return Number(debouncedValue)
  }, [debouncedValue])

  return (
    <MonerateLayout>
      <Container style={{ marginTop: 32 }}>
        <MyTextField
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={isNaN(Number(value))}
          helperText={isNaN(Number(value)) && "Invalid number"}
        />

        {numValue > 0 && <SimilarExpenseList expenseValue={numValue} />}
      </Container>
    </MonerateLayout>
  )
}

export default SimilarExpensesPage
