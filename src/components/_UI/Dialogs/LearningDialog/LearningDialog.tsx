import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { upsert } from "endoh-utils"
import {
  Learning,
  LearningsQuery,
  useAddLearningMutation,
  useLearningsQuery,
} from "generated/graphql"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import buildGraphqlClient from "utils/consts/buildGraphqlClient"
import SaveCancelButtons from "../../Buttons/SaveCancelButtons"
import MyTextField from "../../MyInputs/MyTextField"

const ariaLabel = "learning-dialog"

interface Props {
  isOpen: boolean

  initialValue: Learning
  onClose: () => void
}

const LearningDialog = (props: Props) => {
  const handleClose = () => {
    props.onClose()
  }

  const { reset, handleSubmit, formState, control, watch, setFocus, setValue } =
    useForm({
      defaultValues: props.initialValue,
    })

  useEffect(() => {
    if (props.isOpen) {
      reset(props.initialValue)

      setTimeout(() => {
        setFocus("description")
      }, 100)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen])

  const qc = useQueryClient()

  const { mutate: mutateAddLearning, isLoading: isAdding } =
    useAddLearningMutation(buildGraphqlClient(), {})

  const onSubmit = (values: Learning) => {
    mutateAddLearning(
      {
        input: values,
      },
      {
        onSuccess: (data) => {
          qc.setQueryData<LearningsQuery>(
            useLearningsQuery.getKey(),
            (curr) => {
              return {
                ...curr,
                learnings: upsert(
                  curr.learnings,
                  data.addLearning as Learning,
                  (l) => l.id === data.addLearning.id
                ),
              }
            }
          )

          handleClose()
        },
      }
    )
  }

  return (
    <Dialog onClose={handleClose} open={props.isOpen} fullWidth maxWidth="xs">
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id={`${ariaLabel}-title`}>Add Learning</DialogTitle>
          <DialogContent>
            <FlexVCenter gap={2}>
              <Controller
                control={control}
                name="description"
                render={({ field: { ref, ...field } }) => (
                  <MyTextField
                    size="small"
                    label="Description"
                    fullWidth
                    inputRef={ref}
                    sx={{ mt: 1 }}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="points"
                render={({ field: { ref, ...field } }) => (
                  <MyTextField
                    size="small"
                    label="Points"
                    sx={{ mt: 1, width: 100 }}
                    type="number"
                    {...field}
                    onChange={(e) => {
                      setValue("points", parseInt(e.target.value) || 0)
                    }}
                  />
                )}
              />
            </FlexVCenter>
          </DialogContent>
          <DialogTitle>
            <SaveCancelButtons
              // isLoading={isLoading}
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

export default LearningDialog
