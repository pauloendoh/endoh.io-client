import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import useAuthStore from "store/zustand/useAuthStore";
import { AuthUserGetDto } from "types/domain/auth/AuthUserGetDto";
import Icons from "utils/styles/Icons";
import myAxios from "../../../utils/consts/myAxios";
import apiUrls from "../../../utils/url/urls/apiUrls";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";
import { MyDivider } from "../../_UI/MyDivider/MyDivider";
import S from "./AuthFormWrapper.styles";
import GoogleButton from "./GoogleButton/GoogleButton";
import LoginForm from "./LoginForm/LoginForm";
import PasswordResetForm from "./PasswordResetForm/PasswordResetForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { AuthFormType } from "./_types/AuthFormType";

const AuthFormWrapper = () => {
  const { setAuthUser } = useAuthStore();
  const [currentForm, setCurrentForm] = useState<AuthFormType>("login");

  // PE 2/3 - change to styled-components?
  const classes = useStyles();

  const handleTempSignIn = () => {
    // PE 2/3
    myAxios.get<AuthUserGetDto>(apiUrls.auth.tempUser).then((res) => {
      setAuthUser(res.data);
    });
  };

  return (
    <Paper className={classes.paper}>
      {currentForm === "passwordReset" ? (
        <PasswordResetForm
          onExit={() => {
            setCurrentForm("login");
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
              >
                <FlexVCenter>
                  <Icons.AccessAlarm fontSize="large" />
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

  testUserButton: {
    paddingTop: 7,
    paddingBottom: 7,
    background: theme.palette.grey[800],
  },
}));

export default AuthFormWrapper;
