import { faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import PATHS from "../../../../consts/PATHS"

function GeneralSubmenu() {
  const classes = useStyles()

  const location = useLocation()
  const pathName = location.pathname

  const [openGeneral, setOpenGeneral] = useState<boolean>(
    // pathName.startsWith(PATHS.settings.account) // n sei pq não tá funcionando...
    true
  )

  return (
    <React.Fragment>
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
        <List component="div" disablePadding>
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
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
)

export default GeneralSubmenu
