import { makeStyles } from "@mui/styles"

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Theme,
} from "@mui/material"
import useConfirmDialogStore from "../../../store/zustand/useConfirmDialogStore"
import FlexVCenter from "../Flexboxes/FlexVCenter"
import Txt from "../Text/Txt"

const ConfirmationDialog = () => {
  const {
    confirmDialogIsOpen,
    closeConfirmDialog,
    confirmDialogValue: val,
  } = useConfirmDialogStore()

  const confirmAndClose = () => {
    closeConfirmDialog()
    val.onConfirm()
  }

  const classes = useStyles()

  return (
    <Dialog
      onClose={closeConfirmDialog}
      open={confirmDialogIsOpen}
      fullWidth
      classes={{ paper: classes.dialog }}
      maxWidth="xs"
      aria-labelledby="confirm-dialog"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          confirmAndClose()
        }
      }}
    >
      <Box pb={1} px={1}>
        <DialogTitle id="confirm-dialog-title">
          <Txt variant="h5">{val.title}</Txt>
        </DialogTitle>
        {!!val.description?.length && (
          <DialogContent>
            <Txt>{val.description}</Txt>
          </DialogContent>
        )}

        <DialogTitle justifyContent={"flex-end"} gap={1}>
          <FlexVCenter>
            <Button
              id="confirm-button"
              variant="contained"
              color="primary"
              size="small"
              onClick={confirmAndClose}
            >
              {!!val.confirmText?.length ? val.confirmText : "Yes"}
            </Button>
            <Button size="small" onClick={closeConfirmDialog}>
              Cancel
            </Button>
          </FlexVCenter>
        </DialogTitle>
      </Box>
    </Dialog>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  dialog: {
    position: "absolute",
    top: 75,
  },
}))

export default ConfirmationDialog
