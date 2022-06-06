import { Box } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import React, { useMemo } from "react";
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore";
import { SkillDto } from "../../../types/domain/skillbase/SkillDto";
import Flex from "../../_UI/Flexboxes/Flex";
import S from "./SkillChip.styles";

interface Props {
  skill: SkillDto;
}

// PE 1/3 delete?
function SkillChip(props: Props) {
  const { setEditingSkill } = useSkillbaseStore();

  const currentGoalLevel = useMemo(() => {
    return props.skill.expectations.find((e) => e.isCurrentGoal).level;
  }, [props.skill.expectations]);

  return (
    <S.SkillButton
      key={props.skill.id}
      variant="outlined"
      size="small"
      onClick={() => {
        setEditingSkill(props.skill);
      }}
    >
      <Flex>
        <Box>{props.skill.name}</Box>

        {(props.skill.currentLevel || currentGoalLevel) && (
          <S.InnerChip ml={1}>
            {/* only has current level */}
            {props.skill.currentLevel &&
              !currentGoalLevel &&
              props.skill.currentLevel}

            {/* only has currentGoalLevel */}
            {!props.skill.currentLevel && currentGoalLevel && (
              <>
                ?<ArrowRightAltIcon />
                {currentGoalLevel}
              </>
            )}

            {/* has both */}
            {props.skill.currentLevel && currentGoalLevel && (
              <>
                {props.skill.currentLevel}
                <ArrowRightAltIcon />
                {currentGoalLevel}
              </>
            )}
          </S.InnerChip>
        )}
      </Flex>
    </S.SkillButton>
  );
}

export default SkillChip;
