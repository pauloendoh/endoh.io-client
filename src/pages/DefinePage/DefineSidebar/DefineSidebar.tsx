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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import useSaveDocLastOpenedAt from "hooks/react-query/define/useSaveDocLastOpenedAt";
import _ from "lodash";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { setDocs } from "store/define/defineActions";
import { pushOrReplace } from "utils/pushOrReplace";
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter";
import MyTextField from "../../../components/shared/MyInputs/MyTextField";
import { ApplicationState } from "../../../store/store";
import useSidebarStore from "../../../store/zustand/useSidebarStore";
import { DocDto } from "../../../types/domain/define/DocDto";
import PATHS from "../../../utils/consts/PATHS";
import stringIncludes from "../../../utils/text/stringIncludes";
import DocTitleDialog from "../DocTitleDialog/DocTitleDialog";
import DocsSidebarItem from "./DocsSidebarItem/DocsSidebarItem";

function DefineSidebar(props: Props) {
  // PE 1/3 - put this next to where it's used
  const history = useHistory();

  // PE 2/3 - change to styled-components ?
  const classes = useStyles();

  const [openTitleDialog, setOpenTitleDialog] = useState(false);

  const [textFilter, setTextFilter] = useState("");

  const filterAndSortDocs = () => {
    let filtered = props.allDocs.filter((d) =>
      stringIncludes(d.title, textFilter)
    );

    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  };

  const { mutate: saveDocLastOpenedAt } = useSaveDocLastOpenedAt();
  // PE 2/3 - name too big?
  const handleSaveDocLastOpenedAt = (docId: number) => {
    saveDocLastOpenedAt(docId, {
      // PE 2/3 - do you have to do this? I don't think so :thinking:
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
      <Box>
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
            <DocsSidebarItem
              key={doc.id}
              selected={doc.id === props.selectedDocId}
              doc={doc}
            />
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
