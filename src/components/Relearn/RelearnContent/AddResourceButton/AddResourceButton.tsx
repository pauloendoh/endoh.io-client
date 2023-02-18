import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button } from "@mui/material"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import { newResourceDto } from "types/domain/relearn/ResourceDto"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"

// PE 2/3 - I won't use this in the future, probably.
function AddResourceButton() {
  const { setEditingResource } = useRelearnStore()

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setEditingResource(newResourceDto())}
      id="add-resource-button"
      style={{ width: 130 }}
    >
      <FlexVCenter>
        <FontAwesomeIcon icon={faPlus} />
        <Box ml={1}>Add Resource</Box>
      </FlexVCenter>
    </Button>
  )
}

export default AddResourceButton
