import { faFunnelDollar, faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  Collapse,
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import {
  IWithRedirectProps,
  withRedirect,
} from "../../../components/hocs/withRedirect"
import PATHS from "../../../consts/PATHS"
import { logoutActionCreator } from "../../../store/auth/authActions"
import { ApplicationState } from "../../../store/store"

function SettingsSidebar(props: Props) {
  const classes = useStyles()

  const location = useLocation()
  const pathName = location.pathname

  const [openGeneral, setOpenGeneral] = useState<boolean>(
    // pathName.startsWith(PATHS.settings.account) // n sei pq não tá funcionando...
    true
  )

  const [openMonerate, setOpenMonerate] = useState<boolean>(
    pathName.startsWith(PATHS.settings.monerate.index)
  )

  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box className={classes.drawerContainer}>
        <List>
          {/* PE 1/3 - Create a <GeneralSettingsSubmenu> */}
          <ListItem
            button
            onClick={() => {
              setOpenGeneral(!openGeneral)
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faUserAlt} />
            </ListItemIcon>
            <ListItemText primary="General" />
            {openGeneral ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGeneral} timeout="auto" unmountOnExit>
            <List>
              <ListItem
                button
                className={classes.nested}
                selected={pathName.startsWith(PATHS.settings.account)}
                component={Link}
                to={PATHS.settings.account}
                // onClick={() => handleClickSubmenu(PATHS.settings.account)}
              >
                <ListItemText primary="Account" />
              </ListItem>
            </List>
          </Collapse>

          {/* PE 1/3 - Create a <MonerateSettingsSubmenu/>  */}
          <ListItem
            button
            onClick={() => {
              setOpenMonerate(!openMonerate)
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faFunnelDollar} />
            </ListItemIcon>
            <ListItemText primary="Monerate" />
            {openMonerate ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMonerate} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                selected={pathName.startsWith(PATHS.settings.monerate.places)}
                component={Link}
                to={PATHS.settings.monerate.places}
              >
                <ListItemText primary="Places" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                selected={pathName.startsWith(
                  PATHS.settings.monerate.categories
                )}
                component={Link}
                to={PATHS.settings.monerate.categories}
              >
                <ListItemText primary="Categories" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>
      {/* {changePathnameTo.length ? <Redirect to={changePathnameTo} /> : null} */}
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      flexShrink: 0,
    },

    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
      width: 200,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
    drawerContainer: {
      // overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
)

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logoutActionCreator(dispatch)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SettingsSidebar)
