import {
  Badge,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import useNewResourcesCountQuery from "hooks/react-query/feed/last-seen-resource/useNewResourcesCountQuery"
import { useMemo, useState } from "react"
import { MdArrowDropDown, MdOutlineMoreHoriz } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"
import utils from "../NavbarTabs/NavbarTabs.utils"

// PE 2/3
const NavbarResponsiveMenu = () => {
  const location = useLocation()

  // down 865px
  const isSmall = useMediaQuery("(max-width: 865px)")

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const selectedTab = useMemo(() => {
    const tab = utils.navbarTabs.find((tab) =>
      location.pathname.includes(tab.to)
    )
    if (tab) return tab

    if (location.pathname.includes("/user")) {
      return utils.navbarTabs[1]
    }
    return utils.navbarTabs[0]
  }, [location])

  const { data: newResourcesCount } = useNewResourcesCountQuery()

  return (
    <div>
      {isSmall ? (
        <IconButton onClick={handleOpenMenu}>
          <MdOutlineMoreHoriz />
        </IconButton>
      ) : (
        <Button
          onClick={handleOpenMenu}
          color="inherit"
          startIcon={selectedTab?.icon}
          endIcon={<MdArrowDropDown />}
        >
          {selectedTab?.label}
        </Button>
      )}

      <Badge
        color="error"
        variant={
          newResourcesCount && newResourcesCount > 0 ? "dot" : "standard"
        }
        sx={{
          "& .MuiBadge-badge": {
            top: -16,
          },
        }}
      >
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {utils.navbarTabs.map((tab) => (
            <MenuItem
              component={Link}
              to={tab.to}
              onClick={handleCloseMenu}
              selected={location.pathname.includes(tab.to)}
            >
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <Badge
                key={tab.id}
                badgeContent={
                  tab.id === "feed-tab" ? newResourcesCount : undefined
                }
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    right: -24,
                  },
                }}
              >
                <ListItemText>{tab.label}</ListItemText>
              </Badge>
            </MenuItem>
          ))}
        </Menu>
      </Badge>
    </div>
  )
}

export default NavbarResponsiveMenu
