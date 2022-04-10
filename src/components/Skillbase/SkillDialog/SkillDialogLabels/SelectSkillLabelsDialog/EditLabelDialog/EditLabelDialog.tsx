import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import SaveCancelButtons from "components/_UI/Buttons/SaveCancelButtons";
import Flex from "components/_UI/Flexboxes/Flex";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import MyTextField from "components/_UI/MyInputs/MyTextField";
import useDeleteLabelMutation from "hooks/react-query/skillbase/labels/useDeleteLabelMutation";
import useSaveLabelMutation from "hooks/react-query/skillbase/labels/useSaveLabelMutation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import useDialogsStore from "store/zustand/useDialogsStore";
import { LabelDto } from "types/domain/skillbase/LabelDto";
import labelColors from "./labelColors";

interface Props {
  open: boolean;
  skillId: number;
  initialValue: LabelDto;
  onClose: () => void;
  // afterSave?: (returned: DecisionDto) => void;
}

const EditLabelDialog = (props: Props) => {
  const handleClose = () => {
    props.onClose();
  };

  const { openConfirmDialog } = useDialogsStore();
  const { mutate, isLoading } = useSaveLabelMutation();
  const { mutate: deleteLabel } = useDeleteLabelMutation();

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
    setValue,
    reset,
  } = useForm<LabelDto>({
    defaultValues: props.initialValue,
  });

  const onSubmit = (values: LabelDto) => {
    mutate(values, {
      onSuccess: props.onClose,
    });
  };

  useEffect(() => {
    if (props.open) reset(props.initialValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

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
            {watch("id") ? "Edit Label" : "New Label"}
          </DialogTitle>
          <DialogContent>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <MyTextField
                  id="name"
                  name="name"
                  size="small"
                  label="Name"
                  className="mt-3"
                  fullWidth
                  required
                  autoFocus
                  {...field}
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
                      onConfirm: () => {
                        deleteLabel(
                          { labelId: watch("id"), skillId: props.skillId },
                          { onSuccess: props.onClose }
                        );
                      },
                    });
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
  );
};

export default EditLabelDialog;
