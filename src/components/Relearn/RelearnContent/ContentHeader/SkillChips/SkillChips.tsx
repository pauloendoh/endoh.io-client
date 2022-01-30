import { makeStyles } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { FilterSkillChipsBy } from "types/domain/relearn/FilterSkillChipsBy";
import { setEditingSkill } from "../../../../../store/skillbase/skillbaseActions";
import { ApplicationState } from "../../../../../store/store";
import { SkillDto } from "../../../../../types/domain/skillbase/SkillDto";
import pageUrls from "../../../../../utils/url/urls/pageUrls";
import SkillChip from "../../../../_common/SkillChip/SkillChip";
import Flex from "../../../../_UI/Flexboxes/Flex";
import EditSkillsButton from "./EditSkillsButton/EditSkillsButton";
import FilterSkillChipsButton from "./FilterSkillChipsButton/FilterSkillChipsButton";

// PE 2/3
function SkillChips(props: Props) {
  const classes = useStyles();
  const location = useLocation();

  const [filterBy, setFilterBy] = useState<FilterSkillChipsBy>("By tag");

  const skills = useMemo(() => {
    const { pathname } = location;

    if (filterBy === "Show all")
      return props.allSkills.filter((skill) => skill.isPriority);

    if (filterBy === "By tag") {
      if (pathname.startsWith(pageUrls.relearn.tag)) {
        const tagId = Number(pathname.split("/").pop());

        if (tagId) {
          const listedSkills = props.allSkills.filter(
            (s) => s.tagId === tagId && s.isPriority === true
          );
          return listedSkills;
        }
      }
    }

    return [];
  }, [props.allSkills, location, filterBy]);

  return (
    <Flex className={classes.root}>
      {skills.map((skill) => (
        <SkillChip key={skill.id} skill={skill} />
      ))}
      <EditSkillsButton />
      <FilterSkillChipsButton
        filterBy={filterBy}
        onChangeFilterBy={setFilterBy}
      />
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
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
