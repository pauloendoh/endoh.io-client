import { Box } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import React from "react";
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

        {(props.skill.currentLevel || props.skill.goalLevel) && (
          <S.InnerChip ml={1}>
            {/* only has current level */}
            {props.skill.currentLevel &&
              !props.skill.goalLevel &&
              props.skill.currentLevel}

            {/* only has goal */}
            {!props.skill.currentLevel && props.skill.goalLevel && (
              <>
                ?<ArrowRightAltIcon />
                {props.skill.goalLevel}
              </>
            )}

            {/* has both */}
            {props.skill.currentLevel && props.skill.goalLevel && (
              <>
                {props.skill.currentLevel}
                <ArrowRightAltIcon />
                {props.skill.goalLevel}
              </>
            )}
          </S.InnerChip>
        )}
      </Flex>
    </S.SkillButton>
  );
}

export default SkillChip;
