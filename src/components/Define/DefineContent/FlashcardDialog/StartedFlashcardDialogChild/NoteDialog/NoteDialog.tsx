import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@material-ui/core"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import SaveCancelButtons from "../../../../../_UI/Buttons/SaveCancelButtons"
import MyTextField from "../../../../../_UI/MyInputs/MyTextField"
import DocSelector from "./DocSelector/DocSelector"

// PE 1/3 - transform into global dialog
const NoteDialog = () => {
  const { isOpen, onClose, onSubmit, initialValue } = useNoteDialogStore()

  const { handleSubmit, watch, reset, control, formState, setValue } = useForm({
    defaultValues: initialValue,
  })

  useEffect(() => {
    if (isOpen) reset(initialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      fullWidth
      maxWidth="xs"
      aria-labelledby="note-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    minRows={3}
                    className="mt-3"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>

            <Box mt={4} width={240}>
              <DocSelector
                docId={watch("docId")}
                onChange={(docId) => setValue("docId", docId)}
              />
            </Box>

            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={watch("toRefine")}
                    onChange={() => setValue("toRefine", !watch("toRefine"))}
                    name="toRefine"
                    color="primary"
                  />
                }
                label="To refine"
              />
            </Box>
          </DialogContent>
          <DialogTitle>
            <SaveCancelButtons
              disabled={formState.isSubmitting}
              onCancel={onClose}
              onEnabledAndCtrlEnter={() => onSubmit(watch())}
            />
          </DialogTitle>
        </form>
      </Box>
    </Dialog>
  )
}

export default NoteDialog
