import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { faFunnelDollar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import {
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { urls } from "utils/urls"

function MonerateSubmenu() {
  const classes = useStyles()

  const location = useLocation()
  const pathName = location.pathname

  const [openMonerate, setOpenMonerate] = useState<boolean>(
    pathName.startsWith(urls.pages.settings.monerate.index)
  )

  return (
    <React.Fragment>
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
            selected={pathName.startsWith(urls.pages.settings.monerate.places)}
            component={Link}
            to={urls.pages.settings.monerate.places}
          >
            <ListItemText primary="Places" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            selected={pathName.startsWith(
              urls.pages.settings.monerate.categories
            )}
            component={Link}
            to={urls.pages.settings.monerate.categories}
          >
            <ListItemText primary="Categories" />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
)

export default MonerateSubmenu
