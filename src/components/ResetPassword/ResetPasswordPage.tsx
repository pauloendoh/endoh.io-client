import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  Typography,
} from "@mui/material"
import { Form, Formik } from "formik"
import { useAxios } from "hooks/utils/useAxios"
import { useEffect, useState } from "react"
import { Redirect, Link as RouterLink } from "react-router-dom"
import { urls } from "utils/urls"
import MyAxiosError, { MyFieldError } from "../../types/MyAxiosError"
import { PasswordResetPostDto } from "../../types/domain/auth/PasswordResetPostDto"
import { getQueryParam } from "../../utils/url/getQueryParam"
import Flex from "../_UI/Flexboxes/Flex"
import FlexHCenter from "../_UI/Flexboxes/FlexHCenter"
import FlexVCenter from "../_UI/Flexboxes/FlexVCenter"
import MyTextField from "../_UI/MyInputs/MyTextField"
import TextPrimary from "../_UI/Text/TextPrimary"

function ResetPasswordPage() {
  const classes = useStyles()

  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[])
  const [success, setSuccess] = useState(false)

  const token = getQueryParam("token") || ""
  const userId = Number(getQueryParam("userId"))

  const [redirectTo, setRedirectTo] = useState("")

  const axios = useAxios()

  useEffect(
    () => {
      if (token.length === 0 || !userId) {
        setRedirectTo(urls.pages.index)
      }
      document.title = "Reset Password - Relearn"
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleSubmit = (
    values: PasswordResetPostDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true)

    if (values.password !== values.password2) {
      setResponseErrors([
        { field: "password", message: "Passwords don't match" },
      ])
      setSubmitting(false)
      return
    }

    setResponseErrors([])
    axios
      .post(urls.api.auth.resetPassword, values)
      .then((res) => {
        debugger
        setSuccess(true)
      })
      .catch((err: MyAxiosError) => {
        setResponseErrors(err.response?.data.errors || [])
      })
      .finally(() => {
        setSubmitting(false)
      })
  }
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
              <TextPrimary>Relearn</TextPrimary>
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
                  handleSubmit(values, setSubmitting)
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
                        label="New password"
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
                        label="Confirm new password"
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
                        Reset password
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
                Relearn
              </Link>
            </Flex>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
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

export default ResetPasswordPage
