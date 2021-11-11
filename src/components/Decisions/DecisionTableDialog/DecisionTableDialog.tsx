import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useSaveTableMutation from "../../../hooks/BigDecisions/DecisionTable/useSaveTableMutation";
import { DecisionTableDto } from "../../../types/domain/big-decisions/DecisionTableDto";
import SaveCancelButtons from "../../_UI/Buttons/SaveCancelButtons";
import MyTextField from "../../_UI/MyInputs/MyTextField";

interface Props {
  open: boolean;
  initialValue: DecisionTableDto;
  onClose: () => void;
  afterSave?: (returned: DecisionTableDto) => void;
}

const DecisionTableDialog = (props: Props) => {
  const handleClose = () => {
    props.onClose();
  };

  const { mutate: changeTable } = useSaveTableMutation();
  const onSubmit = (values: DecisionTableDto) => {
    changeTable(values, {
      onSuccess: (_) => {
        handleClose();
      },
    });
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
    reset,
  } = useForm<DecisionTableDto>({
    defaultValues: props.initialValue,
  });

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
      aria-labelledby="decision-table-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="decision-table-dialog-title">
            {watch("id") ? "Edit Table" : "New Table"}
          </DialogTitle>
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
                    fullWidth
                    required
                    autoFocus
                    onCtrlEnter={handleSubmit(onSubmit)}
                    multiline
                    {...field}
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogTitle>
            <SaveCancelButtons disabled={isSubmitting} onCancel={handleClose} />
          </DialogTitle>
        </form>
      </Box>
    </Dialog>
  );
};

export default DecisionTableDialog;
