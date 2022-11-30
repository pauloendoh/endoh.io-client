import { faFire } from "@fortawesome/free-solid-svg-icons"
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material"
import { useEffect } from "react"
import { MdArrowBack, MdSearch } from "react-icons/md"
import { Link as RouterLink } from "react-router-dom"
import useResponsiveStore from "store/zustand/useResponsiveStore"
import useSidebarStore from "store/zustand/useSidebarStore"
import { urls } from "utils/urls"
import Flex from "../../../_UI/Flexboxes/Flex"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import LeftToggleButton from "./LeftToggleButton/LeftToggleButton"
import S from "./Navbar.styles"
import NavbarAddButton from "./NavbarAddButton/NavbarAddButton"
import NavbarResponsiveMenu from "./NavbarResponsiveMenu/NavbarResponsiveMenu"
import NavbarTabs from "./NavbarTabs/NavbarTabs"
import NavbarUserMenu from "./NavbarUserMenu/NavbarUserMenu"
import Notification from "./Notification/Notification"
import SearchBarWrapper from "./SearchBarWrapper/SearchBarWrapper"

// PE 2/3
const Navbar = () => {
  const theme = useTheme()
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"))
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const [
    toggleIsResponsiveSearching,
    isResponsiveSearching,
    setIsResponsiveSearching,
  ] = useResponsiveStore((s) => [
    s.toggleIsResponsiveSearching,
    s.isResponsiveSearching,
    s.setIsResponsiveSearching,
  ])

  const closeSidebar = useSidebarStore((s) => s.closeSidebar)

  useEffect(() => {
    if (!isXsScreen) setIsResponsiveSearching(false)
  }, [isXsScreen])

  // PE 1/3 - improve
  return (
    <S.AppBarRoot position="fixed" elevation={0}>
      <S.NavbarToolbar>
        {isXsScreen && isResponsiveSearching ? (
          <FlexVCenter gap={1}>
            <IconButton onClick={() => setIsResponsiveSearching(false)}>
              <MdArrowBack />
            </IconButton>

            <SearchBarWrapper />
          </FlexVCenter>
        ) : (
          <>
            <FlexVCenter>
              <LeftToggleButton />
              <Box ml={1} />
              <IconButton
                component={RouterLink}
                to={urls.pages.index}
                size="small"
              >
                <FlexVCenter width={24} height={24} justifyContent="center">
                  <S.FireIcon icon={faFire} />
                </FlexVCenter>
              </IconButton>

              <Box ml={2} />

              {isXsScreen ? (
                <IconButton
                  onClick={() => {
                    closeSidebar()
                    setIsResponsiveSearching(true)
                  }}
                >
                  <MdSearch />
                </IconButton>
              ) : (
                <SearchBarWrapper />
              )}
            </FlexVCenter>

            <Flex>{!isDownLg && <NavbarTabs />}</Flex>

            <S.RightButtonsWrapper>
              {isDownLg && <NavbarResponsiveMenu />}
              <NavbarAddButton />
              <Notification />
              <NavbarUserMenu />
            </S.RightButtonsWrapper>
          </>
        )}
      </S.NavbarToolbar>
    </S.AppBarRoot>
  )
}

export default Navbar
