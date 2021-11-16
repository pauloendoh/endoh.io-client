import { Box } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setEditingSkill } from "../../../store/skillbase/skillbaseActions";
import { SkillDto } from "../../../types/domain/skillbase/SkillDto";
import Flex from "../../_UI/Flexboxes/Flex";
import S from "./SkillChip.styles";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
});

interface OwnProps {
  skill: SkillDto;
}

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps;

// PE 2/3
function SkillChip(props: Props) {
  return (
    <S.SkillButton
      key={props.skill.id}
      variant="outlined"
      size="small"
      onClick={() => {
        props.editSkill(props.skill);
      }}
    >
      <Flex>
        <Box>{props.skill.name}</Box>

        <S.InnerChip ml={1}>
          {props.skill.currentLevel > 0 ? props.skill.currentLevel : "?"}
          <ArrowRightAltIcon />
          {props.skill.currentGoal > 0 ? props.skill.currentGoal : "?"}
          <ArrowRightAltIcon />
          {props.skill.goalLevel > 0 ? props.skill.goalLevel : "?"}
        </S.InnerChip>
      </Flex>
    </S.SkillButton>
  );
}

export default connect(undefined, mapDispatchToProps)(SkillChip);
