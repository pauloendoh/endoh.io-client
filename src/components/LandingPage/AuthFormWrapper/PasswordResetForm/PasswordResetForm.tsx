import {
  Box,
  Button,
  CircularProgress,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../../store/store";
import { EmailPostDto } from "../../../../types/domain/auth/EmailPostDto";
import MyAxiosError, { MyFieldError } from "../../../../types/MyAxiosError";
import myAxios from "../../../../utils/consts/myAxios";
import apiUrls from "../../../../utils/url/urls/apiUrls";
import Flex from "../../../_UI/Flexboxes/Flex";
import MyTextField from "../../../_UI/MyInputs/MyTextField";
import H5 from "../../../_UI/Text/H5";

// PE 2/3
const ResetPasswordByEmailForm = (props: Props) => {
  const classes = useStyles();

  const [isOk, setIsOk] = useState(false);
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[]);

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
    reset,
  } = useForm<EmailPostDto>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: EmailPostDto) => {
    myAxios
      .post(apiUrls.utils.passwordResetEmail, values)
      .then((res) => {
        setIsOk(true);
      })
      .catch((err: MyAxiosError) => {
        setResponseErrors(err.response.data.errors);
      });
  };

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
              Tell us your email associated with endoh.io, and we’ll send a link
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
                    name="email"
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

            {responseErrors.map((err, i) => (
              <Box key={i} mt={1}>
                <Typography color="error">{err.message}</Typography>
              </Box>
            ))}
          </form>
        </React.Fragment>
      )}

      {/* PE 2/3 - Must have some easier way to render this... right? */}
      <Flex justifyContent="center" mt={3}>
        <Typography variant="body2">Return to &nbsp;</Typography>
        <Link
          component={RouterLink}
          to="#"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            props.onExit();
          }}
        >
          sign in
        </Link>
      </Flex>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

interface OwnProps {
  onExit: () => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordByEmailForm);
