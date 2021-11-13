import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import useDocsStore from "store/zustand/domain/useDocsStore";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import { DocDto } from "../../../types/domain/define/DocDto";
import apiUrls from "../../../utils/consts/apiUrls";
import myAxios from "../../../utils/consts/myAxios";
import SaveCancelButtons from "../../_UI/Buttons/SaveCancelButtons";
import MyTextField from "../../_UI/MyInputs/MyTextField";

interface Props {
  open: boolean;
  docId?: number;
  initialValue: string;
  onClose: () => void;
  afterSave?: (doc: DocDto) => void;
}

const DocTitleDialog = (props: Props) => {
  const docsStore = useDocsStore();

  const handleClose = () => {
    props.onClose();
  };

  const { setSuccessMessage } = useSnackbarStore();
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
      .post<DocDto>(apiUrls.define.doc, obj)
      .then((res) => {
        docsStore.pushOrReplaceDoc(res.data);
        setSuccessMessage("Doc saved!");

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

export default DocTitleDialog;
