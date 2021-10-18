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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IdsDto } from "../../../../dtos/IdsDto";
import { SkillDto } from "../../../../dtos/skillbase/SkillDto";
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto";
import * as relearnActions from "../../../../store/relearn/relearnActions";
import { removeSkills } from "../../../../store/skillbase/skillbaseActions";
import { ApplicationState } from "../../../../store/store";
import * as utilsActions from "../../../../store/utils/utilsActions";
import API from "../../../../utils/consts/API";
import myAxios from "../../../../utils/consts/myAxios";

// PE 2/3 - MenuItem could be shorter?
function SkillMoreIcon(props: Props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null); // avoids error "The `anchorEl` prop provided to the component is invalid"
  };

  // handleDelete would be better?
  const handleDelete = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      myAxios
        .delete<SkillDto[]>(API.skillbase.skill, {
          headers: {}, // why is this?
          data: { ids: [id] } as IdsDto,
        })
        .then((res) => {
          props.removeSkills([id]);
          props.setSuccessMessage("Skill deleted successfully!");
          props.afterDelete();
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
            handleDelete(props.skillId);
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
  removeSkills: (ids: number[]) => dispatch(removeSkills(ids)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
});

interface OwnProps {
  skillId: number;
  afterDelete: () => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(SkillMoreIcon);
