import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Tooltip } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { newSkillDto, SkillDto } from "../../../../dtos/skillbase/SkillDto"
import { setEditingSkill } from "../../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../../store/store"

const AddSkillButton = (props: Props) => {
  return (
    <Tooltip title="(q) Quick Add Skill">
      <Button
        onClick={() => props.setEditingSkill(newSkillDto)}
        size="small"
        startIcon={<FontAwesomeIcon icon={faPlus} size="xs" />}
      >
        Add Skill
      </Button>
    </Tooltip>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(AddSkillButton)
