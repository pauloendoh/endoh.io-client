import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import Flex from "../../../../../components/shared/Flexboxes/Flex";
import SkillChip from "../../../../../components/skillbase/SkillChip/SkillChip";
import { setEditingSkill } from "../../../../../store/skillbase/skillbaseActions";
import { ApplicationState } from "../../../../../store/store";
import { SkillDto } from "../../../../../types/domain/skillbase/SkillDto";
import pageUrls from "../../../../../utils/consts/pageUrls";
import EditSkillsButton from "./EditSkillsButton/EditSkillsButton";

// PE 2/3
function SkillChips(props: Props) {
  const classes = useStyles();
  const location = useLocation();

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const { pathname } = location;

    if (pathname.startsWith(pageUrls.relearn.tag)) {
      const listId = Number(pathname.split("/").pop());

      if (listId) {
        const listedSkills = props.allSkills.filter(
          (s) => s.tagId === listId && s.isPriority === true
        );
        setSkills(listedSkills);
      }
    }
  }, [props.allSkills, location]);

  return (
    <Flex className={classes.root}>
      {skills.map((skill) => (
        <SkillChip key={skill.id} skill={skill} />
      ))}
      <EditSkillsButton />
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    maxWidth: 585,
  },
  skillButton: {
    marginRight: 8,
    marginBottom: 8,
    fontWeight: 400,
  },
  innerChip: {
    background: theme.palette.secondary.main,
    color: "#fff",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
  },
  manageSkillsButton: {
    marginBottom: 8,
  },
}));

const mapStateToProps = (state: ApplicationState) => ({
  allSkills: state.skillbase.skills,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SkillChips);