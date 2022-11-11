import { Button, Container, Paper, Typography } from "@mui/material"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import useKeepTempUserMutation from "hooks/react-query/auth/useKeepTempUserMutation"
import { useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import useAuthStore from "store/zustand/useAuthStore"
import { format } from "timeago.js"
import { buildRegisterDto, RegisterDto } from "types/domain/auth/RegisterDto"

interface Props {
  test?: string
}

const KeepTempUserPaper = (props: Props) => {
  const authUser = useAuthStore((s) => s.authUser)

  const expiresAt = useMemo(() => format(authUser.userExpiresAt), [authUser])

  const { control, handleSubmit } = useForm<RegisterDto>({
    defaultValues: buildRegisterDto(),
  })

  const { mutate: submitSave, isLoading } = useKeepTempUserMutation()
  const onSubmit = (values: RegisterDto) => {
    console.log(values)
    submitSave(values)
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 3, mt: 3 }}>
        <FlexCol alignItems="center">
          <Typography variant="h5">Keep temporary account</Typography>
          <Typography>Expires {expiresAt}</Typography>
        </FlexCol>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexCol gap={2} mt={3}>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <MyTextField
                  id="username"
                  {...field}
                  required
                  size="small"
                  label="Username"
                  fullWidth
                  autoFocus
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <MyTextField
                  id="email"
                  {...field}
                  required
                  size="small"
                  label="Email"
                  fullWidth
                  type="email"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <MyTextField
                  id="password"
                  {...field}
                  required
                  size="small"
                  label="Password"
                  fullWidth
                  type="password"
                />
              )}
            />

            <Controller
              control={control}
              name="password2"
              render={({ field }) => (
                <MyTextField
                  id="password2"
                  {...field}
                  required
                  size="small"
                  label="Confirm password"
                  fullWidth
                  type="password"
                />
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              color="primary"
            >
              Keep this account
            </Button>
          </FlexCol>
        </form>
      </Paper>
    </Container>
  )
}

export default KeepTempUserPaper
