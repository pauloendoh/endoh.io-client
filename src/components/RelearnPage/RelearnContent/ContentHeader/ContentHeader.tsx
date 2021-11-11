import { Box, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { removeTag } from "../../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../../store/store";
import { ResourceDto } from "../../../../types/domain/relearn/ResourceDto";
import { TagDto } from "../../../../types/domain/relearn/TagDto";
import { SkillDto } from "../../../../types/domain/skillbase/SkillDto";
import pageUrls from "../../../../utils/consts/pageUrls";
import Flex from "../../../_UI/Flexboxes/Flex";
import SkillChips from "./SkillChips/SkillChips";

// PE 2/3
function ContentHeader(props: Props) {
  const classes = useStyles();
  const location = useLocation();

  const [tag, setTag] = useState<TagDto>(null);
  const [height, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const newHeight = ref.current.clientHeight;
    if (height !== newHeight) {
      setHeight(newHeight);
      props.onHeightChange(newHeight);
    }
  });

  // PE 2/3
  useEffect(() => {
    const { pathname } = location;

    // /relearn
    if (pathname === pageUrls.relearn.index) {
      setTag(null);
    }
    // /relearn/tag/:id
    else if (pathname.startsWith(pageUrls.relearn.tag)) {
      const tagId = Number(pathname.split("/").pop());

      if (tagId) {
        const currentTag = props.allTags.find((t) => t.id === tagId);
        if (currentTag) {
          setTag(currentTag);
          document.title = currentTag.name + " - Endoh.io";
        }
      }
    }

    // if you click in a tag or if you add/edit a tag
  }, [location, props.allTags]);

  // PE 2/3
  const handleChangeTab = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    props.onTabChange(newTabIndex);
  };

  return (
    <Box className={classes.root} {...{ ref: ref }}>
      <Flex justifyContent="space-between" width="100%">
        <Typography variant="h5">{tag ? tag.name : "Untagged"}</Typography>
      </Flex>

      <Box mt={2} />
      <SkillChips />

      <Tabs
        className={classes.tabs}
        value={props.tabIndex}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
        aria-label="disabled tabs example"
      >
        <Tab
          className={classes.tab}
          label={`${props.todoResources.length} Resources`}
        />
        <Tab
          className={classes.tab}
          id="completed-resources-tab-button"
          label={`${props.completedResources.length} Completed`}
        />
      </Tabs>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    background: theme.palette.background.default,
    zIndex: theme.zIndex.appBar,
    top: 65,
    marginTop: 8,
    paddingTop: 24,
  },
  tabs: {
    minHeight: 32,
  },
  tab: {
    padding: 0,
    minWidth: "inherit",
    width: "inherit",
    "&:nth-child(2)": {
      marginLeft: 16,
    },
  },
  outerChip: {
    cursor: "inherit",
    marginBottom: 2,
    marginTop: 2,
    marginRight: 4,
  },
}));

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTag: (id: number) => dispatch(removeTag(id)),
});

interface OwnProps {
  onTabChange: (newTabIndex: number) => void;
  tabIndex: number;
  todoResources: ResourceDto[];
  completedResources: ResourceDto[];
  skills: SkillDto[];
  onHeightChange: (height: number) => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeader);
