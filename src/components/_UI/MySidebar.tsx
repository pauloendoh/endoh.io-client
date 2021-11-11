import {
  Box,
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core"
import React from "react"
import useSidebarStore from "../../store/zustand/useSidebarStore"

const MySidebar = (props: React.ComponentProps<typeof Drawer>) => {
  const { sidebarIsOpen } = useSidebarStore()
  
  const classes = useStyles()

  return (
    <Drawer
      anchor="left"
      className={classes.root}
      variant="persistent"
      open={sidebarIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
      {...props}
    >
      <Toolbar />
      <Box>{props.children}</Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
    },
    drawerPaper: {
      width: 300,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
  })
)

export default MySidebar
