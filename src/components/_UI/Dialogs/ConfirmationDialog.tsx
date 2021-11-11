import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import useDialogsStore from "../../../store/zustand/useDialogsStore";
import Txt from "../Text/Txt";
import S from "./ConfirmationDialog.styles";

const ConfirmationDialog = () => {
  const {
    confirmDialogIsOpen,
    closeConfirmDialog,
    confirmDialogValue: val,
  } = useDialogsStore();

  const confirmAndClose = () => {
    closeConfirmDialog();
    val.onConfirm();
  };

  const classes = useStyles();

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
          confirmAndClose();
        }
      }}
    >
      <Box pb={1} px={1}>
        <DialogTitle id="confirm-dialog-title">
          <Txt variant="h5">{val.title}</Txt>
        </DialogTitle>
        {val.description?.length > 0 && (
          <DialogContent>
            <Txt>{val.description}</Txt>
          </DialogContent>
        )}

        <DialogTitle>
          <S.ButtonsWrapper>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={confirmAndClose}
            >
              {val.confirmText?.length > 0 ? val.confirmText : "Yes"}
            </Button>
            <Button size="small" onClick={closeConfirmDialog}>
              Cancel
            </Button>
          </S.ButtonsWrapper>
        </DialogTitle>
      </Box>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
    top: 75,
  },
}));

export default ConfirmationDialog;
