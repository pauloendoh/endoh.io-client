import { Box, Dialog, DialogContent } from "@mui/material"
import React from "react"
import { TagDto } from "../../../../../../../types/domain/relearn/TagDto"
import SkillbaseTable from "../../../../../../Skillbase/SkillTable/SkillbaseTable"

interface Props {
  tag: TagDto | null
  onClose: () => void
}

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

export default EditSkillsDialog
