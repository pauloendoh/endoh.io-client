import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  useTheme,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import StarIcon from "@material-ui/icons/Star";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
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
import MyAxiosError from "../../../../types/MyAxiosError";
import myAxios from "../../../../utils/consts/myAxios";
import apiUrls from "../../../../utils/url/urls/apiUrls";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import ExpectationsTd from "./ExpectationsTd/ExpectationsTd";
import SkillLevelTD from "./SkillLevelTd/SkillLevelTd";
// PE 3/3
const SkillbaseTableRow = (props: Props) => {
  const theme = useTheme();
  const classes = useStyles();

  const labelId = `enhanced-table-checkbox-${props.index}`;

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const findTagById = (id: number) => {
    return props.allTags.find((tag) => tag.id === props.skill.tagId);
  };

  const [tag, setTag] = useState<TagDto>(findTagById(props.skill.tagId));

  const isCompleted = useMemo(() => {
    if (props.skill.goalLevel === null) return false;
    return props.skill.currentLevel === props.skill.goalLevel;
  }, [props.skill]);

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

  const [isChangingPriority, setIsChangingPriority] = useState(false);

  const togglePriority = () => {
    setIsChangingPriority(true);
    const changedSkill: SkillDto = {
      ...props.skill,
      isPriority: !props.skill.isPriority,
    };
    myAxios
      .post<SkillDto[]>(apiUrls.skillbase.skill, changedSkill)
      .then((res) => {
        props.setSkills(res.data);
        setSuccessMessage("Priority changed!");
      })
      .catch((err: MyAxiosError) => {
        setErrorMessage(err.response.data.errors[0].message);
      })
      .finally(() => {
        setIsChangingPriority(false);
      });
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

      <TableCell align="center" width={100}>
        {isChangingPriority ? (
          <CircularProgress size={22} />
        ) : (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              togglePriority();
            }}
          >
            <StarIcon
              className={clsx({
                [classes.isPriority]: props.skill.isPriority,
                [classes.isNotPriority]: !props.skill.isPriority,
              })}
            />
          </IconButton>
        )}
      </TableCell>

      <TableCell width={180}>
        <Box style={{ display: "inline-flex" }}>
          <span>
            {props.skill.name}
            {isCompleted && (
              <MdCheckCircleOutline
                color={theme.palette.success.main}
                style={{ position: "relative", left: 4, top: 3, fontSize: 16 }}
              />
            )}
          </span>
        </Box>
      </TableCell>

      <SkillLevelTD
        value={props.skill.currentLevel}
        isPriority={props.skill.isPriority}
      />
      <SkillLevelTD
        value={props.skill.goalLevel}
        isPriority={props.skill.isPriority}
      />

      <TableCell>
        {tag ? (
          <FlexVCenter>
            <LabelIcon style={{ color: tag.color }} />
            <Box ml={1}>{tag.name}</Box>
          </FlexVCenter>
        ) : null}
      </TableCell>

      <ExpectationsTd skill={props.skill} />
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
