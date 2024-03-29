import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material"
import { AxiosError } from "axios"
import { Form, Formik } from "formik"
import { useAxios } from "hooks/utils/useAxios"
import { useState } from "react"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { MyFieldError } from "../../../../../types/MyAxiosError"
import { AuthChangePasswordPostDto } from "../../../../../types/domain/auth/AuthChangePasswordPostDto"
import Flex from "../../../../_UI/Flexboxes/Flex"
import FlexHCenter from "../../../../_UI/Flexboxes/FlexHCenter"
import MyTextField from "../../../../_UI/MyInputs/MyTextField"

interface Props {
  open: boolean
  onClose: () => void
}

const ChangePasswordDialog = (props: Props) => {
  const { setSuccessMessage } = useSnackbarStore()

  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[])

  const axios = useAxios()

  const handleClose = () => {
    setResponseErrors([])
    props.onClose()
  }

  const handleSubmit = (
    values: AuthChangePasswordPostDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true)

    if (values.newPassword !== values.newPassword2) {
      setResponseErrors([
        { field: "password", message: "Passwords don't match" },
      ])
      setSubmitting(false)
      return
    }

    axios
      .post(urls.api.auth.authPasswordChange, values)
      .then((res) => {
        setSuccessMessage("Password changed successfully!")
        handleClose()
      })
      .catch((err: AxiosError<{ message: string }>) => {
        setResponseErrors([
          { field: "password", message: err.response?.data.message || "" },
        ])
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

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
            handleSubmit(formikValues, setSubmitting)
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
                    sx={{ mt: 1 }}
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
  )
}

export default ChangePasswordDialog
