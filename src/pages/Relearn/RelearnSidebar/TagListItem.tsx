import {
  Box,
  createStyles,
  IconButton,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter";
import PATHS from "../../../consts/PATHS";
import { TagDto } from "../../../dtos/relearn/TagDto";
import * as relearnActions from "../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../store/store";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function TagListItem(props: Props) {
  const classes = useStyles();

  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem
      key={props.tag.id}
      className={classes.nested}
      button
      component={Link}
      to={PATHS.relearn.tag + "/" + props.tag.id}
      selected={pathName === PATHS.relearn.tag + "/" + props.tag.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ListItemText>
        {"# " + props.tag.name}
        <Typography variant="inherit" className={classes.categoriesCount}>
          {props.tag.resources.length}
        </Typography>
      </ListItemText>

      {isHovered && (
        <IconButton size="small" aria-label="tag-more" onClick={handleOpenMore}>
          <MoreHorizIcon />
        </IconButton>
      )}

      <Menu
        id="tag-more"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMore}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </ListItem>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },

    categoriesCount: {
      marginLeft: 8,
      fontSize: 12,
      color: theme.palette.grey[400],
    },
  })
);

const mapStateToProps = (state: ApplicationState) => ({
  // user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  // logout: () => dispatch(logoutActionCreator(dispatch)),
});

interface OwnProps {
  tag: TagDto;
  // onCloseForm: () => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(TagListItem);
