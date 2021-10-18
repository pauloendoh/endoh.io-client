import {
  createStyles,
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as relearnActions from "../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../store/store";
import * as utilsActions from "../../../store/utils/utilsActions";
import { TagDto } from "../../../types/domain/relearn/TagDto";
import API from "../../../utils/consts/API";
import myAxios from "../../../utils/consts/myAxios";

// PE 2/3 - MenuItem could be shorter?
function TagMoreIcon(props: Props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null); // avoids error "The `anchorEl` prop provided to the component is invalid"
  };

  // handleDelete would be better?
  const handleDeleteTag = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      myAxios.delete(`${API.relearn.tag}/${id}`).then((res) => {
        props.setSuccessMessage("Tag deleted!");

        props.afterDelete();

        props.removeTag(id);
      });
    }
  };

  return (
    <React.Fragment>
      <IconButton
        id="tag-more"
        size="small"
        aria-label="tag-more"
        onClick={(e) => {
          e.preventDefault();
          handleOpenMore(e);
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="tag-more"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e) => {
          const event = e as any;
          event.preventDefault();
          handleCloseMore();
        }}
      >
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            props.editTag(props.tag);
            handleCloseMore();
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Edit
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            handleDeleteTag(props.tag.id);
          }}
          id="delete-tag-button"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap color="error">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagListItem: {
      paddingLeft: theme.spacing(4),
      alignItems: "flex-start",
    },
    moreButtonBox: {
      position: "absolute",
      width: 32,
      height: 32,
      right: 0,
    },

    listItemIcon: {
      width: 16,
    },
  })
);

const mapStateToProps = (state: ApplicationState) => ({
  // user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editTag: (tag: TagDto) => dispatch(relearnActions.editTag(tag)),
  removeTag: (id: number) => dispatch(relearnActions.removeTag(id)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
});

interface OwnProps {
  tag: TagDto;
  afterDelete?: () => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(TagMoreIcon);
