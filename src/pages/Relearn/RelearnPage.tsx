import { Box, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import useSaveTagLastOpenedAt from "hooks/react-query/relearn/useSaveTagLastOpenedAt";
import { TagDto } from "interfaces/dtos/relearn/TagDto";
import React, { useEffect, useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { pushOrReplace } from "utils/pushOrReplace";
import { urls } from "utils/urls";
import Flex from "../../components/shared/Flexboxes/Flex";
import API from "../../consts/API";
import myAxios from "../../consts/myAxios";
import PATHS from "../../consts/PATHS";
import { SkillDto } from "../../dtos/skillbase/SkillDto";
import { ResourceDto } from "../../interfaces/dtos/relearn/ResourceDto";
import * as relearnActions from "../../store/relearn/relearnActions";
import { setSkills } from "../../store/skillbase/skillbaseActions";
import { ApplicationState } from "../../store/store";
import useSidebarStore from "../../store/zustand/useSidebarStore";
import { sleep } from "../../utils/sleep";
import LoadingPage from "../index/LoadingPage";
import RelearnContent from "./Content/RelearnContent";
import TagDialog from "./Dialogs/TagDialog";
import RelearnSidebar from "./RelearnSidebar/RelearnSidebar";

// PE 3/3
const RelearnPage = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const [skills, setSkills] = useState<SkillDto[]>([]);

  const { sidebarIsOpen, openSidebar } = useSidebarStore();

  useEffect(
    () => {
      openSidebar();

      myAxios.get<ResourceDto[]>(API.relearn.resource).then((res) => {
        props.setResources(res.data);
      });

      myAxios.get<SkillDto[]>(API.skillbase.skill).then((res) => {
        props.setSkills(res.data);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const location = useLocation();

  const { mutate: saveTagLastOpenedAt } = useSaveTagLastOpenedAt();
  const handleSaveTagLastOpenedAt = (tagId: number) =>
    saveTagLastOpenedAt(tagId, {
      onSuccess: (savedTag) => {
        const tags = pushOrReplace([...props.allTags], savedTag, "id");
        props.setTags(tags);
      },
    });

  // filter resources by tag (from path name)
  const [filteredResources, setFilteredResources] = useState<ResourceDto[]>([]);
  useEffect(
    () => {
      const { pathname } = location;

      // Filtrando resource por tags. Melhor colocar em outro arquivo?
      if (pathname === PATHS.relearn.index) {
        setFilteredResources(
          props.resources.filter((resource) => resource.tag === null)
        );
        document.title = "Untagged - Endoh.io";
      } else if (pathname.startsWith(PATHS.relearn.tag)) {
        const tagId = Number(pathname.split("/").pop());
        if (tagId) {
          handleSaveTagLastOpenedAt(tagId);

          setFilteredResources(
            props.resources.filter((resource) => {
              return resource.tag?.id === tagId;
            })
          );

          setSkills(props.allSkills.filter((skill) => skill.tagId === tagId));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.resources, location]
  );

  useEffect(
    () => {
      const tagId = Number(location.pathname.split("/").pop());
      if (!tagId && props.allTags?.length > 0) {
        const sortedByLastOpened = props.allTags.sort((a, b) =>
          b.lastOpenedAt.localeCompare(a.lastOpenedAt)
        );
        const tagId = sortedByLastOpened[0].id;
        history.push(urls.pages.relearnTag(tagId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.allTags, location]
  );

  const keyMap = { openModal: "q" };
  const handlers = {
    openModal: async () => {
      await sleep(100); // required so it doesn't add 'q' at the title field immediately
      props.startNewResource();
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Flex height="100%">
        <RelearnSidebar />
        <Box
          className={classNames(classes.content, {
            [classes.contentShift]: sidebarIsOpen,
          })}
          flexGrow={1}
        >
          {props.hasFirstLoaded ? (
            <RelearnContent resources={filteredResources} skills={skills} />
          ) : (
            <LoadingPage />
          )}
        </Box>

        <TagDialog />
      </Flex>
    </GlobalHotKeys>
  );
};
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,

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
}));

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.relearn.resources,
  hasFirstLoaded: state.relearn.hasFirstLoaded,
  allSkills: state.skillbase.skills,
  allTags: state.relearn.tags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),

  startNewResource: () => dispatch(relearnActions.startNewResource()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RelearnPage);
