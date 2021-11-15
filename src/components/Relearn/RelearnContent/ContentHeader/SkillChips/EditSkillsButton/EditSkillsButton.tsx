import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../../../../store/store";
import { TagDto } from "../../../../../../types/domain/relearn/TagDto";
import pageUrls from "../../../../../../utils/url/urls/pageUrls";
import FlexVCenter from "../../../../../_UI/Flexboxes/FlexVCenter";
import EditSkillsDialog from "./EditSkillsDialog/EditSkillsDialog";

// PE 2/3
function EditSkillsButton(props: Props) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  const [tagForDialog, setTagForDialog] = useState<TagDto>(null);

  const getSkillsFromCurrentTag = () => {
    const tagId = Number(pathname.split("/").pop());
    if (tagId) {
      return props.allSkills.filter((skill) => skill.tagId === tagId);
    }
    return [];
  };

  const handleEditSkillsClick = () => {
    const tagId = Number(pathname.split("/").pop());
    if (tagId) {
      const currentTag = props.allTags.find((t) => t.id === tagId);
      setTagForDialog(currentTag);
    } else history.push(pageUrls.skillbase.index);
  };

  const handleCloseDialog = () => {
    setTagForDialog(null);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleEditSkillsClick}
        variant="outlined"
        size="small"
        color="secondary"
        className={classes.editSkillsButton}
      >
        Edit Skills
        <FlexVCenter ml={1} className={classes.innerChip}>
          {getSkillsFromCurrentTag().length}
        </FlexVCenter>
      </Button>

      <EditSkillsDialog tag={tagForDialog} onClose={handleCloseDialog} />
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  innerChip: {
    background: theme.palette.secondary.main,
    color: "#fff",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
  },
  editSkillsButton: {
    marginBottom: 8,
  },
}));

const mapStateToProps = (state: ApplicationState) => ({
  allSkills: state.skillbase.skills,
  allTags: state.relearn.tags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(EditSkillsButton);
