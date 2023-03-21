import { Link as RouterLink, useLocation } from "react-router-dom"

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
    if (pathname.includes(urls.pages.learningDiary)) return 4
    return false
  }, [location])

  return (
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
  )
}

export default NavbarTabs
