import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import MyAxiosError from "types/MyAxiosError";
import apiUrls from "utils/consts/apiUrls";
import myAxios from "utils/consts/myAxios";
import { setUsername } from "../../../../../store/auth/authActions";
import { ApplicationState } from "../../../../../store/store";
import { UsernamePutDto } from "../../../../../types/domain/auth/UsernamePutDto";
import Flex from "../../../../_UI/Flexboxes/Flex";
import MyTextField from "../../../../_UI/MyInputs/MyTextField";

const EditUsernameDialog = (props: Props) => {
  const { handleSubmit, control, formState } = useForm<UsernamePutDto>({
    defaultValues: {
      newUsername: "",
    },
  });

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const submit = async (formData: UsernamePutDto) => {
    return myAxios
      .put(apiUrls.auth.username, formData)
      .then((res) => {
        setSuccessMessage("Username changed!");
        props.setUsername(formData.newUsername);
        props.onClose();
      })
      .catch((err: MyAxiosError) => {
        setErrorMessage(err.response.data.errors[0].message);
      });
  };

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="edit-username-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(submit)}>
          <DialogTitle id="edit-username-dialog-title">
            Edit Username
          </DialogTitle>

          <DialogContent>
            <Box>
              <Controller
                render={({ field }) => (
                  <MyTextField
                    {...field}
                    label="New username"
                    required
                    fullWidth
                    InputLabelProps={{ required: false }}
                  />
                )}
                control={control}
                name="newUsername"
              />
            </Box>

            <Flex mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                id="save-username-button"
                disabled={formState.isSubmitting}
              >
                Save
              </Button>

              <Box ml={1}>
                <Button variant="text" onClick={props.onClose}>
                  Cancel
                </Button>
              </Box>
            </Flex>
          </DialogContent>
        </form>
      </Box>
    </Dialog>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  // editingTag: state.relearn.editingTag,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUsername: (newUsername: string) => dispatch(setUsername(newUsername)),
});

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(EditUsernameDialog);
