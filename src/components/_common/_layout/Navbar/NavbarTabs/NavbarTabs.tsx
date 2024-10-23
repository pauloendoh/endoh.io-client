import { Link as RouterLink, useLocation } from "react-router-dom"

import { Badge, Tab, Tabs } from "@mui/material"
import { useMemo } from "react"
import { urls } from "utils/urls"
import useUtils from "./NavbarTabs.utils"

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

  const { navbarTabs } = useUtils()

  return (
    <Tabs
      value={tabIndex}
      indicatorColor="primary"
      textColor="primary"
      aria-label="disabled tabs example"
      sx={{
        zIndex: 1202,
        position: "relative",
      }}
    >
      {navbarTabs.map((tab) => (
        <Tab
          id={tab.id}
          component={RouterLink}
          to={tab.to}
          key={tab.id}
          label={
            <Badge
              badgeContent={tab.badgeCount}
              color="error"
              invisible={!tab.badgeCount}
              sx={{
                "& .MuiBadge-badge": {
                  right: -8,
                  top: -16,
                },
              }}
            >
              {tab.label}
            </Badge>
          }
          icon={tab.icon}
          sx={{
            width: "inherit",
            color: "white",
            minWidth: {
              md: 100,
              xs: "auto",
            },
            "& svg": {
              height: 16,
              fontSize: 16,
            },
          }}
        />
      ))}
    </Tabs>
  )
}

export default NavbarTabs
