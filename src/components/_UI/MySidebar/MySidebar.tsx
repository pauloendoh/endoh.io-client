import {
  Box,
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import useSidebarStore from "../../../store/zustand/useSidebarStore";
import S from "./MySidebar.styles";

const MySidebar = (props: React.ComponentProps<typeof Drawer>) => {
  const { sidebarIsOpen } = useSidebarStore();

  const classes = useStyles();

  return (
    <S.RootDrawer
      anchor="left"
      variant="persistent"
      open={sidebarIsOpen}
      classes={{
        // unfortunately, can't remove this
        paper: classes.drawerPaper,
      }}
      {...props}
    >
      <Toolbar />
      <Box>{props.children}</Box>
    </S.RootDrawer>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: 300,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
  })
);

export default MySidebar;
