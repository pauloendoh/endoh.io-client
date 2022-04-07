import { CircularProgress, IconButton } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import Txt from "components/_UI/Text/Txt";
import useAttachSkillLabelMutation from "hooks/react-query/skillbase/skill-label/useAttachSkillLabelMutation";
import useDetachSkillLabelMutation from "hooks/react-query/skillbase/skill-label/useDetachSkillLabelMutation";
import useSkillQuery from "hooks/react-query/skillbase/skill/useSkillQuery";
import React from "react";
import { MdEdit } from "react-icons/md";
import { LabelDto } from "types/domain/skillbase/LabelDto";

interface Props {
  label: LabelDto;
  skillId: number;
  onClickEdit: () => void;
}

const SkillLabelOption = ({ label, skillId, onClickEdit }: Props) => {
  const { data: skill } = useSkillQuery(skillId);

  const isAttached = skill?.labels.some((l) => l.id === label.id);

  const { mutate: attachSkillLabel, isLoading: isAttaching } =
    useAttachSkillLabelMutation();
  const { mutate: detachSkillLabel, isLoading: isDetaching } =
    useDetachSkillLabelMutation();

  const isLoading = isAttaching || isDetaching;

  const handleClick = () => {
    if (isAttached) return detachSkillLabel({ skillId, labelId: label.id });
    return attachSkillLabel({ labelId: label.id, skillId });
  };

  return (
    <FlexVCenter style={{ justifyContent: "space-between" }}>
      <FlexVCenter
        onClick={handleClick}
        style={{
          background: label.bgColor,
          padding: "4px 8px",
          borderRadius: 4,
          cursor: "pointer",
          flexGrow: 1,
          justifyContent: "space-between",
          minHeight: 32,
        }}
      >
        <Txt style={{ fontWeight: "bold" }}>{label.name}</Txt>
        {isLoading && <CircularProgress size={12} />}
        {isAttached && !isLoading && <Txt>✓</Txt>}
      </FlexVCenter>

      <IconButton size="small" style={{ marginLeft: 8 }} onClick={onClickEdit}>
        <MdEdit />
      </IconButton>
    </FlexVCenter>
  );
};

export default SkillLabelOption;
