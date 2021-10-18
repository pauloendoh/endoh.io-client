import { Button, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { newSkillDto, SkillDto } from "../../../../dtos/skillbase/SkillDto";
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto";
import { setEditingSkill } from "../../../../store/skillbase/skillbaseActions";

// PE 2/3
interface OwnProps {
  tag: TagDto | "Untagged";
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
});

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps;

const AddSkillButton = (props: Props) => {
  const handleClick = () => {
    // PE 2/3
    if (props.tag === "Untagged" || props.tag === null)
      props.setEditingSkill(newSkillDto(null));
    else props.setEditingSkill(newSkillDto(props.tag.id));
  };

  return (
    <Tooltip title="(q) Quick Add Skill">
      <Button
        id="add-skill-btn"
        onClick={handleClick}
        size="small"
        variant="contained"
        color="primary"
        startIcon={<AddIcon fontSize="small" />}
      >
        Add Skill
      </Button>
    </Tooltip>
  );
};

export default connect(undefined, mapDispatchToProps)(AddSkillButton);
