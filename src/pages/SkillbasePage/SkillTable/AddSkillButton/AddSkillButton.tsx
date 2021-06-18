import { Button, Tooltip } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { newSkillDto, SkillDto } from "../../../../dtos/skillbase/SkillDto"
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto"
import { setEditingSkill } from "../../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../../store/store"

const AddSkillButton = (props: Props) => {
  const handleClick = () => {
    if (props.tag === "Untagged" || props.tag === null) {
      props.setEditingSkill(newSkillDto(null))
    } else {
      props.setEditingSkill(newSkillDto(props.tag.id))
    }
  }

  return (
    <Tooltip title="(q) Quick Add Skill">
      <Button
        id="add-skill-btn"
        onClick={handleClick}
        size="small"
        variant="contained"
        color="primary"
        startIcon={<AddIcon fontSize="small" />}
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

interface OwnProps {
  tag: TagDto | "Untagged"
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(AddSkillButton)
