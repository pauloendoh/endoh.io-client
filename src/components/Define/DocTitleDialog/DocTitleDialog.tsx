import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useDocsStore from "store/zustand/domain/useDocsStore";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import { DocDto } from "../../../types/domain/define/DocDto";
import myAxios from "../../../utils/consts/myAxios";
import apiUrls from "../../../utils/url/urls/apiUrls";
import SaveCancelButtons from "../../_UI/Buttons/SaveCancelButtons";
import MyTextField from "../../_UI/MyInputs/MyTextField";

interface Props {
  open: boolean;
  docId?: number;
  initialValue: { title: string };
  onClose: () => void;
  afterSave: (doc: DocDto) => void;
}

const DocTitleDialog = (props: Props) => {
  const docsStore = useDocsStore();

  const handleClose = () => {
    props.onClose();
  };

  const { setSuccessMessage } = useSnackbarStore();
  const onSubmit = (values: { title: string }) => {
    const obj = {
      title: values.title,
      id: props.docId,
    };
    myAxios.post<DocDto>(apiUrls.define.doc, obj).then((res) => {
      docsStore.pushOrReplaceDoc(res.data);
      setSuccessMessage("Doc saved!");

      if (props.afterSave) props.afterSave(res.data);
    });
  };

  const { reset, handleSubmit, formState, control } = useForm({
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
      aria-labelledby="doc-title-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="doc-title-dialog-title">Doc Title</DialogTitle>
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
            <SaveCancelButtons
              disabled={formState.isSubmitting}
              onCancel={handleClose}
            />
          </DialogTitle>
        </form>
      </Box>
    </Dialog>
  );
};

export default DocTitleDialog;
