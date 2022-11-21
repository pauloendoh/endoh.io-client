import { LoadingButton } from "@mui/lab"
import { Box, Button } from "@mui/material"
import { useHotkeys } from "react-hotkeys-hook"
import Flex from "../Flexboxes/Flex"

interface Props {
  submitButtonId?: string
  isLoading?: boolean
  disabled?: boolean
  onSave?: () => void
  onCancel?: () => void
  onEnabledAndCtrlEnter?: () => void
}

const SaveCancelButtons = (props: Props) => {
  useHotkeys(
    "Ctrl+Enter",
    () => {
      if (!props.disabled && props.onEnabledAndCtrlEnter) {
        props.onEnabledAndCtrlEnter()
      }
    },
    {
      enableOnTags: ["INPUT", "SELECT", "TEXTAREA"],
    }
  )

  return (
    <Flex>
      <LoadingButton
        loading={props.isLoading}
        type="submit"
        variant="contained"
        color="primary"
        id={props.submitButtonId}
        disabled={props.disabled || props.isLoading}
        onClick={props.onSave}
      >
        Save
      </LoadingButton>

      <Box ml={1}>
        <Button onClick={props.onCancel} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Flex>
  )
}

export default SaveCancelButtons
