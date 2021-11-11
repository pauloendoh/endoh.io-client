import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import useSidebarStore from "../../../../../store/zustand/useSidebarStore";

const LeftToggleButton = () => {
  const { toggleSidebar } = useSidebarStore();

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
  );
};

export default LeftToggleButton;
