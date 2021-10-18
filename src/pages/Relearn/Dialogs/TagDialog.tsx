import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import MyAxiosError from "types/MyAxiosError";
import PATHS from "utils/consts/PATHS";
import Flex from "../../../components/shared/Flexboxes/Flex";
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter";
import MyTextField from "../../../components/shared/MyInputs/MyTextField";
import * as relearnActions from "../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../store/store";
import * as utilsActions from "../../../store/utils/utilsActions";
import { TagDto } from "../../../types/domain/relearn/TagDto";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";
import TagColorSelector from "./TagColorSelector/TagColorSelector";

// PE 2/3
const TagDialog = (props: Props) => {
  const history = useHistory();

  const handleSubmit = (sentTag: TagDto) => {
    myAxios
      .post<TagDto[]>(API.relearn.tag, sentTag)
      .then((res) => {
        props.setSuccessMessage("Tag saved!");

        const returnedTags = res.data;
        props.setTags(returnedTags);

        const savedTagId = returnedTags.find((t) => t.name === sentTag.name).id;

        history.push(PATHS.relearn.tag + "/" + savedTagId);
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message);
      })
      .finally(() => {
        props.closeTagDialog();
      });
  };

  return (
    <Dialog
      onClose={() => {
        props.closeTagDialog();
      }}
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
          {({ values, isSubmitting, setFieldValue, handleChange }) => (
            <Form>
              <DialogTitle id="edit-tag-dialog-title">
                {values.id ? "Edit Tag" : "Add Tag"}
              </DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    data-testid="tag-name-input"
                    id="name"
                    name="name"
                    value={values.name}
                    inputProps={{ "aria-label": "tag-name-input" }}
                    required
                    label="Tag Name"
                    onChange={handleChange}
                    fullWidth
                    autoFocus
                  />
                </Box>

                <Box mt={2}>
                  {/*  */}
                  <TagColorSelector
                    value={values.color}
                    onChange={(newValue) => {
                      setFieldValue("color", newValue);
                    }}
                  />
                </Box>

                <FlexVCenter>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.isPrivate}
                        onChange={() => {
                          setFieldValue("isPrivate", !values.isPrivate);
                        }}
                        color="primary"
                      />
                    }
                    label="Private tag"
                  />
                </FlexVCenter>

                <Flex mt={4}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    id="save-tag-button"
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

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(TagDialog);
