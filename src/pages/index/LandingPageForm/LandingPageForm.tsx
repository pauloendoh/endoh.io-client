import {
  Box,
  Button,
  CircularProgress,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { Form, Formik } from "formik";
import { AuthUserGetDto } from "interfaces/dtos/AuthUserGetDto";
import React, { MouseEvent, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as AuthActions from "store/auth/authActions";
import { ApplicationState } from "store/store";
import Flex from "../../../components/shared/Flexboxes/Flex";
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter";
import MyTextField from "../../../components/shared/MyInputs/MyTextField";
import { MyDivider } from "../../../components/utils/MyDivider/MyDivider";
import MyAxiosError, { MyFieldError } from "../../../interfaces/MyAxiosError";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";
import GoogleButton from "./GoogleButton/GoogleButton";
import S from "./LandingPageForm.styles";
import PasswordResetForm from "./ResetPasswordByEmailForm";

type FormType = "login" | "register" | "passwordReset";

// PE 1/3 20210109 - Dividir em 3 possíveis forms: login, register, passwordReset
const LandingPageForm = (props: Props) => {
  const classes = useStyles();

  // TODO 20210105: substitute signUpIsSelected for this formType
  const [formType, setFormType] = useState<FormType>("login");

  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[]);

  const handleTempSignIn = () => {
    myAxios.get<AuthUserGetDto>(API.auth.tempUser).then((res) => {
      props.setAuthUser(res.data);
    });
  };

  return (
    <Paper className={classes.paper}>
      {formType === "passwordReset" ? (
        <PasswordResetForm
          onExit={() => {
            setFormType("login");
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
              if (
                formType === "register" &&
                values.password !== values.password2
              ) {
                setResponseErrors([
                  { field: "password", message: "Passwords don't match" },
                ]);
                setSubmitting(false);
                return;
              }

              const authData = {
                username: values.username,
                email: values.email,
                password: values.password,
              };

              const endpoint =
                formType === "register" ? "/auth/register" : "/auth/login";

              setResponseErrors([]);

              myAxios
                .post<AuthUserGetDto>(endpoint, authData)
                .then((res) => {
                  const authUser = res.data;
                  props.setAuthUser(authUser);
                })
                .catch((err: MyAxiosError) => {
                  setResponseErrors(err.response.data.errors);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting, handleChange, errors }) => (
              <Form className="d-flex flex-column">
                <Box>
                  <MyTextField
                    id="email"
                    name="email"
                    className="mt-3"
                    type={formType === "register" ? "email" : "text"}
                    onChange={handleChange}
                    label={
                      formType === "register" ? "Email" : "Email or username"
                    }
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                    autoFocus
                  />
                </Box>

                {formType === "register" ? (
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

                  {formType === "login" && (
                    <Flex justifyContent="flex-end">
                      <Button
                        color="primary"
                        onClick={() => {
                          setFormType("passwordReset");
                        }}
                      >
                        Forgot your password?
                      </Button>
                    </Flex>
                  )}
                </Box>

                {formType === "register" ? (
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
                    {formType === "register" ? "SIGN UP" : "SIGN IN"}
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
            {formType === "register" ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                Already have an account? &nbsp;{" "}
                <Link
                  href="#"
                  onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    setResponseErrors([]);
                    setFormType("login");
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
                    e.preventDefault();
                    setResponseErrors([]);
                    setFormType("register");
                  }}
                >
                  Sign up
                </Link>
              </Box>
            )}
          </Box>

          <Box mt={2}>
            <MyDivider>
              <Box minWidth={30}>Or</Box>
            </MyDivider>

            <Box mt={2}>
              <GoogleButton />
            </Box>

            <Box mt={1}>
              <Button
                onClick={handleTempSignIn}
                fullWidth
                className={classes.testUserButton}
                id="temp-user-btn"
              >
                <FlexVCenter>
                  <AccessAlarmIcon fontSize="large" />
                  <S.TemporaryUserText>
                    Test with Temporary User
                  </S.TemporaryUserText>
                </FlexVCenter>
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

type Props = ReturnType<typeof mapDispatchToProps>;

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

  testUserButton: {
    paddingTop: 7,
    paddingBottom: 7,
    background: theme.palette.grey[800],
  },
}));

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthUser: (authUser: AuthUserGetDto) =>
    dispatch(AuthActions.setAuthUser(authUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageForm);
