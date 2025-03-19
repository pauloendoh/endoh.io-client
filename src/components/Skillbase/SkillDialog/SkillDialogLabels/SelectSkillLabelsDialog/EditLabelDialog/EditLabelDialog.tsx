import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material"
import SaveCancelButtons from "components/_UI/Buttons/SaveCancelButtons"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import Txt from "components/_UI/Text/Txt"
import useDeleteLabelMutation from "hooks/react-query/skillbase/labels/useDeleteLabelMutation"
import useSaveLabelMutation from "hooks/react-query/skillbase/labels/useSaveLabelMutation"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { MdClose, MdDelete } from "react-icons/md"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import { LabelDto } from "types/domain/skillbase/LabelDto"
import useSkillbaseStore from "../../../../../../store/zustand/domain/useSkillbaseStore"
import labelColors from "./labelColors"

interface Props {
  open: boolean
  skillId: number
  initialValue: LabelDto
  onClose: () => void
}

const EditLabelDialog = (props: Props) => {
  const handleClose = () => {
    props.onClose()
  }

  const { openConfirmDialog } = useConfirmDialogStore()
  const { mutate: saveLabel, isLoading } = useSaveLabelMutation()
  const { mutate: deleteLabel } = useDeleteLabelMutation()

  const {
    handleSubmit,

    control,
    watch,
    setValue,
    reset,
  } = useForm<LabelDto>({
    defaultValues: props.initialValue,
  })

  const onSubmit = (label: LabelDto) => {
    saveLabel(
      { payload: label, skillId: props.skillId },
      {
        onSuccess: props.onClose,
      }
    )
  }

  useEffect(() => {
    if (props.open) reset(props.initialValue)
  }, [props.open])

  const skills = useSkillbaseStore((s) => s.skills)
  const getLabelSkills = (labelId: number) =>
    skills.filter((s) => s.labels?.some((l) => l.id === labelId)) || []

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="edit-label-dialog"
      PaperProps={{ style: { maxWidth: 328 } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pb={1}>
          <DialogTitle id="edit-label-dialog-title">
            <FlexVCenter justifyContent="space-between">
              <Txt variant="h6">
                {" "}
                {watch("id") ? "Edit Label" : "New Label"}
              </Txt>
              <IconButton onClick={handleClose} size="small">
                <MdClose />
              </IconButton>
            </FlexVCenter>
          </DialogTitle>
          <DialogContent>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <MyTextField
                  id="name"
                  size="small"
                  label="Name"
                  sx={{ mt: 1 }}
                  fullWidth
                  required
                  autoFocus
                  {...field}
                  name="name"
                />
              )}
            />
            <Flex mt={1} style={{ flexWrap: "wrap", gap: 8 }}>
              {labelColors.map((color) => (
                <div
                  key={color}
                  onClick={() => setValue("bgColor", color)}
                  style={{
                    background: color,
                    width: 40,
                    height: 32,
                    borderRadius: 4,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {color === watch("bgColor") && (
                    <div style={{ color: "white" }}>✓</div>
                  )}
                </div>
              ))}
            </Flex>
          </DialogContent>
          <DialogTitle>
            <FlexVCenter justifyContent="space-between">
              <SaveCancelButtons
                disabled={isLoading}
                onCancel={props.onClose}
              />
              {watch("id") && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<MdDelete />}
                  onClick={() => {
                    openConfirmDialog({
                      title: "Delete Label",
                      description: `There are ${
                        getLabelSkills(watch("id") || 0).length
                      } skills with this label. They won't be deleted.`,
                      onConfirm: () => {
                        deleteLabel(
                          { labelId: watch("id") || 0, skillId: props.skillId },
                          { onSuccess: props.onClose }
                        )
                      },
                    })
                  }}
                >
                  Delete
                </Button>
              )}
            </FlexVCenter>
          </DialogTitle>
        </Box>
      </form>
    </Dialog>
  )
}

export default EditLabelDialog
