import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box, Button, Paper, Tooltip } from "@mui/material"
import { useAxios } from "hooks/utils/useAxios"
import { useState } from "react"
import { MdInfo } from "react-icons/md"
import useAuthStore from "store/zustand/useAuthStore"
import { AuthUserGetDto } from "types/domain/auth/AuthUserGetDto"
import Icons from "utils/styles/Icons"
import { urls } from "utils/urls"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import { MyDivider } from "../../_UI/MyDivider/MyDivider"
import S from "./AuthFormWrapper.styles"
import GoogleButton from "./GoogleButton/GoogleButton"
import LoginForm from "./LoginForm/LoginForm"
import PasswordResetForm from "./PasswordResetForm/PasswordResetForm"
import RegisterForm from "./RegisterForm/RegisterForm"
import { AuthFormType } from "./_types/AuthFormType"

const AuthFormWrapper = () => {
  const { setAuthUser } = useAuthStore()
  const [currentForm, setCurrentForm] = useState<AuthFormType>("login")

  // PE 2/3 - change to styled-components?
  const classes = useStyles()

  const axios = useAxios()

  const handleTempSignIn = () => {
    // PE 2/3
    axios.get<AuthUserGetDto>(urls.api.auth.tempUser).then((res) => {
      setAuthUser(res.data)
    })
  }

  return (
    <Paper className={classes.paper}>
      {currentForm === "passwordReset" ? (
        <PasswordResetForm
          onExit={() => {
            setCurrentForm("login")
          }}
        />
      ) : (
        <Box>
          {currentForm === "register" && (
            <RegisterForm setFormType={setCurrentForm} />
          )}
          {currentForm === "login" && (
            <LoginForm setFormType={setCurrentForm} />
          )}

          <Box mt={2}>
            <MyDivider>
              <Box minWidth={30}>Or</Box>
            </MyDivider>

            <Box mt={2}>
              <GoogleButton />
            </Box>

            <Box mt={1}>
              {/* PE 2/3 - create a common DarkButton ? */}
              <Button
                onClick={handleTempSignIn}
                fullWidth
                className={classes.testUserButton}
                id="temp-user-btn"
                sx={(theme) => ({ color: theme.palette.grey[100] })}
              >
                <FlexVCenter>
                  <Icons.AccessAlarm fontSize="large" />
                  <S.TemporaryUserText>
                    Test with Temporary User
                  </S.TemporaryUserText>

                  <Tooltip title="Temporary users don't require username or password, and they expire in 30 days">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <MdInfo fontSize={16} />
                    </div>
                  </Tooltip>
                </FlexVCenter>
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  paper: {
    padding: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("md")]: {
      width: 290,
    },
    [theme.breakpoints.between("sm", "lg")]: {
      width: 330,
    },
    [theme.breakpoints.up("md")]: {
      width: 400,
    },
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },

  testUserButton: {
    paddingTop: 7,
    paddingBottom: 7,
    background: theme.palette.grey[800],
  },
}))

export default AuthFormWrapper
