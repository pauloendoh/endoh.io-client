import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import SaveCancelButtons from "../../../components/shared/Buttons/SaveCancelButtons";
import MyTextField from "../../../components/shared/MyInputs/MyTextField";
import useSaveTableMutation from "../../../hooks/BigDecisions/DecisionTable/useSaveTableMutation";
import { DecisionTableDto } from "../../../types/domain/big-decisions/DecisionTableDto";

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
  const handleSubmit = (values: DecisionTableDto) => {
    changeTable(values, {
      onSuccess: (_) => {
        handleClose();
      },
    });
  };

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="decision-table-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          enableReinitialize
          initialValues={props.initialValue}
          onSubmit={(formikValues) => {
            handleSubmit(formikValues);
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="decision-table-dialog-title">
                {values.id ? "Edit Table" : "New Table"}
              </DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    size="small"
                    label="Title"
                    className="mt-3"
                    fullWidth
                    required
                    autoFocus
                  />
                </Box>
              </DialogContent>
              <DialogTitle>
                <SaveCancelButtons
                  disabled={isSubmitting}
                  onCancel={handleClose}
                />
              </DialogTitle>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export default DecisionTableDialog;
