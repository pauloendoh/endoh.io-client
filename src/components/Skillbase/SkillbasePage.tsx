import { Box, makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Dispatch } from "redux";
import {
  setEditingSkill,
  setProgresses,
  setSkills,
} from "../../store/skillbase/skillbaseActions";
import { ApplicationState } from "../../store/store";
import useSidebarStore from "../../store/zustand/useSidebarStore";
import { TagDto } from "../../types/domain/relearn/TagDto";
import { ProgressDto } from "../../types/domain/skillbase/ProgressDto";
import { SkillDto } from "../../types/domain/skillbase/SkillDto";
import myAxios from "../../utils/consts/myAxios";
import apiUrls from "../../utils/url/urls/apiUrls";
import pageUrls from "../../utils/url/urls/pageUrls";
import LoadingPage from "../_common/LoadingPage/LoadingPage";
import Flex from "../_UI/Flexboxes/Flex";
import ProgressSidebar from "./ProgressSidebar/ProgressSidebar";
import SkillbaseTable from "./SkillTable/SkillbaseTable";

// PE 3/3
const SkillbasePage = (props: Props) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const [selectedTag, setSelectedTag] = useState<TagDto | "Untagged">();

  const { sidebarIsOpen, closeSidebar } = useSidebarStore();

  useEffect(
    () => {
      document.title = "Skills - Endoh.io";
      closeSidebar();

      myAxios.get<SkillDto[]>(apiUrls.skillbase.skill).then((res) => {
        props.setSkills(res.data);
      });

      myAxios.get<ProgressDto[]>(apiUrls.skillbase.progress).then((res) => {
        props.setProgresses(res.data);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (pathname.startsWith(pageUrls.skillbase.untagged)) {
      setSelectedTag("Untagged");
    } else if (pathname.startsWith(pageUrls.skillbase.tag + "/")) {
      const tagId = Number(pathname.split("/").pop());
      if (tagId) {
        const tag = props.allTags.find((tag) => tag.id === tagId);
        setSelectedTag(tag);
      }
    } else setSelectedTag(null);
  }, [pathname, props.allTags]);

  return (
    <Flex height="100%" pt={5} justifyContent="center">
      <ProgressSidebar />

      <Box
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarIsOpen,
        })}
      >
        <Box width="100%">
          {props.hasFirstLoaded ? (
            <Paper className={classes.paper}>
              <SkillbaseTable tag={selectedTag} fixedTag={null} />
            </Paper>
          ) : (
            <LoadingPage />
          )}
        </Box>
      </Box>
    </Flex>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: 1200,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 300,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  hasFirstLoaded: state.skillbase.hasFirstLoaded,
  allTags: state.relearn.tags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
  setProgresses: (progresses: ProgressDto[]) =>
    dispatch(setProgresses(progresses)),
  setEditingSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillbasePage);
