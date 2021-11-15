import { faFire } from "@fortawesome/free-solid-svg-icons";
import { Box, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import pageUrls from "utils/url/urls/pageUrls";
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
const Navbar = () => {
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
    <S.AppBarRoot position="fixed" elevation={0}>
      <S.NavbarToolbar>
        <FlexVCenter>
          <LeftToggleButton />
          <Box ml={1} />
          <IconButton component={RouterLink} to={pageUrls.index} size="small">
            <FlexVCenter width={24} height={24} justifyContent="center">
              <S.FireIcon icon={faFire} />
            </FlexVCenter>
          </IconButton>

          <Box ml={2} />
          <SearchBar />
        </FlexVCenter>

        <Flex>
          <S.NavbarTabs
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            aria-label="disabled tabs example"
          >
            {utils.navbarTabs.map((tab) => (
              <S.NavbarTab
                id={tab.id}
                component={RouterLink}
                to={tab.to}
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
              />
            ))}
          </S.NavbarTabs>
        </Flex>

        <S.RightButtonsWrapper>
          <NavbarAddButton />
          <Notification />
          <NavbarUserMenu />
        </S.RightButtonsWrapper>
      </S.NavbarToolbar>
    </S.AppBarRoot>
  );
};

export default Navbar;
