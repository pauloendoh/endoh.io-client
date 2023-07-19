import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Theme,
  Tooltip,
  useMediaQuery,
} from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import FlexVCenterBetween from "components/_UI/Flexboxes/FlexVCenterBetween"
import useConfirmTabClose from "hooks/utils/useConfirmTabClose"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { MdInfo } from "react-icons/md"
import useDocDialogStore from "store/zustand/dialogs/useDocDialogStore"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import useSidebarStore from "store/zustand/useSidebarStore"
import SaveCancelButtons from "../../../../../_UI/Buttons/SaveCancelButtons"
import MyTextField from "../../../../../_UI/MyInputs/MyTextField"
import DocSelector from "./DocSelector/DocSelector"
import { useDefaultDeleteQuestion } from "./useDefaultDeleteQuestion/useDefaultDeleteQuestion"

const QuestionDialog = () => {
  const { isOpen: docDialogIsOpen } = useDocDialogStore()
  const {
    isOpen,
    onClose,
    onSubmit,
    initialValue,
    isSubmitting,
    customOnDelete,
  } = useNoteDialogStore()

  const { handleSubmit, watch, reset, control, formState, setValue } = useForm({
    defaultValues: initialValue,
  })

  const closeSidebar = useSidebarStore((s) => s.closeSidebar)
  const isSmallScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  )

  useEffect(() => {
    if (isOpen) reset(initialValue)

    if (isOpen && isSmallScreen) closeSidebar()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useConfirmTabClose(isOpen && formState.isDirty)

  const openConfirmDialog = useConfirmDialogStore((s) => s.openConfirmDialog)

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

  const defaultDeleteQuestion = useDefaultDeleteQuestion()

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
                    size="small"
                    label="Answer"
                    multiline
                    minRows={3}
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>

            <Flex mt={4} gap={2} flexWrap="wrap">
              <Box width={isSmallScreen ? "100%" : 220}>
                <DocSelector
                  docId={watch("docId")}
                  onChange={(docId) =>
                    setValue("docId", docId, { shouldDirty: true })
                  }
                />
              </Box>

              <MyTextField
                size="small"
                label={"Weight"}
                type="number"
                value={watch("weight")}
                onChange={(e) => {
                  const num = parseInt(e.target.value)
                  if (isNaN(num)) return

                  setValue("weight", num, {
                    shouldDirty: true,
                  })
                }}
                sx={{ width: 64 }}
              />

              <MyTextField
                size="small"
                label={"Tested"}
                type="number"
                value={watch("testedTimes")}
                onChange={(e) => {
                  const num = parseInt(e.target.value)
                  if (isNaN(num)) return

                  setValue("testedTimes", num, {
                    shouldDirty: true,
                  })
                }}
                sx={{ width: 64 }}
              />
            </Flex>

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
            <FlexVCenterBetween width="100%">
              <SaveCancelButtons
                disabled={!formState.isDirty || isSubmitting || !isOpen}
                isLoading={isSubmitting}
                onCancel={handleConfirmClose}
                onEnabledAndCtrlEnter={() => {
                  if (!docDialogIsOpen) {
                    onSubmit(watch())
                  }
                }}
                onEnableAndCtrlS={() => {
                  if (!docDialogIsOpen) {
                    onSubmit(watch())
                  }
                }}
              />

              {watch("id") && (
                <Button
                  color="error"
                  onClick={async () => {
                    if (customOnDelete) {
                      customOnDelete()
                      return
                    }

                    const id = watch("id")
                    if (id) {
                      defaultDeleteQuestion(id)
                    }
                  }}
                >
                  Delete
                </Button>
              )}
            </FlexVCenterBetween>
          </DialogTitle>
        </form>
      </Box>
    </Dialog>
  )
}

export default QuestionDialog
