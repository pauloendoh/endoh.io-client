import { Box, Chip, makeStyles } from "@material-ui/core"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
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
                <Box ml={1}>
                  <InnerChip
                    currentLevel={skill.currentLevel}
                    goalLevel={skill.goalLevel}
                  />
                </Box>
              )}
            </FlexVCenter>
          }
        />
      ))}
    </Box>
  )
}

const InnerChip = (p: { currentLevel: number; goalLevel: number }) => {
  const classes = useStyles()
  return (
    <Chip
      className={classes.innerChip}
      size="small"
      label={
        <FlexVCenter>
          {p.currentLevel ? p.currentLevel : null}
          {p.currentLevel && p.goalLevel && <ArrowRightAltIcon />}
          {p.goalLevel ? p.goalLevel : null}
        </FlexVCenter>
      }
    />
  )
}

const useStyles = makeStyles((theme) => ({
  outerChip:{
    cursor: 'inherit',
    marginBottom: 2,
    marginTop: 2,
    marginRight: 4
  },
  innerChip: {
    cursor: 'inherit',
    position: "relative",
    height: "20px",
    left: "4px",
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
