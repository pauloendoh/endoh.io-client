import Snackbar from "@material-ui/core/Snackbar"
import { makeStyles, Theme } from "@material-ui/core/styles"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ApplicationState } from "store/store"
import * as utilsActions from "../../../store/utils/utilsActions"

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

const MySnackBar = (props: Props) => {
  const classes = useStyles()

  const handleCloseSuccess = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }
    props.setSuccessMessage("")
  }

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    props.setErrorMessage("")
  }

  return (
    <div className={classes.root}>
      <Snackbar
      id="success-message"
        open={props.successMessage.length > 0}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {props.successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
      id="error-message"
        open={props.errorMessage.length > 0}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {props.errorMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  successMessage: state.utils.successMessage,
  errorMessage: state.utils.errorMessage,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(MySnackBar)
