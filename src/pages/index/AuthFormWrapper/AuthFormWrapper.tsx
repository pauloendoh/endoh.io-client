import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as AuthActions from "store/auth/authActions";
import { AuthUserGetDto } from "types/domain/auth/AuthUserGetDto";
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter";
import { MyDivider } from "../../../components/utils/MyDivider/MyDivider";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";
import S from "./AuthFormWrapper.styles";
import GoogleButton from "./GoogleButton/GoogleButton";
import LoginForm from "./LoginForm/LoginForm";
import PasswordResetForm from "./PasswordResetForm/PasswordResetForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { AuthFormType } from "./_types/AuthFormType";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthUser: (authUser: AuthUserGetDto) =>
    dispatch(AuthActions.setAuthUser(authUser)),
});

type Props = ReturnType<typeof mapDispatchToProps>;

const AuthFormWrapper = (props: Props) => {
  const [formType, setFormType] = useState<AuthFormType>("login");

  const classes = useStyles();

  const handleTempSignIn = () => {
    myAxios.get<AuthUserGetDto>(API.auth.tempUser).then((res) => {
      props.setAuthUser(res.data);
    });
  };

  return (
    <Paper className={classes.paper}>
      {formType === "passwordReset" ? (
        <PasswordResetForm
          onExit={() => {
            setFormType("login");
          }}
        />
      ) : (
        <Box>
          {formType === "register" && (
            <RegisterForm setFormType={setFormType} />
          )}
          {formType === "login" && <LoginForm setFormType={setFormType} />}

          <Box mt={2}>
            <MyDivider>
              <Box minWidth={30}>Or</Box>
            </MyDivider>

            <Box mt={2}>
              <GoogleButton />
            </Box>

            <Box mt={1}>
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
