import { Link as RouterLink, useLocation } from "react-router-dom"

import { Badge } from "@mui/material"
import useNewResourcesCountQuery from "hooks/react-query/feed/last-seen-resource/useNewResourcesCountQuery"
import { useMemo } from "react"
import { urls } from "utils/urls"
import S from "../Navbar.styles"
import utils from "./NavbarTabs.utils"

const NavbarTabs = () => {
  const location = useLocation()

  const tabIndex = useMemo(() => {
    const { pathname } = location
    if (pathname.startsWith(urls.pages.resources.index)) return 0
    if (pathname.startsWith(urls.pages.feed.index)) return 1
    if (pathname.startsWith(urls.pages.skills.index)) return 2
    if (pathname.startsWith(urls.pages.questions.index)) return 3
    // if (pathname.includes(urls.pages.learningDiary)) return 4
    return false
  }, [location])

  const { data: newResourcesCount } = useNewResourcesCountQuery()

  return (
    <S.NavbarTabs
      value={tabIndex}
      indicatorColor="primary"
      textColor="primary"
      aria-label="disabled tabs example"
    >
      {utils.navbarTabs.map((tab) => (
        <Badge
          key={tab.id}
          badgeContent={tab.id === "feed-tab" && newResourcesCount}
          color="error"
          invisible={tab.id !== "feed-tab"}
          sx={{
            "& .MuiBadge-badge": {
              right: 16,
              top: 16,
            },
          }}
        >
          <S.NavbarTab
            id={tab.id}
            component={RouterLink}
            to={tab.to}
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
          />
        </Badge>
      ))}
    </S.NavbarTabs>
  )
}

export default NavbarTabs
