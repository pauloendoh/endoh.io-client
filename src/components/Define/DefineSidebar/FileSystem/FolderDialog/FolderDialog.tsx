import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import SaveCancelButtons from "components/_UI/Buttons/SaveCancelButtons"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import useSaveFolderMutation from "hooks/react-query/folders/useSaveFolderMutation"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import useFolderDialogStore from "store/zustand/dialogs/useFolderDialogStore"
import FolderDto from "types/domain/folder/FolderDto"

const FolderDialog = () => {
  const { mutate, isLoading } = useSaveFolderMutation()

  const { initialValue, isOpen, closeDialog } = useFolderDialogStore()

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FolderDto>({
    defaultValues: initialValue,
  })

  useEffect(() => {
    if (isOpen && initialValue) reset(initialValue)
  }, [isOpen, initialValue])

  const onSubmit = (formData: FolderDto) => {
    mutate(formData, {
      onSuccess: closeDialog,
    })
  }

  return (
    <Dialog
      onClose={closeDialog}
      open={isOpen}
      fullWidth
      maxWidth="xs"
      aria-labelledby="folder-dialog"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="folder-dialog-title">
          {watch("id") ? "Edit folder" : "New folder"}
        </DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <MyTextField
                id="name"
                {...field}
                required
                size="small"
                label="Folder name"
                sx={{ mt: 1 }}
                fullWidth
                autoFocus
              />
            )}
          />
        </DialogContent>
        <DialogTitle>
          <SaveCancelButtons
            onEnabledAndCtrlEnter={handleSubmit(onSubmit)}
            disabled={isLoading}
            onCancel={closeDialog}
          />
        </DialogTitle>
      </form>
    </Dialog>
  )
}

export default FolderDialog
