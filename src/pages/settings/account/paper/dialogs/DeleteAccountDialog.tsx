import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Flex from "../../../../../components/shared/Flexboxes/Flex";
import FlexHCenter from "../../../../../components/shared/Flexboxes/FlexHCenter";
import MyTextField from "../../../../../components/shared/MyInputs/MyTextField";
import API from "../../../../../consts/API";
import myAxios from "../../../../../consts/myAxios";
import { UserDeleteDto } from "../../../../../interfaces/dtos/auth/UserDeleteDto";
import MyAxiosError, {
  MyFieldError,
} from "../../../../../interfaces/MyAxiosError";
import { logoutActionCreator } from "../../../../../store/auth/authActions";
import { ApplicationState } from "../../../../../store/store";
import * as utilsActions from "../../../../../store/utils/utilsActions";

const DeleteAccountDialog = (props: Props) => {
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[]);

  const handleClose = () => {
    setResponseErrors([]);
    props.onClose();
  };

  const handleSubmit = (
    values: UserDeleteDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (window.confirm("Do you really want to delete your account?")) {
      setSubmitting(true);

      setResponseErrors([]);

      myAxios
        .delete(API.auth.index, {
          headers: {},
          data: values,
        })
        .then((res) => {
          props.setSuccessMessage(
            "Account delete successfully! Logging out..."
          );
          props.logout();

          // handleClose()
        })
        .catch((err: MyAxiosError) => {
          setResponseErrors(err.response.data.errors);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="delete-account-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={{
            password: "",
          }}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues, setSubmitting);
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="delete-account-dialog-title">
                Delete Account
              </DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    id="password"
                    type="password"
                    onChange={handleChange}
                    size="small"
                    label="Current password"
                    className="mt-3"
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                  />
                </Box>

                <Flex mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    id="delete-account-button"
                    disabled={isSubmitting}
                  >
                    Delete
                  </Button>

                  <Box ml={1}>
                    <Button variant="text" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Box>
                </Flex>

                {responseErrors.map((err, i) => (
                  <FlexHCenter key={i} mt={1}>
                    <Typography color="error">{err.message}</Typography>
                  </FlexHCenter>
                ))}
              </DialogContent>
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
  logout: () => dispatch(logoutActionCreator(dispatch)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
});

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccountDialog);
