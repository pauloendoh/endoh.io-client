import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { QuestionDto } from "types/domain/questions/QuestionDto"
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

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (values: { title: string }) => {
    setIsLoading(true)

    const obj = {
      title: values.title,
      id: props.docId,
      folderId: props.initialValue.folderId,
    }
    axios
      .post<DocDto>(urls.api.define.doc, obj)
      .then((res) => {
        docsStore.pushOrReplaceDoc(res.data)
        setSuccessMessage("Doc saved!")

        docsStore.setIsLoadingNewDoc(true)
        queryClient.invalidateQueries([queryKeys.folders])
        myAxios
          .get<QuestionDto[]>(urls.api.define.questions)
          .then((res) => docsStore.setQuestions(res.data))
          .finally(() => docsStore.setIsLoadingNewDoc(false))

        if (props.afterSave) props.afterSave(res.data)
      })
      .finally(() => setIsLoading(false))
  }

  const { reset, handleSubmit, formState, control, watch } = useForm({
    defaultValues: props.initialValue,
  })

  useEffect(() => {
    if (props.open) reset(props.initialValue)
  }, [props.open])

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="deck-title-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="deck-title-dialog-title">Deck Title</DialogTitle>
          <DialogContent>
            <Box>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <MyTextField
                    id="title"
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
              isLoading={isLoading}
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
