import MuiAlert, { AlertProps } from "@mui/lab/Alert"
import Snackbar from "@mui/material/Snackbar"
import { makeStyles, Theme } from "@mui/material/styles"
import React from "react"
import useSnackbarStore from "../../../store/zustand/useSnackbarStore"

const Snackbars = () => {
  const classes = useStyles()

  const {
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
  } = useSnackbarStore()

  const handleCloseSuccess = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setSuccessMessage("")
  }

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setErrorMessage("")
  }

  return (
    <div className={classes.root}>
      <Snackbar
        id="success-message"
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        id="error-message"
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}))

export default Snackbars
