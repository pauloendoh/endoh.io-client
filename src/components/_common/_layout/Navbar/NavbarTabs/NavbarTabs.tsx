import { Link as RouterLink, useLocation } from "react-router-dom"

import { useEffect, useState } from "react"
import pageUrls from "utils/url/urls/pageUrls"
import { urls } from "utils/urls"
import S from "../Navbar.styles"
import utils from "./NavbarTabs.utils"

interface Props {
  test?: string
}

const NavbarTabs = (props: Props) => {
  const location = useLocation()

  const [tabIndex, setTabIndex] = useState<number | boolean>(false)

  // PE 1/3 - tabIndex useMemo
  useEffect(() => {
    // DRY?
    if (location.pathname.startsWith(urls.pages.relearn.index)) {
      setTabIndex(0)
    } else if (location.pathname.startsWith(pageUrls.feed.index)) {
      setTabIndex(1)
    } else if (location.pathname.startsWith(pageUrls.skillbase.index)) {
      setTabIndex(2)
    } else if (location.pathname.startsWith(pageUrls.questions.index)) {
      setTabIndex(3)
    } else if (location.pathname.includes(urls.pages.learningDiary)) {
      setTabIndex(4)
    } else {
      setTabIndex(false)
    }
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
