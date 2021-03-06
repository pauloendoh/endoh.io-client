import { faFire } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core"
import PATHS from "consts/PATHS"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, Route, Switch, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import RelearnNavbarContent from "../../pages/Relearn/RelearnNavbarContent"
import { ApplicationState } from "../../store/store"
import Flex from "../shared/Flexboxes/Flex"
import FlexVCenter from "../shared/Flexboxes/FlexVCenter"
import LeftToggleButton from "./LeftToggleButton/LeftToggleButton"
import SearchBar from "./SearchBar/SearchBar"
import UserMenu from "./UserMenu/UserMenu"

// PE 2/3
const Navbar = (props: Props) => {
  const classes = useStyles()
  const location = useLocation()

  const [tabIndex, setTabIndex] = useState<number | boolean>(false)

  useEffect(() => {
    if (location.pathname.startsWith(PATHS.relearn.index)) {
      setTabIndex(0)
    } else if (location.pathname.startsWith(PATHS.feed.index)) {
      setTabIndex(1)
    } else if (location.pathname.startsWith(PATHS.skillbase.index)) {
      setTabIndex(2)
    } else {
      setTabIndex(false)
    }
  }, [location])

  return (
    <AppBar className={classes.root} position="fixed" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <FlexVCenter>
          <LeftToggleButton />

          <Button variant="text" href="/" className={classes.logoButton}>
            <Typography variant="h5">
              <FlexVCenter>
                <FontAwesomeIcon icon={faFire} className={classes.fireIcon} />

                {/* <Box ml={1}>endoh.io</Box> */}
              </FlexVCenter>
            </Typography>
          </Button>
          {/* 
          <Box ml={2}>
            <ApplicationMenu />
          </Box> */}
          <Switch>
            <Route path={PATHS.relearn.index} component={SearchBar} />
          </Switch>
        </FlexVCenter>

        <Flex>
          <Tabs
            className={classes.tabs}
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            aria-label="disabled tabs example"
          >
            <Tab
              className={classes.tab}
              label={`Resources`}
              component={Link}
              to={PATHS.relearn.index}
            />
            <Tab
              className={classes.tab}
              label={`Feed`}
              component={Link}
              to={PATHS.feed.index}
            />
            <Tab
              className={classes.tab}
              label={`Skills`}
              component={Link}
              to={PATHS.skillbase.index}
            />
          </Tabs>
        </Flex>

        <FlexVCenter>
          <Switch>
            <Route
              path={PATHS.relearn.index}
              component={RelearnNavbarContent}
            />
          </Switch>
          <Flex mr={4} />

          <UserMenu />
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
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoButton: {
      "&:hover": {
        background: "transparent",
      },
    },
    fireIcon: {
      color: theme.palette.secondary.main,
    },

    tabs: {
      // minHeight: 32,
      position: "relative",
      top: 5,
      zIndex: 1202,
    },
    tab: {
      fontSize: 16,
      paddingBottom: 16,
      minWidth: "inherit",
      width: "inherit",
      color: "white",
    },
  })
)

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
