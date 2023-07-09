import { makeStyles } from "@mui/styles"

import { Alert, Snackbar, Theme } from "@mui/material"
import React, { ComponentProps } from "react"
import useSnackbarStore from "../../../store/zustand/useSnackbarStore"

const Snackbars = () => {
  const classes = useStyles()

  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useSnackbarStore()

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
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        onClose={() => handleCloseSuccess()}
      >
        <div>
          <MyAlert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{
              color: "white",
            }}
          >
            {successMessage}
          </MyAlert>
        </div>
      </Snackbar>

      <Snackbar
        id="error-message"
        open={!!errorMessage}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        onClose={() => handleCloseError()}
      >
        <div>
          <MyAlert
            onClose={handleCloseError}
            severity="error"
            sx={{
              color: "white",
            }}
          >
            {errorMessage}
          </MyAlert>
        </div>
      </Snackbar>
    </div>
  )
}

function MyAlert(props: ComponentProps<typeof Alert>) {
  return <Alert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}))

export default Snackbars
