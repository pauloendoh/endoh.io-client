import { faFire } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, makeStyles, Typography } from "@mui/material"
import FlexHCenter from "../../_UI/Flexboxes/FlexHCenter"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"

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
          Online tools for self-learners
        </Typography>
      </FlexHCenter>
    </FlexHCenter>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      marginTop: 32,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 16,
    },
  },
  fireIcon: {
    color: theme.palette.secondary.main,
  },
}))

export default LandingPageDescription
