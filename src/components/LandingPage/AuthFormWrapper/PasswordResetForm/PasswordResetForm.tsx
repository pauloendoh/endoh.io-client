import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box, Button, CircularProgress, Link, Typography } from "@mui/material"
import { useAxios } from "hooks/utils/useAxios"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { connect } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { Dispatch } from "redux"
import { urls } from "utils/urls"
import { ApplicationState } from "../../../../store/store"
import { EmailPostDto } from "../../../../types/domain/auth/EmailPostDto"
import Flex from "../../../_UI/Flexboxes/Flex"
import MyTextField from "../../../_UI/MyInputs/MyTextField"
import H5 from "../../../_UI/Text/H5"

// PE 2/3
const ResetPasswordByEmailForm = (props: Props) => {
  const classes = useStyles()

  const [isOk, setIsOk] = useState(false)

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<EmailPostDto>({
    defaultValues: {
      email: "",
    },
  })

  const axios = useAxios()

  const onSubmit = (values: EmailPostDto) => {
    axios.post(urls.api.utils.passwordResetEmail, values).then((res) => {
      setIsOk(true)
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
              Tell us your email associated with Relearn, and we’ll send a link
              to reset your password.
            </Typography>
          </Box>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column"
          >
            <Box>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <MyTextField
                    id="email"
                    type="email"
                    label="Email"
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                    autoFocus
                    {...field}
                  />
                )}
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
          </form>
        </React.Fragment>
      )}

      {/* PE 2/3 - Must have some easier way to render this... right? */}
      <Flex justifyContent="center" mt={3}>
        <Typography variant="body2">
          Return to{" "}
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
        </Typography>
      </Flex>
    </Box>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
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
