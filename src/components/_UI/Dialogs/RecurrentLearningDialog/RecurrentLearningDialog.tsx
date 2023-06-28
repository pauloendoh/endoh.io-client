import { classValidatorResolver } from "@hookform/resolvers/class-validator"

import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { RecurrentLearningDto } from "hooks/react-query/learning-diary/recurrent-learning/types/RecurrentLearningDto"
import { useSaveRecurrentLearningMutation } from "hooks/react-query/learning-diary/recurrent-learning/useSaveRecurrentLearningMutation"
import { useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useRecurrentLearningDialogStore from "store/zustand/dialogs/useRecurrentLearningDialogStore"
import SaveCancelButtons from "../../Buttons/SaveCancelButtons"
import MyTextField from "../../MyInputs/MyTextField"

const ariaLabel = "recurrent-learning-dialog"

interface Props {
  isOpen: boolean
  initialValue: RecurrentLearningDto
  onClose: () => void
}

const RecurrentLearningDialog = (props: Props) => {
  const handleClose = () => {
    props.onClose()
  }

  const isLoading = useMemo(() => {
    return false
  }, [])

  const resolver = classValidatorResolver(RecurrentLearningDto)
  const { reset, handleSubmit, formState, control, watch, setFocus } = useForm({
    defaultValues: props.initialValue,
    resolver,
  })

  const [stringPoints, setStringPoints] = useState<string>("")

  const { mutate: submitSave } = useSaveRecurrentLearningMutation()

  useEffect(() => {
    if (props.isOpen) {
      reset(props.initialValue)
      setStringPoints(String(props.initialValue?.points))

      setTimeout(() => {
        setFocus("description")
      }, 100)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen])

  const { onSuccess } = useRecurrentLearningDialogStore()

  const onSubmit = (values: RecurrentLearningDto) => {
    const input = {
      ...values,
      points: Number(stringPoints),
    }

    submitSave(input, {
      onSuccess: (saved) => {
        handleClose()

        if (onSuccess) {
          onSuccess(saved)
        }
      },
    })
  }

  return (
    <Dialog
      onClose={handleClose}
      open={props.isOpen}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          maxWidth: 300,
        },
      }}
    >
      <Box pb={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id={`${ariaLabel}-title`}>
            {props.initialValue?.id
              ? "Edit recurrent learning"
              : "Add recurrent learning"}
          </DialogTitle>
          <DialogContent>
            <FlexVCenter gap={2}>
              <Controller
                control={control}
                name="description"
                render={({ field: { ref, ...field } }) => (
                  <MyTextField
                    size="small"
                    placeholder="e.g. 15 min of resting"
                    fullWidth
                    inputRef={ref}
                    sx={{ mt: 1 }}
                    error={!!formState.errors["description"]}
                    helperText={formState.errors["description"]?.message}
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
                    error={!!formState.errors["points"]}
                    helperText={formState.errors["points"]?.message}
                    {...field}
                    value={stringPoints}
                    onChange={(e) => {
                      const amount = e.target.value

                      if (amount.trim() === ".") {
                        setStringPoints("0.")
                        return
                      }
                      if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
                        setStringPoints(amount)
                      }
                    }}
                  />
                )}
              />
            </FlexVCenter>
          </DialogContent>
          <DialogTitle>
            <SaveCancelButtons
              saveButtonText="Save recurrent learning"
              isLoading={isLoading}
              disabled={isLoading}
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

export default RecurrentLearningDialog
