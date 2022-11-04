import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import AuthFormWrapper from "./AuthFormWrapper/AuthFormWrapper"
import FooterDescription from "./descriptions/FooterDescription/FooterDescription"
import LandingPageDescription from "./descriptions/LandingPageDescription"
import NotesDescription from "./descriptions/NotesDescription"
import RelearnDescription from "./descriptions/RelearnDescription"
import SkillbaseDescription from "./descriptions/SkillbaseDescription"
import SocialDescription from "./descriptions/SocialDescription"

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
          <AuthFormWrapper />
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

      <Box mt={10}>
        <SocialDescription />
      </Box>

      <Box mt={15}>
        <SkillbaseDescription />
      </Box>

      <Box mt={15} pb={5}>
        <NotesDescription />
      </Box>

      <Box mt={15} pb={5}>
        <FooterDescription />
      </Box>
    </Container>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  flexGrow: {
    flexGrow: 1,
  },
  checkApplications: {
    [theme.breakpoints.down("md")]: {
      marginTop: 32,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 160,
    },
  },
}))

export default LandingPage
