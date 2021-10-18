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
import { AuthChangePasswordPostDto } from "../../../../../interfaces/dtos/auth/AuthChangePasswordPostDto";
import MyAxiosError, {
  MyFieldError,
} from "../../../../../interfaces/MyAxiosError";
import { ApplicationState } from "../../../../../store/store";
import * as utilsActions from "../../../../../store/utils/utilsActions";
import API from "../../../../../utils/consts/API";
import myAxios from "../../../../../utils/consts/myAxios";

const ChangePasswordDialog = (props: Props) => {
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[]);

  const handleClose = () => {
    setResponseErrors([]);
    props.onClose();
  };

  const handleSubmit = (
    values: AuthChangePasswordPostDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);

    if (values.newPassword !== values.newPassword2) {
      setResponseErrors([
        { field: "password", message: "Passwords don't match" },
      ]);
      setSubmitting(false);
      return;
    }

    myAxios
      .post(API.auth.authPasswordChange, values)
      .then((res) => {
        props.setSuccessMessage("Password changed successfully!");
        handleClose();
      })
      .catch((err: MyAxiosError) => {
        setResponseErrors(err.response.data.errors);
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
      aria-labelledby="delete-account-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={
            {
              oldPassword: "",
              newPassword: "",
              newPassword2: "",
            } as AuthChangePasswordPostDto
          }
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues, setSubmitting);
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="change-password-dialog-title">
                Change Password
              </DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    id="oldPassword"
                    type="password"
                    onChange={handleChange}
                    size="small"
                    label="Current password"
                    className="mt-3"
                    fullWidth
                    required
                    autoFocus
                    InputLabelProps={{ required: false }}
                  />
                </Box>

                <Box mt={1}>
                  <MyTextField
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    onChange={handleChange}
                    label="New password"
                    className="mt-3"
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                  />
                </Box>

                <Box mt={1}>
                  <MyTextField
                    id="newPassword2"
                    name="newPassword2"
                    type="password"
                    onChange={handleChange}
                    label="Confirm new password"
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
                    id="save-resource-button"
                    disabled={isSubmitting}
                  >
                    Save
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
)(ChangePasswordDialog);
