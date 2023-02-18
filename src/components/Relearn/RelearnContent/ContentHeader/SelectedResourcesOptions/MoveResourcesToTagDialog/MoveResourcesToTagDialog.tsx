import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material"
import SkillDialogTagSelector from "components/Skillbase/SkillDialog/SkillDialogTagSelector/SkillDialogTagSelector"
import SaveCancelButtons from "components/_UI/Buttons/SaveCancelButtons"
import useMultiSelectResource from "hooks/relearn/useMultiSelectResource"
import { useAxios } from "hooks/utils/useAxios"
import { useState } from "react"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { urls } from "utils/urls"

type Props = {
  resourceIds: number[]
  isOpen: boolean
  onClose: () => void
}

// PE 2/3
const MoveResourcesToTagDialog = (props: Props) => {
  const [selectedTagId, setSelectedTagId] = useState<number>(null)
  const { clearSelectedIds } = useMultiSelectResource()
  const [submitting, setSubmitting] = useState(false)
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()
  const { setResources } = useRelearnStore()

  const axios = useAxios()

  const handleSubmit = () => {
    setSubmitting(true)
    axios
      .put<ResourceDto[]>(urls.api.relearn.resourceMoveToTag, {
        resourceIds: props.resourceIds,
        toTagId: selectedTagId,
      })
      .then((res) => {
        setResources(res.data)
        props.onClose()
        clearSelectedIds()
        setSuccessMessage("Resources saved!")
      })
      .catch(() => {
        setErrorMessage("Error while failing resources!")
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <Dialog
      onClose={props.onClose}
      open={props.isOpen}
      fullWidth
      maxWidth="xs"
      aria-labelledby="move-resources-to-tag-dialog"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <DialogTitle id="move-resources-to-tag-dialog-title">
          Move resources to tag
        </DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <SkillDialogTagSelector
              selectedTagId={selectedTagId}
              onChange={(_, tagId) => setSelectedTagId(tagId)}
              required
            />
          </Box>
        </DialogContent>
        <DialogTitle>
          <SaveCancelButtons disabled={submitting} onCancel={props.onClose} />
        </DialogTitle>
      </form>
    </Dialog>
  )
}

export default MoveResourcesToTagDialog
