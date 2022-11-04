import MenuIcon from "@mui/icons-material/Menu"
import { IconButton } from "@mui/material"
import React from "react"
import useSidebarStore from "../../../../../store/zustand/useSidebarStore"

const LeftToggleButton = () => {
  const { toggleSidebar } = useSidebarStore()

  return (
    <React.Fragment>
      <IconButton
        onClick={toggleSidebar}
        aria-label="left-sidebar-toggle"
        size="small"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      {/* )} */}
    </React.Fragment>
  )
}

export default LeftToggleButton
