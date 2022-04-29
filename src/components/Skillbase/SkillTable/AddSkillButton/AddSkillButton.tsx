import { Button, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore";
import { TagDto } from "../../../../types/domain/relearn/TagDto";
import { newSkillDto } from "../../../../types/domain/skillbase/SkillDto";

// PE 2/3
interface Props {
  tag: TagDto | "Untagged";
}

const AddSkillButton = (props: Props) => {
  const { setEditingSkill } = useSkillbaseStore();
  const handleClick = () => {
    // PE 2/3
    if (props.tag === "Untagged" || props.tag === null)
      setEditingSkill(newSkillDto(null));
    else setEditingSkill(newSkillDto(props.tag.id));
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

export default AddSkillButton;
