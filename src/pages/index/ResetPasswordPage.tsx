import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Dispatch } from "redux";
import Flex from "../../components/shared/Flexboxes/Flex";
import FlexHCenter from "../../components/shared/Flexboxes/FlexHCenter";
import FlexVCenter from "../../components/shared/Flexboxes/FlexVCenter";
import MyTextField from "../../components/shared/MyInputs/MyTextField";
import TextPrimary from "../../components/shared/Text/TextPrimary";
import { logoutActionCreator } from "../../store/auth/authActions";
import { ApplicationState } from "../../store/store";
import { PasswordResetPostDto } from "../../types/domain/auth/PasswordResetPostDto";
import MyAxiosError, { MyFieldError } from "../../types/MyAxiosError";
import apiUrls from "../../utils/consts/apiUrls";
import myAxios from "../../utils/consts/myAxios";
import pageUrls from "../../utils/consts/pageUrls";
import { getQueryParam } from "../../utils/url/getQueryParam";

function ResetPasswordPage(props: Props) {
  const classes = useStyles();
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[]);
  const [success, setSuccess] = useState(false);

  const token = getQueryParam("token");
  const userId = Number(getQueryParam("userId"));

  const [redirectTo, setRedirectTo] = useState("");

  useEffect(
    () => {
      if (token.length === 0 || !userId) {
        setRedirectTo(pageUrls.index);
      }
      document.title = "Reset Password - Endoh.io";
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmit = (
    values: PasswordResetPostDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);

    if (values.password !== values.password2) {
      setResponseErrors([
        { field: "password", message: "Passwords don't match" },
      ]);
      setSubmitting(false);
      return;
    }

    setResponseErrors([]);
    myAxios
      .post(apiUrls.auth.resetPassword, values)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err: MyAxiosError) => {
        setResponseErrors(err.response.data.errors);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <Container maxWidth="sm">
      {redirectTo.length > 0 ? (
        // TODO: instead of redirecting, show a message of "token is invalid"
        <Redirect to={redirectTo} />
      ) : null}
      <Box mx="auto">
        <FlexHCenter mt={10} mb={3}>
          <Typography variant="h3">
            <Flex>
              {`<`}
              <TextPrimary>endoh.io</TextPrimary>
              {`/>`}
            </Flex>
          </Typography>
        </FlexHCenter>

        <Paper className={classes.paper}>
          <Box p={4} width={400}>
            {success ? (
              <FlexHCenter>Successful password reset!</FlexHCenter>
            ) : (
              <Formik
                initialValues={
                  {
                    userId,
                    token,
                    password: "",
                    password2: "",
                  } as PasswordResetPostDto
                }
                // PE 2/3 jogar pra fora
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values, setSubmitting);
                }}
              >
                {({ isSubmitting, handleChange, errors }) => (
                  <Form>
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
                    </Box>

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
                          <FlexVCenter ml={2}>
                            <CircularProgress size={20} />
                          </FlexVCenter>
                        )}
                      </Button>
                    </Box>

                    {responseErrors.map((err, i) => (
                      <FlexHCenter key={i} mt={1}>
                        <Typography color="error">{err.message}</Typography>
                      </FlexHCenter>
                    ))}
                  </Form>
                )}
              </Formik>
            )}

            <Flex justifyContent="center" mt={3}>
              <Typography variant="body2">Return to &nbsp;</Typography>
              <Link component={RouterLink} to="/">
                endoh.io
              </Link>
            </Flex>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
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
}));

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logoutActionCreator(dispatch)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
