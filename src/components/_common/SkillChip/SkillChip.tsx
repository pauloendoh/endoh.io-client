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

export default connect(undefined, mapDispatchToProps)(SkillChip);
