import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import usePostDecisionMutation from "../../../hooks/BigDecisions/Decision/usePostDecisionMutation";
import { DecisionDto } from "../../../types/domain/big-decisions/DecisionDto";
import pageUrls from "../../../utils/url/urls/pageUrls";
import SaveCancelButtons from "../../_UI/Buttons/SaveCancelButtons";
import MyTextField from "../../_UI/MyInputs/MyTextField";

interface Props {
  open: boolean;
  initialValue: DecisionDto;
  onClose: () => void;
  afterSave?: (returned: DecisionDto) => void;
}

const DecisionDialog = (props: Props) => {
  const history = useHistory();

  const { setSuccessMessage } = useSnackbarStore();

  const handleClose = () => {
    props.onClose();
  };

  const { mutate: postDecision } = usePostDecisionMutation();

  const onSubmit = (values: DecisionDto) => {
    postDecision(values, {
      onSuccess: (data) => {
        setSuccessMessage("Decision saved!");
        handleClose();
        history.push(pageUrls.BigDecisions.decision(data.id));
      },
    });
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
    reset,
  } = useForm<DecisionDto>({
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
      aria-labelledby="decision-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="decision-dialog-title">
            {watch("id") ? "Edit Decision" : "New Decision"}
          </DialogTitle>
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

export default DecisionDialog;
