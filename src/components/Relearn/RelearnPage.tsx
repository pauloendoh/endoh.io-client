import { Box, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import useMultiSelectResource from "hooks/relearn/useMultiSelectResource";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { setSkills } from "store/skillbase/skillbaseActions";
import useWindowFocus from "use-window-focus";
import * as relearnActions from "../../store/relearn/relearnActions";
import { ApplicationState } from "../../store/store";
import useSidebarStore from "../../store/zustand/useSidebarStore";
import { ResourceDto } from "../../types/domain/relearn/ResourceDto";
import { SkillDto } from "../../types/domain/skillbase/SkillDto";
import myAxios from "../../utils/consts/myAxios";
import apiUrls from "../../utils/url/urls/apiUrls";
import pageUrls from "../../utils/url/urls/pageUrls";
import LoadingPage from "../_common/LoadingPage/LoadingPage";
import Flex from "../_UI/Flexboxes/Flex";
import RelearnContent from "./RelearnContent/RelearnContent";
import RelearnSidebar from "./RelearnSidebar/RelearnSidebar";
import TagDialog from "./TagDialog/TagDialog";

const RelearnPage = (props: Props) => {
  const classes = useStyles();

  const windowFocused = useWindowFocus();
  const { clearSelectedIds } = useMultiSelectResource();
  const { sidebarIsOpen, openSidebar } = useSidebarStore();

  const [redirectTo, setRedirectTo] = useState("");
  // PE 1/3 - why do we need this skills, if we have props.skills ?
  const [skills, setSkills] = useState<SkillDto[]>([]);

  const fetchResourcesAndSkills = () => {
    myAxios.get<ResourceDto[]>(apiUrls.relearn.resource).then((res) => {
      props.setResources(res.data);
    });

    myAxios.get<SkillDto[]>(apiUrls.skillbase.skill).then((res) => {
      props.setSkills(res.data);
    });
  };

  useEffect(() => {
    setRedirectTo("");
    openSidebar();
    fetchResourcesAndSkills();
  }, []);

  useEffect(
    () => {
      if (windowFocused) {
        fetchResourcesAndSkills();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [windowFocused]
  );

  const location = useLocation();

  // filter resources by tag (from path name)
  const [filteredResources, setFilteredResources] = useState<ResourceDto[]>([]);
  useEffect(
    () => {
      setRedirectTo("");
      const { pathname } = location;

      // Filtrando resource por tags. Melhor colocar em outro arquivo?
      if (pathname === pageUrls.relearn.index) {
        setFilteredResources(
          props.resources.filter((resource) => resource.tag === null)
        );
        document.title = "Untagged - Endoh.io";
      } else if (pathname.startsWith(pageUrls.relearn.tag)) {
        const tagId = Number(pathname.split("/").pop());
        if (tagId) {
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

  useEffect(() => {
    clearSelectedIds();
  }, [location.pathname]);

  useEffect(
    () => {
      // open last opened tag
      const tagId = Number(location.pathname.split("/").pop());
      if (!tagId && props.allTags?.length > 0) {
        const sortedByLastOpened = props.allTags.sort((a, b) => {
          if (a.lastOpenedAt === undefined) return -1;
          if (b.lastOpenedAt === undefined) return 1;

          return a.lastOpenedAt > b.lastOpenedAt ? -1 : 1;
        });

        const tagId = sortedByLastOpened[0].id;
        setRedirectTo(pageUrls.relearn.tagId(tagId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.allTags, location]
  );

  if (redirectTo.length > 0) {
    return <Redirect to={redirectTo} />;
  }

  return (
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
          <div style={{ marginTop: 32 }}>
            <LoadingPage />
          </div>
        )}
      </Box>

      <TagDialog />
    </Flex>
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

  startNewResource: () => dispatch(relearnActions.startNewResource()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RelearnPage);
