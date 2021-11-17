import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@material-ui/core";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useTheme } from "styled-components";
import Icons from "utils/styles/Icons";
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
  const levelDiff = useMemo(() => {
    return props.skill.currentGoal - (props.skill.currentLevel || 0);
  }, [props.skill]);

  const theme = useTheme();

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
          <span>{props.skill.currentLevel || "?"}</span>
          <FlexVCenter
            style={{ gap: theme.spacing(0.25), marginLeft: theme.spacing(0.5) }}
          >
            <span>+{levelDiff}</span>
            <FontAwesomeIcon
              icon={faFire}
              style={{ color: theme.palette.secondary.main }}
            />
          </FlexVCenter>
          <Icons.ArrowRightAlt />

          {props.skill.goalLevel || "?"}
        </S.InnerChip>
      </Flex>
    </S.SkillButton>
  );
}

export default connect(undefined, mapDispatchToProps)(SkillChip);
