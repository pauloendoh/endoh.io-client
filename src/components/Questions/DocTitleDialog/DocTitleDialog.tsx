import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material"
import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { NoteDto } from "types/domain/questions/NoteDto"
import { urls } from "utils/urls"
import { DocDto } from "../../../types/domain/questions/DocDto"
import SaveCancelButtons from "../../_UI/Buttons/SaveCancelButtons"
import MyTextField from "../../_UI/MyInputs/MyTextField"

interface Props {
  open: boolean
  docId?: number
  initialValue: { title: string; folderId?: number }
  onClose: () => void
  afterSave: (doc: DocDto) => void
}

const DocTitleDialog = (props: Props) => {
  const docsStore = useDocsStore()

  const myAxios = useAxios()

  const handleClose = () => {
    props.onClose()
  }

  const { setSuccessMessage } = useSnackbarStore()

  const queryClient = useQueryClient()

  const axios = useAxios()

  const onSubmit = (values: { title: string }) => {
    const obj = {
      title: values.title,
      id: props.docId,
      folderId: props.initialValue.folderId,
    }
    axios.post<DocDto>(urls.api.define.doc, obj).then((res) => {
      docsStore.pushOrReplaceDoc(res.data)
      setSuccessMessage("Doc saved!")

      docsStore.setIsLoadingNewDoc(true)
      queryClient.invalidateQueries(queryKeys.folders)
      myAxios
        .get<NoteDto[]>(urls.api.define.note)
        .then((res) => docsStore.setNotes(res.data))
        .finally(() => docsStore.setIsLoadingNewDoc(false))

      if (props.afterSave) props.afterSave(res.data)
    })
  }

  const { reset, handleSubmit, formState, control, watch } = useForm({
    defaultValues: props.initialValue,
  })

  useEffect(() => {
    if (props.open) reset(props.initialValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="doc-title-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="doc-title-dialog-title">Doc Title</DialogTitle>
          <DialogContent>
            <Box>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <MyTextField
                    id="title"
                    name="title"
                    size="small"
                    label="Title"
                    className="mt-3"
                    fullWidth
                    required
                    autoFocus
                    sx={{ mt: 1 }}
                    {...field}
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogTitle>
            <SaveCancelButtons
              disabled={formState.isSubmitting}
              onCancel={handleClose}
              onEnabledAndCtrlEnter={() => {
                onSubmit(watch())
              }}
            />
          </DialogTitle>
        </form>
      </Box>
    </Dialog>
  )
}

export default DocTitleDialog
