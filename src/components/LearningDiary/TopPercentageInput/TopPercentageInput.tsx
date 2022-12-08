import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import useAvgLearningPerHourQuery from "hooks/react-query/progress-diary/useAvgLearningPerHourQuery"
import useDebounce from "hooks/utils/useDebounce"
import { useEffect } from "react"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"

interface Props {
  test?: string
}

const TopPercentageInput = (props: Props) => {
  const { topPercentage, setTopPercentage } = useLearningDiaryStore()
  const { refetch } = useAvgLearningPerHourQuery(topPercentage)

  const debouncedTopPercentage = useDebounce(topPercentage, 500)
  useEffect(() => {
    refetch()
  }, [debouncedTopPercentage])

  return (
    <FlexVCenter>
      <MyTextField
        label="Top %"
        sx={{ width: 64 }}
        type="number"
        value={topPercentage}
        onChange={(e) => {
          const value = e.target.value
          if (value === "") return
          const parsedValue = parseInt(value)
          if (parsedValue < 0 || parsedValue > 100) return
          setTopPercentage(parsedValue)
        }}
      />
    </FlexVCenter>
  )
}

export default TopPercentageInput
