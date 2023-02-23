import { LoadingButton } from "@mui/lab"
import { Box, Button, IconButton } from "@mui/material"
import { ReactNode } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { MdClose } from "react-icons/md"
import Flex from "../Flexboxes/Flex"

interface Props {
  submitButtonId?: string
  isLoading?: boolean
  disabled?: boolean
  onSave?: () => void
  onCancel?: () => void
  onEnabledAndCtrlEnter?: () => void
  onEnableAndCtrlS?: () => void
  showCancelAsIcon?: boolean
  saveButtonText?: ReactNode
}

const SaveCancelButtons = (props: Props) => {
  useHotkeys(
    "ctrl+enter",
    () => {
      if (!props.disabled && !props.isLoading && props.onEnabledAndCtrlEnter) {
        props.onEnabledAndCtrlEnter()
      }
    },
    {
      enableOnTags: ["INPUT", "SELECT", "TEXTAREA"],
    },
    [props]
  )

  useHotkeys(
    "ctrl+s",
    (e) => {
      e.preventDefault()
      if (!props.disabled && !props.isLoading && props.onEnableAndCtrlS) {
        props.onEnableAndCtrlS()
      }
    },
    {
      enableOnTags: ["INPUT", "SELECT", "TEXTAREA"],
    },
    [props]
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
        {props.saveButtonText || "Save"}
      </LoadingButton>

      <Box ml={1}>
        {props.showCancelAsIcon ? (
          <IconButton
            onClick={props.onCancel}
            color="inherit"
            sx={{ minWidth: "auto" }}
          >
            <MdClose />
          </IconButton>
        ) : (
          <Button onClick={props.onCancel} color="inherit">
            Cancel
          </Button>
        )}
      </Box>
    </Flex>
  )
}

export default SaveCancelButtons
