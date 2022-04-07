import { Button, useTheme } from "@material-ui/core";
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton";
import Flex from "components/_UI/Flexboxes/Flex";
import Txt from "components/_UI/Text/Txt";
import useSkillQuery from "hooks/react-query/skillbase/skill/useSkillQuery";
import React from "react";
import { MdAdd } from "react-icons/md";
import { SkillDto } from "types/domain/skillbase/SkillDto";

interface Props {
  skill: SkillDto;
  onOpenLabelsDialog: () => void;
}

const SkillDialogLabels = (props: Props) => {
  const theme = useTheme();
  const { data: skillWithLabels } = useSkillQuery(props.skill.id);

  return (
    <Flex mt={2} style={{ flexDirection: "column" }}>
      <Txt variant="h6">Labels</Txt>
      <Flex style={{ gap: theme.spacing(1) }}>
        {skillWithLabels?.labels.map((label) => (
          <Button
            key={label.id}
            variant="contained"
            style={{ backgroundColor: label.bgColor }}
            onClick={props.onOpenLabelsDialog}
          >
            <Txt style={{ fontWeight: "bold", color: "white" }}>
              {label.name}
            </Txt>
          </Button>
        ))}

        <DarkButton
          onClick={props.onOpenLabelsDialog}
          style={{ minWidth: 0, width: 32 }}
        >
          <MdAdd />
        </DarkButton>
      </Flex>
    </Flex>
  );
};

export default SkillDialogLabels;
