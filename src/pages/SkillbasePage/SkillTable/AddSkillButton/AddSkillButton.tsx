import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { newSkillDto, SkillDto } from "../../../../dtos/skillbase/SkillDto"
import { setEditingSkill } from "../../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../../store/store"

const AddSkillButton = (props: Props) => {
  const handleSubmit = () => {
    props.setEditingSkill(newSkillDto)
  }

  return (
    <Button
      onClick={handleSubmit}
      size="small"
      startIcon={<FontAwesomeIcon icon={faPlus} size="xs" />}
    >
      Add Skill
    </Button>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(AddSkillButton)
