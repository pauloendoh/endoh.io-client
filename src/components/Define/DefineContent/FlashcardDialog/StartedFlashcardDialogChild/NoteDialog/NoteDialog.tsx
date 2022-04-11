import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { NoteDto } from "../../../../../../types/domain/define/NoteDto";
import SaveCancelButtons from "../../../../../_UI/Buttons/SaveCancelButtons";
import MyTextField from "../../../../../_UI/MyInputs/MyTextField";

interface Props {
  open: boolean;
  initialValue: NoteDto;
  onClose: () => void;
  onSubmit: (newValue: NoteDto) => void;
}

const NoteDialog = (props: Props) => {
  const { handleSubmit, watch, reset, control, formState } = useForm({
    defaultValues: props.initialValue,
  });

  useEffect(() => {
    if (props.open) reset(props.initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="note-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(props.onSubmit)}>
          <DialogTitle id="note-dialog-title">
            {watch("id") ? "Edit Question" : "New Question"}
          </DialogTitle>
          <DialogContent>
            <Box>
              <Controller
                control={control}
                name="question"
                render={({ field }) => (
                  <MyTextField
                    id="question"
                    name="question"
                    size="small"
                    label="Question"
                    multiline
                    className="mt-3"
                    fullWidth
                    required
                    autoFocus
                    {...field}
                  />
                )}
              />
            </Box>

            <Box mt={2}>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <MyTextField
                    id="description"
                    name="description"
                    size="small"
                    label="Answer"
                    multiline
                    className="mt-3"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogTitle>
            <SaveCancelButtons
              disabled={formState.isSubmitting}
              onCancel={props.onClose}
            />
          </DialogTitle>
        </form>
      </Box>
    </Dialog>
  );
};

export default NoteDialog;
