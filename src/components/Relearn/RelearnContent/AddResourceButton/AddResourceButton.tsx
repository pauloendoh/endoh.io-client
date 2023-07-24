import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button } from "@mui/material"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import { newResourceDto } from "types/domain/relearn/ResourceDto"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"

function AddResourceButton() {
  const { setInitialValue: setEditingResource } = useResourceDialogStore()

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setEditingResource(newResourceDto())}
      id="add-resource-button"
    >
      <FlexVCenter>
        <FontAwesomeIcon icon={faPlus} />
        <Box ml={1}>Add resource (q)</Box>
      </FlexVCenter>
    </Button>
  )
}

export default AddResourceButton
