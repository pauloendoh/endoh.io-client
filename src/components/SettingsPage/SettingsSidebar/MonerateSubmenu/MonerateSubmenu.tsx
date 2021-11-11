import { faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import pageUrls from "../../../../utils/consts/pageUrls";

function MonerateSubmenu() {
  const classes = useStyles();

  const location = useLocation();
  const pathName = location.pathname;

  const [openMonerate, setOpenMonerate] = useState<boolean>(
    pathName.startsWith(pageUrls.settings.monerate.index)
  );

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() => {
          setOpenMonerate(!openMonerate);
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
            selected={pathName.startsWith(pageUrls.settings.monerate.places)}
            component={Link}
            to={pageUrls.settings.monerate.places}
          >
            <ListItemText primary="Places" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            selected={pathName.startsWith(
              pageUrls.settings.monerate.categories
            )}
            component={Link}
            to={pageUrls.settings.monerate.categories}
          >
            <ListItemText primary="Categories" />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default MonerateSubmenu;
