import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Toolbar,
} from "@material-ui/core";
import PATHS from "consts/PATHS";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { ApplicationState } from "../../store/store";
import Flex from "../shared/Flexboxes/Flex";
import FlexVCenter from "../shared/Flexboxes/FlexVCenter";
import LeftToggleButton from "./LeftToggleButton/LeftToggleButton";
import utils from "./Navbar.utils";
import Notification from "./Notification/Notification";
import SearchBar from "./SearchBar/SearchBar";
import UserMenu from "./UserMenu/UserMenu";

// PE 2/3
const Navbar = (props: Props) => {
  const classes = useStyles();
  const location = useLocation();

  const [tabIndex, setTabIndex] = useState<number | boolean>(false);

  useEffect(() => {
    // DRY?
    if (location.pathname.startsWith(PATHS.relearn.index)) {
      setTabIndex(0);
    } else if (location.pathname.startsWith(PATHS.feed.index)) {
      setTabIndex(1);
    } else if (location.pathname.startsWith(PATHS.skillbase.index)) {
      setTabIndex(2);
    } else if (location.pathname.startsWith(PATHS.define.index)) {
      setTabIndex(3);
    } else if (location.pathname.startsWith(PATHS.BigDecisions.index)) {
      setTabIndex(4);
    } else {
      setTabIndex(false);
    }
  }, [location]);

  return (
    <AppBar className={classes.root} position="fixed" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <FlexVCenter>
          <LeftToggleButton />
          <Box ml={1} />
          <IconButton component={Link} to={PATHS.index} size="small">
            <FlexVCenter width={24} height={24} justifyContent="center">
              <FontAwesomeIcon icon={faFire} className={classes.fireIcon} />
            </FlexVCenter>
          </IconButton>

          <Box ml={2} />
          <SearchBar />
        </FlexVCenter>

        <Flex>
          <Tabs
            className={classes.tabs}
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            aria-label="disabled tabs example"
          >
            {utils.navbarTabs.map((tab) => (
              <Tab
                key={tab.id}
                id={tab.id}
                className={classes.tab}
                label={tab.label}
                component={Link}
                icon={tab.icon}
                to={tab.to}
              />
            ))}
          </Tabs>
        </Flex>

        <FlexVCenter>
          {/* <Switch>
            <Route
              path={PATHS.relearn.index}
              component={RelearnNavbarContent}
            />
          </Switch>
          <Flex mr={4} /> */}

          <Notification />
          <UserMenu />
        </FlexVCenter>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: "#202020",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    toolbar: {
      minHeight: 72,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    fireIcon: {
      color: theme.palette.secondary.main,
      height: "24px !important",
      width: "18px !important",
    },

    tabs: {
      // minHeight: 32,
      position: "relative",
      zIndex: 1202,
    },
    tab: {
      minWidth: 100,
      width: "inherit",
      color: "white",

      "& svg": {
        height: 16,
        fontSize: 16,
      },
    },
  })
);

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
