import { Button, useTheme } from "@material-ui/core";
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton";
import Flex from "components/_UI/Flexboxes/Flex";
import Txt from "components/_UI/Text/Txt";
import useSkillQuery from "hooks/react-query/skillbase/skill/useSkillQuery";
import React, { useMemo } from "react";
import { MdAdd } from "react-icons/md";
import { SkillDto } from "types/domain/skillbase/SkillDto";

interface Props {
  skill: SkillDto;
  onOpenLabelsDialog: () => void;
}

const SkillDialogLabels = (props: Props) => {
  const theme = useTheme();
  const { data: skillWithLabels } = useSkillQuery(props.skill.id);

  const sortedLabels = useMemo(() => {
    if (!skillWithLabels) return [];
    return skillWithLabels.labels.sort((a, b) => (a.id > b.id ? 1 : -1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(skillWithLabels)]);

  return (
    <Flex mt={2} style={{ flexDirection: "column" }}>
      <Txt variant="h6">Labels</Txt>
      <Flex style={{ gap: theme.spacing(1) }}>
        {sortedLabels.map((label) => (
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
