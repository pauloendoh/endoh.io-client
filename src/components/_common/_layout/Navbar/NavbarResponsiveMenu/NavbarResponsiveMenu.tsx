import { Button, IconButton, ListItemIcon, ListItemText } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import { useMemo, useState } from "react"
import { MdArrowDropDown, MdOutlineMoreHoriz } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"
import utils from "../NavbarTabs/NavbarTabs.utils"

// PE 2/3
const NavbarResponsiveMenu = () => {
  const location = useLocation()

  const { downLg, downMd } = useMyMediaQuery()

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
      {downMd ? (
        <Button
          onClick={handleOpenMenu}
          variant="contained"
          color="secondary"
          startIcon={selectedTab?.icon}
          endIcon={<MdArrowDropDown />}
        >
          {selectedTab?.label}
        </Button>
      ) : (
        <IconButton onClick={handleOpenMenu}>
          <MdOutlineMoreHoriz />
        </IconButton>
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
