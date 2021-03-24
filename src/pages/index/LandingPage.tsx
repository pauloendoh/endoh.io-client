import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import React, { useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import FooterDescription from "../../components/descriptions/FooterDescription"
import LandingPageDescription from "../../components/descriptions/LandingPageDescription"
import MonerateDescription from "../../components/descriptions/MonerateDescription"
import RelearnDescription from "../../components/descriptions/RelearnDescription"
import AuthForm from "./AuthForm/AuthForm"

const LandingPage = () => {
  const classes = useStyles()

  useEffect(() => {
    document.title = "Endoh.io"
  }, [])
  return (
    <Container maxWidth="md">
      <Box pt={5} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LandingPageDescription />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AuthForm />
        </Grid>
      </Grid>

      <Box className={classes.checkApplications} textAlign="center">
        <ScrollLink
          to="relearn-description"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          <Button variant="text">
            <Box display="flex" flexDirection="column">
              <Typography variant="h4">Check applications</Typography>
              <Box>
                <ExpandMoreIcon />
              </Box>
            </Box>
          </Button>
        </ScrollLink>
      </Box>

      <Box mt={10}>
        <RelearnDescription />
      </Box>

      {/* <Box mt={10}>
        <MonerateDescription />
      </Box> */}

      <Box mt={15} pb={5}>
        <FooterDescription />
      </Box>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  flexGrow: {
    flexGrow: 1,
  },
  checkApplications: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 32,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 160,
    },
  },
}))

export default LandingPage
