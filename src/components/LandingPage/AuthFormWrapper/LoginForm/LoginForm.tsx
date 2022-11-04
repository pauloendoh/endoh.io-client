import { Box, Button, CircularProgress, Link } from "@mui/material"
import { useAxios } from "hooks/utils/useAxios"
import { MouseEvent } from "react"
import { Controller, useForm } from "react-hook-form"
import useAuthStore from "store/zustand/useAuthStore"
import { AuthUserGetDto } from "types/domain/auth/AuthUserGetDto"
import { urls } from "utils/urls"
import Flex from "../../../_UI/Flexboxes/Flex"
import MyTextField from "../../../_UI/MyInputs/MyTextField"
import { AuthFormType } from "../_types/AuthFormType"

type Props = {
  setFormType: (formType: AuthFormType) => void
}

interface FormValues {
  username: string
  email: string
  password: string // PE 1/3 - is not used for login?
}

const LoginForm = ({ setFormType }: Props) => {
  const { setAuthUser } = useAuthStore()

  const axios = useAxios()

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<FormValues>({
    defaultValues: { username: "", email: "", password: "" },
  })

  const onSubmit = (values: FormValues) => {
    const authData = {
      username: values.username,
      email: values.email,
      password: values.password,
    }

    axios
      .post<AuthUserGetDto>(urls.api.auth.login, authData)
      .then((res) => {
        const authUser = res.data
        setAuthUser(authUser)
      })
      .catch((e) => {})
  }

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
              setFormType("passwordReset")
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

      <Box mt={3}>
        <Box display="flex" alignItems="center" justifyContent="center">
          Don't have an account? &nbsp;
          <Link
            href="#"
            onClick={(e: MouseEvent) => {
              e.preventDefault()
              setFormType("register")
            }}
          >
            Sign up
          </Link>
        </Box>
      </Box>
    </form>
  )
}

export default LoginForm
