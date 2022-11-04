import {
  Box,
  createStyles,
  Drawer,
  List,
  makeStyles,
  Theme,
  Toolbar,
} from "@mui/material"
import GeneralSubmenu from "./GeneralSubmenu/GeneralSubmenu"

// PE 3/3
function SettingsSidebar() {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box>
        <List>
          <GeneralSubmenu />
          {/* <MonerateSubmenu /> */}
        </List>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 200,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
  })
)

export default SettingsSidebar
