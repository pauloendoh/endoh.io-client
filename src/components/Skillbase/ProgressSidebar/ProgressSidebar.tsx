import { createStyles, Drawer, makeStyles, Theme, Toolbar } from "@mui/material"
import useSidebarStore from "../../../store/zustand/useSidebarStore"

// PE 1/3 - remove?
function ProgressSidebar() {
  const classes = useStyles()

  const { sidebarIsOpen } = useSidebarStore()

  return (
    <Drawer
      anchor="left"
      className={classes.root}
      variant="persistent"
      open={sidebarIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
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

export default ProgressSidebar
