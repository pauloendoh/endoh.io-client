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
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import pageUrls from "utils/consts/pageUrls";
import { mediaQueries } from "utils/styles/mediaQueries";
import { ApplicationState } from "../../../../store/store";
import Flex from "../../../_UI/Flexboxes/Flex";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import LeftToggleButton from "./LeftToggleButton/LeftToggleButton";
import S from "./Navbar.styles";
import utils from "./Navbar.utils";
import NavbarAddButton from "./NavbarAddButton/NavbarAddButton";
import NavbarUserMenu from "./NavbarUserMenu/NavbarUserMenu";
import Notification from "./Notification/Notification";
import SearchBar from "./SearchBar/SearchBar";

// PE 2/3
const Navbar = (props: Props) => {
  const classes = useStyles();
  const location = useLocation();

  const [tabIndex, setTabIndex] = useState<number | boolean>(false);

  useEffect(() => {
    // DRY?
    if (location.pathname.startsWith(pageUrls.relearn.index)) {
      setTabIndex(0);
    } else if (location.pathname.startsWith(pageUrls.feed.index)) {
      setTabIndex(1);
    } else if (location.pathname.startsWith(pageUrls.skillbase.index)) {
      setTabIndex(2);
    } else if (location.pathname.startsWith(pageUrls.define.index)) {
      setTabIndex(3);
    } else if (location.pathname.startsWith(pageUrls.BigDecisions.index)) {
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
          <IconButton component={Link} to={pageUrls.index} size="small">
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

        <S.ActionButtonsWrapper>
          <NavbarAddButton />
          <Notification />
          <NavbarUserMenu />
        </S.ActionButtonsWrapper>
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
      width: "inherit",
      color: "white",

      "& svg": {
        height: 16,
        fontSize: 16,
      },

      [mediaQueries.isBiggerThan(950)]: {
        minWidth: 100,
      },

      [mediaQueries.isSmallerThan(950)]: {
        minWidth: "auto",
      },
    },
  })
);

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
