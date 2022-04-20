import { IconButton } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import Txt from "components/_UI/Text/Txt";
import React from "react";
import { MdEdit } from "react-icons/md";
import { LabelDto } from "types/domain/skillbase/LabelDto";

interface Props {
  label: LabelDto;
  isSelected: boolean;
  onToggle: () => void;
  onClickEdit: () => void;
}

const SkillLabelOption = ({
  label,
  onClickEdit,
  onToggle,
  isSelected,
}: Props) => {
  return (
    <FlexVCenter style={{ justifyContent: "space-between" }}>
      <FlexVCenter
        onClick={onToggle}
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
        {isSelected && <Txt>✓</Txt>}
      </FlexVCenter>

      <IconButton size="small" style={{ marginLeft: 8 }} onClick={onClickEdit}>
        <MdEdit />
      </IconButton>
    </FlexVCenter>
  );
};

export default SkillLabelOption;
