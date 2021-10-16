import {
  Box,
  createStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DescriptionIcon from "@material-ui/icons/Description";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import useSaveDocLastOpenedAt from "hooks/react-query/define/useSaveDocLastOpenedAt";
import _ from "lodash";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { setDocs } from "store/define/defineActions";
import { pushOrReplace } from "utils/pushOrReplace";
import Flex from "../../../components/shared/Flexboxes/Flex";
import FlexHCenter from "../../../components/shared/Flexboxes/FlexHCenter";
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter";
import MyTextField from "../../../components/shared/MyInputs/MyTextField";
import PATHS from "../../../consts/PATHS";
import { DocDto } from "../../../dtos/define/DocDto";
import { ApplicationState } from "../../../store/store";
import useSidebarStore from "../../../store/zustand/useSidebarStore";
import stringIncludes from "../../../utils/text/stringIncludes";
import DocTitleDialog from "../DocTitleDialog/DocTitleDialog";

function DefineSidebar(props: Props) {
  const history = useHistory();
  const classes = useStyles();

  const [openTitleDialog, setOpenTitleDialog] = useState(false);

  const getNotesCount = (doc: DocDto) => {
    return props.allNotes.filter((note) => note.docId === doc.id).length;
  };

  const getQuestionsCount = (doc: DocDto) => {
    return props.allNotes.filter(
      (note) => note.docId === doc.id && note.question.trim().length > 0
    ).length;
  };

  const [textFilter, setTextFilter] = useState("");

  const filterAndSortDocs = () => {
    let filtered = props.allDocs.filter((d) =>
      stringIncludes(d.title, textFilter)
    );

    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  };

  const { mutate: saveDocLastOpenedAt } = useSaveDocLastOpenedAt();
  const handleSaveDocLastOpenedAt = (docId: number) => {
    saveDocLastOpenedAt(docId, {
      onSuccess: (savedDoc) => {
        const docs = pushOrReplace([...props.allDocs], savedDoc, "id");
        props.setDocs(docs);
      },
    });
  };

  const openRandomDoc = () => {
    if (props.allDocs.length > 0) {
      const randomDoc = _.sample(props.allDocs);
      history.push(PATHS.define.doc(randomDoc.id));

      handleSaveDocLastOpenedAt(randomDoc.id);
    }
  };

  const { sidebarIsOpen } = useSidebarStore();

  return (
    <Drawer
      className={classes.root}
      variant="persistent"
      open={sidebarIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box className={classes.drawerContainer}>
        <Box pt={4} px={2}>
          <MyTextField
            fullWidth
            style={{ marginLeft: "auto", marginRight: "auto" }}
            label="Filter docs"
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />
        </Box>
        <List disablePadding>
          <ListItem>
            <ListItemText>
              <FlexVCenter justifyContent="space-between">
                <Box>{filterAndSortDocs().length} Docs</Box>
                <FlexVCenter>
                  <Tooltip title="Open random doc">
                    <IconButton size="small" onClick={openRandomDoc}>
                      <ShuffleIcon />
                    </IconButton>
                  </Tooltip>

                  <Box ml={1} />
                  <Tooltip title="Add doc">
                    <IconButton
                      size="small"
                      onClick={() => setOpenTitleDialog(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </FlexVCenter>

                <DocTitleDialog
                  open={openTitleDialog}
                  initialValue=""
                  onClose={() => setOpenTitleDialog(false)}
                  afterSave={(doc) => {
                    history.push(PATHS.define.doc(doc.id));
                    setOpenTitleDialog(false);
                  }}
                />
              </FlexVCenter>
            </ListItemText>
          </ListItem>
          {filterAndSortDocs().map((doc) => (
            <ListItem
              key={doc.id}
              button
              component={Link}
              onClick={() => console.log(doc.id)}
              to={PATHS.define.doc(doc.id)}
              selected={props.selectedDocId === doc.id}
            >
              <ListItemText>
                <Flex>
                  <DescriptionIcon />
                  <Box ml={1} width={210}>
                    <Typography style={{ maxWidth: "inherit" }}>
                      {doc.title}
                    </Typography>
                  </Box>
                  <FlexHCenter width={24}>
                    <Typography className={classes.resourcesCount}>
                      {getNotesCount(doc)}
                      {getQuestionsCount(doc) > 0 &&
                        `/${getQuestionsCount(doc)}`}
                    </Typography>
                  </FlexHCenter>
                </Flex>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
    },

    drawerPaper: {
      width: 300,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
    drawerContainer: {
      // overflow: "auto",
    },
    resourcesCount: {
      fontSize: 12,
      color: theme.palette.grey[400],
    },
  })
);

const mapStateToProps = (state: ApplicationState) => ({
  allDocs: state.define.docs,
  allNotes: state.define.notes,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDocs: (docs: DocDto[]) => dispatch(setDocs(docs)),
});

interface OwnProps {
  selectedDocId: number;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(DefineSidebar);
