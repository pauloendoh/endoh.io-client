import {
  Box,
  Button,
  CircularProgress,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import H5 from "../../../components/shared/Text/H5"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { EmailPostDto } from "../../../interfaces/dtos/auth/EmailPostDto"
import MyAxiosError, { MyFieldError } from "../../../interfaces/MyAxiosError"
import { ApplicationState } from "../../../store/store"

// PE 2/3 
const ResetPasswordByEmailForm = (props: Props) => {
  const classes = useStyles()
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[])

  const [isOk, setIsOk] = useState(false)

  const handleSubmit = (
    values: EmailPostDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true)

    MY_AXIOS.post(API.utils.passwordResetEmail, values)
      .then((res) => {
        setIsOk(true)
      })
      .catch((err: MyAxiosError) => {
        setResponseErrors(err.response.data.errors)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Box>
      <H5>Reset your password</H5>

      {isOk ? (
        <Box my={3}>
          Thanks! You’ll get an email with a link to reset your password shortly
        </Box>
      ) : (
        // maybe put this in another component?
        <React.Fragment>
          <Box my={3}>
            <Typography variant="body2">
              Tell us your email associated with endoh.io, and we’ll send a link
              to reset your password.
            </Typography>
          </Box>

          <Formik
            initialValues={
              {
                email: "",
              } as EmailPostDto
            }
            // PE 2/3 jogar pra fora
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting)
            }}
          >
            {({ isSubmitting, handleChange, errors }) => (
              <Form className="d-flex flex-column">
                <Box>
                  <MyTextField
                    id="email"
                    name="email"
                    className="mt-3"
                    type="email"
                    onChange={handleChange}
                    label="Email"
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                    autoFocus
                  />
                </Box>

                <Box mt={2}>
                  <Button
                    id="submit-reset-password-button"
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    style={{ textTransform: "none", fontSize: 16 }}
                    fullWidth
                  >
                    SEND LINK
                    {isSubmitting && (
                      <CircularProgress size={20} className="ml-3" />
                    )}
                  </Button>
                </Box>

                {responseErrors.map((err, i) => (
                  <Box key={i} mt={1}>
                    <Typography color="error">{err.message}</Typography>
                  </Box>
                ))}
              </Form>
            )}
          </Formik>
        </React.Fragment>
      )}

      {/* PE 2/3 - Must have some easier way to render this... right? */}
      <Flex justifyContent="center" mt={3}>
        <Typography variant="body2">Return to &nbsp;</Typography>
        <Link
          component={RouterLink}
          to="#"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            props.onExit()
          }}
        >
          sign in
        </Link>
      </Flex>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  onExit: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordByEmailForm)
