import { faArrowCircleRight, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, useTheme } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import Txt from "components/_UI/Text/Txt"
import useMultiSelectResource from "hooks/relearn/useMultiSelectResource"
import { useAxios } from "hooks/utils/useAxios"
import { useState } from "react"
import { MdDeleteForever } from "react-icons/md"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { urls } from "utils/urls"
import MoveResourcesToTagDialog from "./MoveResourcesToTagDialog/MoveResourcesToTagDialog"
// PE 2/3
const SelectedResourcesOptions = () => {
  const theme = useTheme()
  const { setResources } = useRelearnStore()

  const { openConfirmDialog } = useConfirmDialogStore()
  const { selectedResourceIds } = useRelearnStore()
  const { clearSelectedIds } = useMultiSelectResource()
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const [moveToTagDialog, setMoveToTagDialog] = useState(false)

  const axios = useAxios()

  const deleteResources = () => {
    axios
      .delete<ResourceDto[]>(urls.api.relearn.deleteManyResources, {
        data: {
          ids: selectedResourceIds,
        },
      })
      .then((res) => {
        setResources(res.data)
        clearSelectedIds()
        setSuccessMessage("Resources deleted!")
      })
      .catch(() => {
        setErrorMessage("Error while deleting resources!")
      })
  }

  return (
    <FlexVCenter my={2} justifyContent="space-between">
      <FlexVCenter style={{ gap: 24 }}>
        <Txt>{selectedResourceIds.length} selected</Txt>
        <Button onClick={() => setMoveToTagDialog(true)}>
          <FlexVCenter style={{ color: theme.palette.secondary.main, gap: 4 }}>
            <FontAwesomeIcon icon={faArrowCircleRight} />
            <Txt>Move to tag</Txt>
          </FlexVCenter>
        </Button>

        <Button
          onClick={() => {
            openConfirmDialog({
              title: "Delete resources",
              description: `Are you sure you want to delete ${selectedResourceIds.length} resource(s)?`,
              onConfirm: deleteResources,
            })
          }}
        >
          <FlexVCenter style={{ color: theme.palette.error.main, gap: 4 }}>
            <MdDeleteForever size={16} />
            <Txt>Delete</Txt>
          </FlexVCenter>
        </Button>
      </FlexVCenter>

      <Button variant="outlined" onClick={clearSelectedIds}>
        <FlexVCenter style={{ gap: 4 }}>
          <FontAwesomeIcon icon={faTimes} />
          <Txt>Unselect all</Txt>
        </FlexVCenter>
      </Button>
      <MoveResourcesToTagDialog
        resourceIds={selectedResourceIds}
        isOpen={moveToTagDialog}
        onClose={() => setMoveToTagDialog(false)}
      />
    </FlexVCenter>
  )
}

export default SelectedResourcesOptions
