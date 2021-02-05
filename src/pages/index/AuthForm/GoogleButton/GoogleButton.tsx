import { Box, Button, makeStyles } from "@material-ui/core"
import React from "react"
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter"
import googleIcon from "../../../../static/images/google-icon-white.png"
require("dotenv").config()

const GoogleButton = () => {
  const classes = useStyles()

  const handleGoogleSignIn = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open(process.env.REACT_APP_API_URL + "auth/google", "_self")
  }

  return (
    <Button
      onClick={handleGoogleSignIn}
      fullWidth
      className={classes.googleButton}
    >
      <FlexVCenter>
        <img src={googleIcon} height={24} alt="Google button" />
        {/* <FontAwesomeIcon className="fab fa-google"/> */}
        <Box ml={2} width={180}>
          Enter with Google
        </Box>
      </FlexVCenter>
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  googleButton: {
    paddingTop: 10,
    paddingBottom: 10,
    background: theme.palette.grey[800],
  },
}))

export default GoogleButton
