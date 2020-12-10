import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Flex from "../../../components/shared/Flexboxes/Flex";
import MyTextField from "../../../components/shared/MyInputs/MyTextField";
import API from "../../../consts/API";
import { TagDto } from '../../../dtos/relearn/TagDto';
import * as relearnActions from "../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../store/store";
import myAxios from "../../../utils/myAxios";

const EditTagDialog = (props: Props) => {
  const handleSubmit = (tag: TagDto) => {
    myAxios
      .post<TagDto[]>(API.relearn.tag, tag)
      .then((res) => {
        props.setTags(res.data);
      })
      .finally(() => {
        props.closeTagDialog();
      });
  };

  return (
    <Dialog
      onClose={() => props.closeTagDialog()}
      open={!!props.editingTag}
      fullWidth
      maxWidth="xs"
      aria-labelledby="edit-tag-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={props.editingTag}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues);
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="edit-tag-dialog-title">
                Add Tag
              </DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    id="name"
                    name="name"
                    value={values.name}
                    inputProps={{ "aria-label": "tag-name-input" }}
                    
                    required
                    label="Tag Name"
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>

                
                <Flex mt={2}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>

                  <Box ml={1}>
                    <Button
                      onClick={() => props.closeTagDialog()}
                      variant="text"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Flex>
              </DialogContent>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  editingTag: state.relearn.editingTag,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeTagDialog: () => dispatch(relearnActions.closeTagDialog()),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(EditTagDialog);
