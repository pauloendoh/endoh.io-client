import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material"
import { Form, Formik } from "formik"
import { useLogout } from "hooks/auth/useLogout"
import { useAxios } from "hooks/utils/useAxios"
import { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { ApplicationState } from "../../../../../store/store"
import MyAxiosError, { MyFieldError } from "../../../../../types/MyAxiosError"
import { UserDeleteDto } from "../../../../../types/domain/auth/UserDeleteDto"
import Flex from "../../../../_UI/Flexboxes/Flex"
import FlexHCenter from "../../../../_UI/Flexboxes/FlexHCenter"
import MyTextField from "../../../../_UI/MyInputs/MyTextField"

const DeleteAccountDialog = (props: Props) => {
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[])

  const { setSuccessMessage } = useSnackbarStore()
  const dialogStore = useConfirmDialogStore()

  const handleClose = () => {
    setResponseErrors([])
    props.onClose()
  }

  const logout = useLogout(props.dispatch)

  const axios = useAxios()

  const handleSubmit = (
    values: UserDeleteDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    dialogStore.openConfirmDialog({
      title: "Do you really want to delete your account?",
      onConfirm: () => {
        setSubmitting(true)

        setResponseErrors([])

        axios
          .delete(urls.api.auth.index, {
            headers: {},
            data: values,
          })
          .then((res) => {
            setSuccessMessage("Account delete successfully! Logging out...")
            logout()

            // handleClose()
          })
          .catch((err: MyAxiosError) => {
            setResponseErrors(err.response?.data.errors || [])
          })
          .finally(() => {
            setSubmitting(false)
          })
      },
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
          initialValues={{
            password: "",
          }}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues, setSubmitting)
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
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  // editingTag: state.relearn.editingTag,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
})

interface OwnProps {
  open: boolean
  onClose: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccountDialog)
