import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import FlexVCenter from "../../../../../../../components/shared/Flexboxes/FlexVCenter"
import PATHS from "../../../../../../../consts/PATHS"
import { SkillDto } from "../../../../../../../dtos/skillbase/SkillDto"
import { TagDto } from "../../../../../../../interfaces/dtos/relearn/TagDto"
import { ApplicationState } from "../../../../../../../store/store"
import SkillbaseTable from "../../../../../../SkillbasePage/SkillTable/SkillbaseTable"
import SkillbaseTableRow from "../../../../../../SkillbasePage/SkillTable/SkillbaseTableRow/SkillbaseTableRow"
import SkillTableToolbar from "../../../../../../SkillbasePage/SkillTable/SkillTableToolbar/SkillTableToolbar"

// PE 2/3
function EditSkillsDialog(props: Props) {
  return (
    <Dialog
      onClose={props.onClose}
      open={!!props.tag}
      fullWidth
      maxWidth="md"
      aria-labelledby="edit-skills-dialog"
    >
      {props.tag && (
        <React.Fragment>
          <DialogContent style={{ padding: 0 }}>
            <Box width="100%">
              <SkillbaseTable fixedTag={props.tag} tag={props.tag} />
            </Box>
          </DialogContent>
        </React.Fragment>
      )}
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  allSkills: state.skillbase.skills,
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  tag: TagDto
  onClose: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(EditSkillsDialog)
