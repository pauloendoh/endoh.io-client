import { Box } from "@mui/material"
import Txt from "components/_UI/Text/Txt"
import { SkillExpectationDto } from "../../../../types/domain/skillbase/SkillExpectationDto"
import ExpectationsAtLevel from "./ExpectationsAtLevel/ExpectationsAtLevel"

interface Props {
  currentLevel: number
  expectations: SkillExpectationDto[]
  disabled?: boolean
  onChangeExpectations: (expectations: SkillExpectationDto[]) => void
}

// PE 2/3 - rename to SkillRoadmap?
const SkillExpectations = (props: Props) => {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <Box>
      <Txt variant="h5">Your roadmap</Txt>

      {levels.map((level) => (
        <ExpectationsAtLevel
          key={level}
          expectations={props.expectations}
          level={level}
          disabled={props.disabled}
          isHighlighted={props.currentLevel === level}
          onChangeExpectations={props.onChangeExpectations}
        />
      ))}
    </Box>
  )
}

export default SkillExpectations
