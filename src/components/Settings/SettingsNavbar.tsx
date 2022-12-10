import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  AppBar,
  Box,
  Button,
  createStyles,
  Toolbar,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { urls } from "utils/urls"
import FlexVCenter from "../_UI/Flexboxes/FlexVCenter"

const SettingsNavbar = () => {
  const classes = useStyles()
  const location = useLocation()

  const [closeHref, setCloseHref] = useState("/")

  useEffect(() => {
    if (location.pathname.startsWith(urls.pages.settings.monerate.index)) {
      setCloseHref(urls.pages.monerateIndex)
    } else {
      setCloseHref("/")
    }
  }, [location])

  return (
    <AppBar className={classes.root} position="fixed" elevation={0}>
      <Toolbar>
        <Typography variant="h5">Settings</Typography>
        <Box ml="auto">
          <Link to={closeHref} style={{ textDecoration: "none" }}>
            <Button>
              <FlexVCenter>
                <Box mr={1}>
                  <Typography variant="h6">Close</Typography>
                </Box>
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </FlexVCenter>
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: "#202020",
      zIndex: theme.zIndex.drawer + 1,
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
  })
)

export default SettingsNavbar
