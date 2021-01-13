import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import API from "../../../../consts/API"
import MY_AXIOS from "../../../../consts/MY_AXIOS"
import { ApplicationState } from "../../../../store/store"
import { SkillDto } from "../../../../dtos/skillbase/SkillDto"
import { addSkill } from "../../../../store/skillbase/skillbaseActions"

const AddSkillButton = (props: Props) => {
  const handleSubmit = () => {
    MY_AXIOS.post<SkillDto>(API.skillbase.skill).then((res) => {
      props.addSkill(res.data)
    })
  }

  return (
    <Button
      onClick={handleSubmit}
      variant="contained"
      color="primary"
      size="small"
      startIcon={<FontAwesomeIcon icon={faPlus} size="xs" />}
    >
      Add Skill
    </Button>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addSkill: (skill: SkillDto) => dispatch(addSkill(skill)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(AddSkillButton)
