import {
  Box,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@material-ui/core";
import React, { MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuthStore from "store/zustand/useAuthStore";
import { AuthUserGetDto } from "types/domain/auth/AuthUserGetDto";
import { urls } from "utils/urls";
import MyAxiosError, { MyFieldError } from "../../../../types/MyAxiosError";
import myAxios from "../../../../utils/consts/myAxios";
import Flex from "../../../_UI/Flexboxes/Flex";
import MyTextField from "../../../_UI/MyInputs/MyTextField";
import { AuthFormType } from "../_types/AuthFormType";

type Props = {
  setFormType: (formType: AuthFormType) => void;
};

interface FormValues {
  username: string;
  email: string;
  password: string; // PE 1/3 - is not used for login?
}

const LoginForm = ({ setFormType }: Props) => {
  const { setAuthUser } = useAuthStore();
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[]);

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<FormValues>({
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = (values: FormValues) => {
    const authData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    setResponseErrors([]);

    myAxios
      .post<AuthUserGetDto>(urls.api.auth.login, authData)
      .then((res) => {
        const authUser = res.data;
        setAuthUser(authUser);
      })
      .catch((err: MyAxiosError) => {
        setResponseErrors(err.response.data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
      <Box>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <MyTextField
              id="email"
              name="email"
              type={"text"}
              label={"Email or username"}
              fullWidth
              required
              InputLabelProps={{ required: false }}
              autoFocus
              {...field}
            />
          )}
        />
      </Box>

      <Box mt={1}>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <MyTextField
              id="password"
              type="password"
              size="small"
              label="Password"
              fullWidth
              required
              InputLabelProps={{ required: false }}
              {...field}
            />
          )}
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
    </form>
  );
};

export default LoginForm;
