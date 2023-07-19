import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { upToNDecimals, upsert } from "endoh-utils"
import {
  Learning,
  LearningsQuery,
  useAddLearningMutation,
  useLearningsQuery,
  useUpdateLearningMutation,
} from "generated/graphql"
import { useEffect, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import buildGraphqlClient from "utils/consts/buildGraphqlClient"
import SaveCancelButtons from "../../Buttons/SaveCancelButtons"
import MyTextField from "../../MyInputs/MyTextField"
import LearningDescriptionAutocomplete from "./LearningDescriptionAutocomplete/LearningDescriptionAutocomplete"
import { ValidLearningInput } from "./types/ValidLearningInput"

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
    useForm<ValidLearningInput>({
      defaultValues: {
        ...props.initialValue,
        points: String(props.initialValue?.points),
      },
    })

  useEffect(() => {
    if (props.isOpen) {
      reset({
        ...props.initialValue,
        points: String(props.initialValue?.points),
      })

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen])

  const qc = useQueryClient()

  const { mutate: mutateAddLearning, isLoading: isAdding } =
    useAddLearningMutation(buildGraphqlClient(), {})

  const { mutate: mutateUpdateLearning, isLoading: isUpdating } =
    useUpdateLearningMutation(buildGraphqlClient(), {})

  const { setSuccessMessage } = useSnackbarStore()

  const onSubmit = (values: ValidLearningInput) => {
    const input = {
      points: Number(values.points),
      datetime: values.datetime,
      description: values.description,
      id: values.id,
      isHighlight: values.isHighlight,
    }

    const onSuccess = (data: Learning) => {
      qc.setQueryData<LearningsQuery>(useLearningsQuery.getKey(), (curr) => {
        return {
          ...curr,
          learnings: upsert(
            curr?.learnings,
            data as Learning,
            (l) => l.id === data.id
          ),
        }
      })
      handleClose()
      setSuccessMessage("Learning saved")

      setTimeout(() => {
        const tbody = document.querySelector("#learning-table-container")
        if (tbody) {
          tbody.scrollTop = tbody.scrollHeight
        }
      }, 100)
    }

    if (values.id) {
      mutateUpdateLearning(
        {
          input,
        },
        {
          onSuccess: (data) => {
            onSuccess(data.updateLearning)
          },
        }
      )
    }

    if (!values.id) {
      mutateAddLearning(
        {
          input,
        },
        {
          onSuccess: (data) => onSuccess(data.addLearning),
        }
      )
    }
  }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Dialog onClose={handleClose} open={props.isOpen} fullWidth maxWidth="xs">
      <Box pb={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id={`${ariaLabel}-title`}>
            {props.initialValue?.id ? "Edit learning" : "Add learning"}
          </DialogTitle>
          <DialogContent>
            <FlexVCenter gap={2}>
              <LearningDescriptionAutocomplete
                onChangeStringValue={(value) => {
                  setValue("description", value)
                }}
                onChangePoints={(value) => {
                  setValue("points", String(upToNDecimals(value)))
                }}
                stringValue={watch("description")}
                inputRef={inputRef}
              />

              <Controller
                control={control}
                name="points"
                render={({ field: { ref, ...field } }) => (
                  <MyTextField
                    size="small"
                    label="Points"
                    sx={{ mt: 1, width: 100 }}
                    error={!!formState.errors["points"]}
                    helperText={formState.errors["points"]?.message}
                    {...field}
                    onChange={(e) => {
                      const amount = e.target.value

                      if (amount.trim() === ".") {
                        setValue("points", "0.")
                        return
                      }

                      if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
                        setValue("points", amount)
                      }
                    }}
                  />
                )}
              />
            </FlexVCenter>
          </DialogContent>
          <DialogTitle>
            <SaveCancelButtons
              isLoading={isAdding || isUpdating}
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
