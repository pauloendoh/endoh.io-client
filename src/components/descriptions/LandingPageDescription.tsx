import { faFire } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import FlexHCenter from "../shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../shared/Flexboxes/FlexVCenter"

const LandingPageDescription = () => {
  const classes = useStyles()

  return (
    <FlexHCenter mx="auto" maxWidth={350} className={classes.root}>
      <Typography variant="h3">
        <FlexVCenter fontWeight={500}>
          <FontAwesomeIcon icon={faFire} className={classes.fireIcon} />
          <Box ml={1}>endoh.io</Box>
        </FlexVCenter>
      </Typography>
      <FlexHCenter mt={1}>
        {/* TODO: create a utils/SecondaryTxt */}
        <Typography variant="subtitle1">
          A suite of self-awareness tools
        </Typography>
      </FlexHCenter>
    </FlexHCenter>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]:{
      marginTop: 32
    },
    [theme.breakpoints.down('xs')]:{
      marginTop: 16
    },
  },
  fireIcon: {
    color: theme.palette.secondary.main,
  },
}))

export default LandingPageDescription
