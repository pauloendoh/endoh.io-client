import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import SaveCancelButtons from "../../../components/shared/Buttons/SaveCancelButtons";
import MyTextField from "../../../components/shared/MyInputs/MyTextField";
import API from "../../../consts/API";
import myAxios from "../../../consts/myAxios";
import { DocDto } from "../../../dtos/define/DocDto";
import { addOrReplaceDoc } from "../../../store/define/defineActions";
import { ApplicationState } from "../../../store/store";
import * as utilsActions from "../../../store/utils/utilsActions";

const DocTitleDialog = (props: Props) => {
  const handleClose = () => {
    props.onClose();
  };

  const handleSubmit = (
    values: { title: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);

    const obj = {
      title: values.title,
      id: props.docId,
    };
    myAxios
      .post<DocDto>(API.define.doc, obj)
      .then((res) => {
        props.addOrReplaceDoc(res.data);
        props.setSuccessMessage("Doc saved!");

        props.afterSave(res.data);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="doc-title-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          enableReinitialize
          initialValues={{
            title: props.initialValue,
          }}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues, setSubmitting);
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="doc-title-dialog-title">Doc Title</DialogTitle>
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

const mapStateToProps = (state: ApplicationState) => ({
  // editingTag: state.relearn.editingTag,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addOrReplaceDoc: (doc: DocDto) => dispatch(addOrReplaceDoc(doc)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
});

interface OwnProps {
  open: boolean;
  docId?: number;
  initialValue: string;
  onClose: () => void;
  afterSave?: (doc: DocDto) => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocTitleDialog);
