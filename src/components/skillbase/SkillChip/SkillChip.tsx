import { Box, Button, makeStyles } from "@material-ui/core"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { SkillDto } from "../../../dtos/skillbase/SkillDto"
import { setEditingSkill } from "../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../store/store"
import Flex from "../../shared/Flexboxes/Flex"
import FlexVCenter from "../../shared/Flexboxes/FlexVCenter"

// PE 2/3
function SkillChip(props: Props) {
  const classes = useStyles()

  return (
    <Button
      key={props.skill.id}
      variant="outlined"
      size="small"
      className={classes.skillButton}
      onClick={() => {
        props.editSkill(props.skill)
      }}
    >
      <Flex>
        <Box>{props.skill.name}</Box>

        {(props.skill.currentLevel || props.skill.goalLevel) && (
          <FlexVCenter ml={1} className={classes.innerChip}>
            {/* only has current level */}
            {props.skill.currentLevel &&
              !props.skill.goalLevel &&
              props.skill.currentLevel}

            {/* only has goal */}
            {!props.skill.currentLevel && props.skill.goalLevel && (
              <>
                ?<ArrowRightAltIcon />
                {props.skill.goalLevel}
              </>
            )}

            {/* has both */}
            {props.skill.currentLevel && props.skill.goalLevel && (
              <>
                {props.skill.currentLevel}
                <ArrowRightAltIcon />
                {props.skill.goalLevel}
              </>
            )}
          </FlexVCenter>
        )}
      </Flex>
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  skillButton: {
    marginRight: 8,
    marginBottom: 8,
    fontWeight: 400,
  },
  innerChip: {
    background: "#393939",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
})

interface OwnProps {
  skill: SkillDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(SkillChip)
