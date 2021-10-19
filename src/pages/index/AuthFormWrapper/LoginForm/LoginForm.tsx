import {
  Box,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { MouseEvent, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as AuthActions from "store/auth/authActions";
import { AuthUserGetDto } from "types/domain/auth/AuthUserGetDto";
import { urls } from "utils/urls";
import Flex from "../../../../components/shared/Flexboxes/Flex";
import MyTextField from "../../../../components/shared/MyInputs/MyTextField";
import MyAxiosError, { MyFieldError } from "../../../../types/MyAxiosError";
import myAxios from "../../../../utils/consts/myAxios";
import { AuthFormType } from "../_types/AuthFormType";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthUser: (authUser: AuthUserGetDto) =>
    dispatch(AuthActions.setAuthUser(authUser)),
});

type Props = ReturnType<typeof mapDispatchToProps> & {
  setFormType: (formType: AuthFormType) => void;
};

const LoginForm = ({ setFormType, ...props }: Props) => {
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[]);

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      // PE 2/3 jogar pra fora
      onSubmit={(values, { setSubmitting }) => {
        const authData = {
          username: values.username,
          email: values.email,
          password: values.password,
        };

        setResponseErrors([]);

        myAxios
          .post<AuthUserGetDto>(urls.api.login, authData)
          .then((res) => {
            const authUser = res.data;
            props.setAuthUser(authUser);
          })
          .catch((err: MyAxiosError) => {
            console.log(err);
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
              type={"text"}
              onChange={handleChange}
              label={"Email or username"}
              fullWidth
              required
              InputLabelProps={{ required: false }}
              autoFocus
            />
          </Box>

          <Box mt={1}>
            <MyTextField
              id="password"
              type="password"
              onChange={handleChange}
              size="small"
              label="Password"
              fullWidth
              required
              InputLabelProps={{ required: false }}
            />

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
          </Box>

          <Box mt={2}>
            <Button
              id="auth-submit-button"
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{
                textTransform: "none",
                fontSize: 16,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              fullWidth
            >
              SIGN IN
              {isSubmitting && <CircularProgress size={20} className="ml-3" />}
            </Button>
          </Box>

          {responseErrors.map((err, i) => (
            <Box key={i} mt={1}>
              <Typography color="error">{err.message}</Typography>
            </Box>
          ))}
          <Box mt={3}>
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
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default connect(undefined, mapDispatchToProps)(LoginForm);
