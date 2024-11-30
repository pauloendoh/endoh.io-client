import { makeStyles } from "@mui/styles"

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Theme,
} from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useNumberDialogStore } from "store/zustand/useNumberDialogStore"
import FlexCol from "../Flexboxes/FlexCol"
import FlexVCenter from "../Flexboxes/FlexVCenter"
import MyTextField from "../MyInputs/MyTextField"
import Txt from "../Text/Txt"

const NumberDialog = () => {
  const [value, setValue] = useState(0)

  const { isOpen, closeDialog, dialogValues: val } = useNumberDialogStore()

  const confirmAndClose = () => {
    closeDialog()
    val.onChange(value)
  }

  const classes = useStyles()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setValue(0)
      setTimeout(() => {
        inputRef.current?.select()
      }, 250)
    }
  }, [isOpen])
  return (
    <Dialog
      onClose={closeDialog}
      open={isOpen}
      fullWidth
      classes={{ paper: classes.dialog }}
      aria-labelledby="number-dialog"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          confirmAndClose()
        }
      }}
    >
      <Box pb={1} px={1}>
        <DialogTitle id="number-dialog-title">
          <Txt variant="h5">{val.title}</Txt>
        </DialogTitle>
        <DialogContent>
          <FlexCol gap={1}>
            {!!val.description && <Txt>{val.description}</Txt>}

            <MyTextField
              inputRef={inputRef}
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </FlexCol>
        </DialogContent>

        <DialogTitle justifyContent={"flex-end"} gap={1}>
          <FlexVCenter>
            <Button
              id="confirm-button"
              variant="contained"
              color="primary"
              size="small"
              onClick={confirmAndClose}
            >
              {!!val.confirmChangeButtonLabel?.length
                ? val.confirmChangeButtonLabel
                : "Save"}
            </Button>
            <Button size="small" onClick={closeDialog}>
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
    maxWidth: 300,
  },
}))

export default NumberDialog
