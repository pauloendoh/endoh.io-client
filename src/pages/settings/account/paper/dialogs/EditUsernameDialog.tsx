import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../../../components/shared/Flexboxes/Flex"
import FlexHCenter from "../../../../../components/shared/Flexboxes/FlexHCenter"
import MyTextField from "../../../../../components/shared/MyInputs/MyTextField"
import API from "../../../../../consts/API"
import MY_AXIOS from "../../../../../consts/MY_AXIOS"
import { UsernamePutDto } from "../../../../../interfaces/dtos/auth/UsernamePutDto"
import MyAxiosError, {
  MyFieldError,
} from "../../../../../interfaces/MyAxiosError"
import {
  logoutActionCreator,
  setUsername,
} from "../../../../../store/auth/authActions"
import { ApplicationState } from "../../../../../store/store"
import * as utilsActions from "../../../../../store/utils/utilsActions"

const EditUsernameDialog = (props: Props) => {
  const classes = useStyles()

  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[])

  const handleClose = () => {
    setResponseErrors([])
    props.onClose()
  }

  const handleSubmit = (
    values: UsernamePutDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true)

    setResponseErrors([])

    MY_AXIOS.put(API.auth.username, values)
      .then((res) => {
        props.setSuccessMessage("Username changed!")

        props.setUsername(values.newUsername)

        handleClose()
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message)
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
      aria-labelledby="edit-username-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={
            {
              newUsername: "",
            } as UsernamePutDto
          }
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues, setSubmitting)
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="edit-username-dialog-title">
                Edit Username
              </DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    id="newUsername"
                    onChange={handleChange}
                    size="small"
                    label="New username"
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
                    id="save-username-button"
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

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}))

const mapStateToProps = (state: ApplicationState) => ({
  // editingTag: state.relearn.editingTag,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUsername: (newUsername: string) => dispatch(setUsername(newUsername)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

interface OwnProps {
  open: boolean
  onClose: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(EditUsernameDialog)
