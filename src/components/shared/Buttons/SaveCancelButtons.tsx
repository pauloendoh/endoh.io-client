import { Box, Button } from "@material-ui/core"
import React from "react"
import Flex from "../Flexboxes/Flex"

const SaveCancelButtons = (props: Props) => {
  return (
    <Flex>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        id="save-resource-button"
        disabled={props.disabled}
        onClick={props.onSave}
      >
        Save
      </Button>

      <Box ml={1}>
        <Button onClick={props.onCancel} variant="text">
          Cancel
        </Button>
      </Box>
    </Flex>
  )
}

interface Props {
  disabled?: boolean
  onSave?: () => void
  onCancel?: () => void
}

export default SaveCancelButtons
