import { faFire } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  AppBar,
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core"
import PATHS from "consts/PATHS"
import React from "react"
import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { Dispatch } from "redux"
import RelearnNavbarContent from "../../pages/Relearn/RelearnNavbarContent"
import { ApplicationState } from "../../store/store"
import FlexVCenter from "../shared/Flexboxes/FlexVCenter"
import ApplicationMenu from "./ApplicationMenu/ApplicationMenu"
import RightToggleButton from "./RightToggleButton/RightToggleButton"
import UserMenu from "./UserMenu/UserMenu"

// PE 2/3
const Navbar = (props: Props) => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} position="fixed" elevation={0}>
      <Toolbar>
        {/* PE 2/3 - Change into a sub component? <MyLogo/> */}
        <Button variant="text" href="/" className={classes.logoButton}>
          <Typography variant="h5">
            <FlexVCenter>
              <FontAwesomeIcon icon={faFire} className={classes.fireIcon} />
              <Box ml={1}>endoh.io</Box>
            </FlexVCenter>
          </Typography>
        </Button>

        <Box ml={2}>
          {/*  PE 2/3 - rename to ApplicationMenu ? */}
          <ApplicationMenu />
        </Box>

        <Switch>
          <Route path={PATHS.relearn.index} component={RelearnNavbarContent} />;
        </Switch>

        <FlexVCenter ml="auto">
          <UserMenu />
          <RightToggleButton />
        </FlexVCenter>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: "#202020",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    logoButton: {
      "&:hover": {
        background: "transparent",
      },
    },
    fireIcon: {
      color: theme.palette.secondary.main,
    },
  })
)

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
