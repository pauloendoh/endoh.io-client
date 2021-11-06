import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as AuthActions from "store/auth/authActions";
import { AuthUserGetDto } from "types/domain/auth/AuthUserGetDto";
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter";
import { MyDivider } from "../../../components/utils/MyDivider/MyDivider";
import apiUrls from "../../../utils/consts/apiUrls";
import myAxios from "../../../utils/consts/myAxios";
import S from "./AuthFormWrapper.styles";
import GoogleButton from "./GoogleButton/GoogleButton";
import LoginForm from "./LoginForm/LoginForm";
import PasswordResetForm from "./PasswordResetForm/PasswordResetForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { AuthFormType } from "./_types/AuthFormType";

// PE 2/3 - hard to read
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthUser: (authUser: AuthUserGetDto) =>
    dispatch(AuthActions.setAuthUser(authUser)),
});

// PE 1/3 - not really necessary
type Props = ReturnType<typeof mapDispatchToProps>;

const AuthFormWrapper = (props: Props) => {
  const [currentForm, setCurrentForm] = useState<AuthFormType>("login");

  // PE 2/3 - change to styled-components?
  const classes = useStyles();

  const handleTempSignIn = () => {
    // PE 2/3
    myAxios.get<AuthUserGetDto>(apiUrls.auth.tempUser).then((res) => {
      props.setAuthUser(res.data);
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
                  <AccessAlarmIcon fontSize="large" />
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

export default connect(undefined, mapDispatchToProps)(AuthFormWrapper);