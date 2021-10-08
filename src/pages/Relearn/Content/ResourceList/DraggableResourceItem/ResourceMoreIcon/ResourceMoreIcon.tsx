import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import API from "../../../../../../consts/API";
import myAxios from "../../../../../../consts/myAxios";
import { ResourceDto } from "../../../../../../interfaces/dtos/relearn/ResourceDto";
import {
  editResource,
  removeResource,
  setResources,
} from "../../../../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../../../../store/store";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../../../../../../store/utils/utilsActions";

// PE 1/3
function ResourceMoreIcon(props: Props) {
  const classes = useStyles();

  // Anchor when you click 'More' icon
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const handleDeleteResource = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      myAxios.delete(`${API.relearn.resource}/${id}`).then((res) => {
        props.setSuccessMessage("Resource deleted!");

        props.removeResource(id);
      });
    }
  };

  const duplicateResource = (resource: ResourceDto) => {
    myAxios
      .post<ResourceDto[]>(`${API.relearn.resourceDuplicate}/${resource.id}`)
      .then((res) => {
        props.setSuccessMessage("Resource duplicated!");

        props.setResources(res.data);
      })
      .catch((err) => {
        props.setErrorMessage(err.response.data.errors[0].message);
      });
  };

  return (
    <React.Fragment>
      {/* 'More' icon - PE 1/3 - can be a specific component */}

      <Box className={classes.moreButtonBox}>
        {props.isHovered && (
          <IconButton
            size="small"
            id="resource-more-icon"
            aria-label="resource-more-icon"
            onClick={(e) => {
              e.preventDefault();
              handleOpenMore(e);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        )}
      </Box>
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
            handleCloseMore();
            props.editResource(props.resource);
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
            handleCloseMore();
            duplicateResource(props.resource);
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <FileCopyIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Duplicate
          </Typography>
        </MenuItem>

        <Divider light />

        <MenuItem
          onClick={() => {
            handleCloseMore();
            handleDeleteResource(props.resource.id);
          }}
          id="delete-resource-button"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    width: 16,
  },
  moreButtonBox: {
    width: 32,
    minWidth: 32,
  },
}));

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) => dispatch(editResource(resource)),
  removeResource: (id: number) => dispatch(removeResource(id)),

  setResources: (resources: ResourceDto[]) => dispatch(setResources(resources)),

  setSuccessMessage: (message: string) => dispatch(setSuccessMessage(message)),
  setErrorMessage: (message: string) => dispatch(setErrorMessage(message)),
});

interface OwnProps {
  resource: ResourceDto;
  isHovered: boolean;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResourceMoreIcon);
