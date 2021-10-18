import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Flex from "../../../../components/shared/Flexboxes/Flex";
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter";
import SkillLevelChip from "../../../../components/skillbase/SkillLevelChip/SkillLevelChip";
import { setProgresses } from "../../../../store/skillbase/skillbaseActions";
import { ApplicationState } from "../../../../store/store";
import { ProgressDto } from "../../../../types/domain/skillbase/ProgressDto";
import API from "../../../../utils/consts/API";
import myAxios from "../../../../utils/consts/myAxios";

function ProgressItem(props: Props) {
  const classes = useStyles();

  const [hovering, setHovering] = useState(false);

  const handleDelete = (progressId: number) => {
    if (window.confirm("Confirm delete?")) {
      myAxios
        .delete<ProgressDto[]>(API.skillbase.progress + "/" + progressId)
        .then((res) => {
          props.setProgresses(res.data);
        });
    }
  };

  return (
    <FlexVCenter
      flexWrap="wrap"
      key={props.progress.id}
      mt={props.index > 0 ? 2 : 0}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {props.progress.skill.name}
      <SkillLevelChip
        currentLevel={props.progress.oldLevel}
        goalLevel={props.progress.goalLevel}
      />
      <Flex ml={1} />
      <ArrowRightAltIcon />
      <SkillLevelChip
        currentLevel={props.progress.newLevel}
        goalLevel={props.progress.goalLevel}
      />

      {hovering && (
        <IconButton
          onClick={() => handleDelete(props.progress.id)}
          size="small"
          className={classes.deleteProgressIcon}
        >
          <DeleteIcon fontSize={"small"} />
        </IconButton>
      )}
    </FlexVCenter>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 12,
    },
    deleteProgressIcon: {
      position: "absolute",
      right: -24,
    },
  })
);

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProgresses: (progresses: ProgressDto[]) =>
    dispatch(setProgresses(progresses)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    progress: ProgressDto;
    index: number;
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProgressItem);
