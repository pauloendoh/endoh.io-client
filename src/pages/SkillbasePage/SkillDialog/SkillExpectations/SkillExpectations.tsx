import { Box, Button, Collapse, useTheme } from "@material-ui/core"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { SkillExpectationDto } from "../../../../dtos/skillbase/SkillExpectationDto"
import { ApplicationState } from "../../../../store/store"
import ExpectationsAtLevel from "./ExpectationsAtLevel/ExpectationsAtLevel"
const SkillExpectations = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const theme = useTheme()

  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <Box>
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        fullWidth
        style={{ background: theme.palette.grey[800] }}
      >
        {isExpanded ? "Hide Expectations" : "Show Expectations"}
      </Button>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {levels.map((level) => (
          <ExpectationsAtLevel
            key={level}
            expectations={props.expectations}
            level={level}
            onChangeExpectations={props.onChangeExpectations}
          />
        ))}
      </Collapse>
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  expectations: SkillExpectationDto[]
  onChangeExpectations: (expectations: SkillExpectationDto[]) => void
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SkillExpectations)
