import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Tooltip,
} from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import useConfirmTabClose from "hooks/utils/useConfirmTabClose"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { MdInfo } from "react-icons/md"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDialogsStore from "store/zustand/useDialogsStore"
import SaveCancelButtons from "../../../../../_UI/Buttons/SaveCancelButtons"
import MyTextField from "../../../../../_UI/MyInputs/MyTextField"
import DocSelector from "./DocSelector/DocSelector"

const QuestionDialog = () => {
  const { isOpen, onClose, onSubmit, initialValue } = useNoteDialogStore()

  const { handleSubmit, watch, reset, control, formState, setValue } = useForm({
    defaultValues: initialValue,
  })

  useEffect(() => {
    if (isOpen) reset(initialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useConfirmTabClose(isOpen && formState.isDirty)

  const openConfirmDialog = useDialogsStore((s) => s.openConfirmDialog)

  const handleConfirmClose = () => {
    if (!formState.isDirty) {
      onClose()
      return
    }

    openConfirmDialog({
      onConfirm: () => onClose(),
      title: "Discard changes?",
    })
  }

  return (
    <Dialog
      onClose={handleConfirmClose}
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
                    sx={{ mt: 1 }}
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
                onChange={(docId) =>
                  setValue("docId", docId, { shouldDirty: true })
                }
              />
            </Box>

            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={watch("toRefine")}
                    onChange={() =>
                      setValue("toRefine", !watch("toRefine"), {
                        shouldDirty: true,
                      })
                    }
                    name="toRefine"
                    color="primary"
                  />
                }
                label={
                  <FlexVCenter>
                    To refine
                    <Tooltip title="Improve this question's content later">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: 8,
                        }}
                      >
                        <MdInfo />
                      </div>
                    </Tooltip>
                  </FlexVCenter>
                }
              />
            </Box>
          </DialogContent>
          <DialogTitle>
            <SaveCancelButtons
              disabled={!formState.isDirty || formState.isSubmitting}
              onCancel={handleConfirmClose}
              onEnabledAndCtrlEnter={() => onSubmit(watch())}
            />
          </DialogTitle>
        </form>
      </Box>
    </Dialog>
  )
}

export default QuestionDialog
