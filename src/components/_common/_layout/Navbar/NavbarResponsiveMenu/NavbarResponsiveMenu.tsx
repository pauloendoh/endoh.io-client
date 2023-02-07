import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
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
    return utils.navbarTabs.find((tab) => location.pathname.includes(tab.to))
  }, [location])

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
            key={tab.id}
            component={Link}
            to={tab.to}
            onClick={handleCloseMenu}
            selected={location.pathname.includes(tab.to)}
          >
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <ListItemText>{tab.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default NavbarResponsiveMenu
