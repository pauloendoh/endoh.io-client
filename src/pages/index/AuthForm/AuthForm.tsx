import {
  Box,
  Button,
  CircularProgress,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core"
import MyTextField from "components/shared/MyInputs/MyTextField"
import { Form, Formik } from "formik"
import { AuthUserGetDto } from "interfaces/dtos/AuthUserGetDto"
import React, { MouseEvent, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import * as AuthActions from "store/auth/authActions"
import { ApplicationState } from "store/store"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import { MyDivider } from "../../../components/utils/MyDivider/MyDivider"
import { AuthFormTypes } from "../../../consts/enums/AuthFormTypes"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import MyAxiosError, { MyFieldError } from "../../../interfaces/MyAxiosError"
import googleIcon from "../../../static/images/google-icon-white.png"
import PasswordResetForm from "./ResetPasswordByEmailForm"

require("dotenv").config()

// PE 1/3 - Dividir em 3 possíveis forms: login, register, passwordReset
const AuthForm = (props: Props) => {
  const classes = useStyles()

  // TODO 20210105: substitute signUpIsSelected for this formType
  const [formType, setFormType] = useState(AuthFormTypes.login)

  const [signupIsSelected, setSignupIsSelected] = useState(false)
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[])

  const handleGoogleSignIn = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open(process.env.REACT_APP_API_URL + "auth/google", "_self")
  }

  return (
    <Paper className={classes.paper}>
      {formType === AuthFormTypes.passwordReset ? (
        <PasswordResetForm
          onExit={() => {
            setFormType(AuthFormTypes.login)
          }}
        />
      ) : (
        <Box>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              password2: "",
            }}
            // PE 2/3 jogar pra fora
            onSubmit={(values, { setSubmitting }) => {
              if (signupIsSelected && values.password !== values.password2) {
                setResponseErrors([
                  { field: "password", message: "Passwords don't match" },
                ])
                setSubmitting(false)
                return
              }

              const authData = {
                username: values.username,
                email: values.email,
                password: values.password,
              }

              const endpoint = signupIsSelected
                ? "/auth/register"
                : "/auth/login"

              setResponseErrors([])

              MY_AXIOS.post<AuthUserGetDto>(endpoint, authData)
                .then((res) => {
                  const authUser = res.data
                  props.setAuthUser(authUser)

                  // props.UPDATE_AUTH_USER(res.data);
                })
                .catch((err: MyAxiosError) => {
                  setResponseErrors(err.response.data.errors)
                })
                .finally(() => {
                  setSubmitting(false)
                })
            }}
          >
            {({ isSubmitting, handleChange, errors }) => (
              <Form className="d-flex flex-column">
                <Box>
                  <MyTextField
                    id="email"
                    name="email"
                    className="mt-3"
                    type={signupIsSelected ? "email" : "text"}
                    onChange={handleChange}
                    label={signupIsSelected ? "Email" : "Email or username"}
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                    autoFocus
                  />
                </Box>

                {signupIsSelected ? (
                  <Box mt={1}>
                    <MyTextField
                      id="username"
                      name="username"
                      onChange={handleChange}
                      label="Username"
                      fullWidth
                      required
                      InputLabelProps={{ required: false }}
                    />
                  </Box>
                ) : null}

                <Box mt={1}>
                  <MyTextField
                    id="password"
                    type="password"
                    onChange={handleChange}
                    size="small"
                    label="Password"
                    className="mt-3"
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                  />

                  {!signupIsSelected && (
                    <Flex justifyContent="flex-end">
                      <Button
                        color="primary"
                        onClick={() => {
                          setFormType(AuthFormTypes.passwordReset)
                        }}
                      >
                        Forgot your password?
                      </Button>
                    </Flex>
                  )}
                </Box>

                {signupIsSelected ? (
                  <Box mt={1}>
                    <MyTextField
                      id="password2"
                      name="password2"
                      type="password"
                      onChange={handleChange}
                      label="Confirm password"
                      className="mt-3"
                      fullWidth
                      required
                      InputLabelProps={{ required: false }}
                    />
                  </Box>
                ) : null}

                <Box mt={2}>
                  <Button
                    id="auth-submit-button"
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    style={{ textTransform: "none", fontSize: 16 }}
                    fullWidth
                  >
                    {signupIsSelected ? "SIGN UP" : "SIGN IN"}
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

          <Box mt={3}>
            {signupIsSelected ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                Already have an account? &nbsp;{" "}
                <Link
                  href="#"
                  onClick={(e: MouseEvent) => {
                    e.preventDefault()
                    setResponseErrors([])
                    setSignupIsSelected(false)
                  }}
                >
                  Sign in
                </Link>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" justifyContent="center">
                Don't have an account? &nbsp;
                <Link
                  href="#"
                  onClick={(e: MouseEvent) => {
                    e.preventDefault()
                    setResponseErrors([])
                    setSignupIsSelected(true)
                  }}
                >
                  Sign up
                </Link>
              </Box>
            )}
          </Box>

          <Box mt={2}>
            <MyDivider>
              <Box minWidth={100}>Or enter via</Box>
            </MyDivider>

            <Box mt={2}>
              <Button
                onClick={handleGoogleSignIn}
                fullWidth
                className={classes.googleButton}
              >
                <FlexVCenter>
                  <img src={googleIcon} height={24} alt="Google button" />
                  {/* <FontAwesomeIcon className="fab fa-google"/> */}
                  <Box ml={2}>Google</Box>
                </FlexVCenter>
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  )
}

type Props = ReturnType<typeof mapDispatchToProps>

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      width: 290,
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: 330,
    },
    [theme.breakpoints.up("md")]: {
      width: 400,
    },
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  googleButton: {
    paddingTop: 10,
    paddingBottom: 10,
    background: theme.palette.grey[800],
  },
}))

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthUser: (authUser: AuthUserGetDto) =>
    dispatch(AuthActions.setAuthUser(authUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
