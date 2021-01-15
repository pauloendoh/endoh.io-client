import { Box, Chip, makeStyles } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import SkillLevelChip from "../../../../../components/skillbase/SkillLevelChip/SkillLevelChip"
import { SkillDto } from "../../../../../dtos/skillbase/SkillDto"
import { ApplicationState } from "../../../../../store/store"

const DependenciesTableCell = (props: Props) => {
  const classes = useStyles()
  return (
    <Box>
      {props.values.map((skill) => (
        <Chip
          className={classes.outerChip}
          key={skill.id}
          deleteIcon={<Box>xd</Box>}
          variant="outlined"
          label={
            <FlexVCenter>
              {skill.name}

              {(skill.currentLevel || skill.goalLevel) && (
                <SkillLevelChip
                  currentLevel={skill.currentLevel}
                  goalLevel={skill.goalLevel}
                />
              )}
            </FlexVCenter>
          }
        />
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  outerChip: {
    cursor: "inherit",
    marginBottom: 2,
    marginTop: 2,
    marginRight: 4,
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  values: SkillDto[]
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DependenciesTableCell)
