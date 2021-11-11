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
import MyAxiosError, { MyFieldError } from "../../../../types/MyAxiosError";
import myAxios from "../../../../utils/consts/myAxios";
import MyTextField from "../../../_UI/MyInputs/MyTextField";
import { AuthFormType } from "../_types/AuthFormType";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthUser: (authUser: AuthUserGetDto) =>
    dispatch(AuthActions.setAuthUser(authUser)),
});

type Props = ReturnType<typeof mapDispatchToProps> & {
  setFormType: (formType: AuthFormType) => void;
};

const RegisterForm = ({ setFormType, ...props }: Props) => {
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[]);

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        password2: "",
      }}
      // PE 2/3 jogar pra fora
      onSubmit={(values, { setSubmitting }) => {
        if (values.password !== values.password2) {
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

        setResponseErrors([]);

        myAxios
          .post<AuthUserGetDto>(urls.api.register, authData)
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
              type={"email"}
              onChange={handleChange}
              label={"Email"}
              fullWidth
              required
              InputLabelProps={{ required: false }}
              autoFocus
            />
          </Box>

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
              SIGN UP
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
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default connect(undefined, mapDispatchToProps)(RegisterForm);
