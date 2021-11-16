import {
  Box,
  Checkbox,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import {
  setEditingSkill,
  setSkills,
} from "../../../../store/skillbase/skillbaseActions";
import { ApplicationState } from "../../../../store/store";
import { TagDto } from "../../../../types/domain/relearn/TagDto";
import { SkillDto } from "../../../../types/domain/skillbase/SkillDto";
import Flex from "../../../_UI/Flexboxes/Flex";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import SkillLevelTD from "./SkillLevelTd/SkillLevelTd";

// PE 3/3
const SkillbaseTableRow = (props: Props) => {
  const classes = useStyles();
  const labelId = `enhanced-table-checkbox-${props.index}`;

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const findTagById = (id: number) => {
    return props.allTags.find((tag) => tag.id === props.skill.tagId);
  };

  const [tag, setTag] = useState<TagDto>(findTagById(props.skill.tagId));

  useEffect(
    () => {
      if (props.skill.tagId) {
        setTag(findTagById(props.skill.tagId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      if (props.skill.tagId) {
        setTag(findTagById(props.skill.tagId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.skill.tagId, props.allTags]
  );

  const getUncheckedExpectations = () => {
    return props.skill.expectations.filter(
      (expectation) => !expectation.checked
    );
  };

  return (
    <TableRow
      hover
      role="checkbox"
      onClick={() => props.setEditingSkill(props.skill)}
      aria-checked={props.isSelected}
      tabIndex={-1}
      selected={props.isSelected}
      className={classes.root}
    >
      <TableCell align="center" width={50}>
        {props.index + 1}
      </TableCell>

      <TableCell width={180}>
        <Flex>{props.skill.name}</Flex>
      </TableCell>

      <SkillLevelTD value={props.skill.currentLevel} />
      <SkillLevelTD value={props.skill.currentGoal} />

      <SkillLevelTD
        value={props.skill.goalLevel}
        done={
          props.skill.goalLevel > 0 &&
          props.skill.currentLevel === props.skill.goalLevel
        }
      />

      <TableCell>
        {tag ? (
          <FlexVCenter>
            <LabelIcon style={{ color: tag.color }} />
            <Box ml={1}>{tag.name}</Box>
          </FlexVCenter>
        ) : null}
      </TableCell>

      <TableCell align="center">
        {props.skill.expectations.length > 0 && (
          <React.Fragment>
            {getUncheckedExpectations().length}/
            {props.skill.expectations.length} expectations
          </React.Fragment>
        )}
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox
          checked={props.isSelected}
          onClick={(event) => {
            event.stopPropagation();
            props.onCheck(event, props.skill.id);
          }}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
    </TableRow>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
  isPriority: {
    color: "#ffb400",
  },
  isNotPriority: {
    color: theme.palette.grey[800],
  },
  basicBg: {
    background: "#ffaa00",
  },
  intermediaryBg: {
    background: "#3DAC8D",
  },
  advancedBg: {
    background: "#C862AC",
  },
}));

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
});

interface OwnProps {
  skill: SkillDto;
  index: number;
  isSelected: boolean;
  onCheck: (e: React.MouseEvent, skillId: number) => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(SkillbaseTableRow);
