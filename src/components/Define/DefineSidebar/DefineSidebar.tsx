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
import sample from "lodash/sample";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useDocsStore from "store/zustand/domain/useDocsStore";
import { pushOrReplace } from "utils/array/pushOrReplace";
import useSidebarStore from "../../../store/zustand/useSidebarStore";
import stringIncludes from "../../../utils/text/stringIncludes";
import pageUrls from "../../../utils/url/urls/pageUrls";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";
import MyTextField from "../../_UI/MyInputs/MyTextField";
import DocTitleDialog from "../DocTitleDialog/DocTitleDialog";
import DocsSidebarItem from "./DocsSidebarItem/DocsSidebarItem";

interface Props {
  selectedDocId: number;
}

function DefineSidebar(props: Props) {
  // PE 1/3 - put this next to where it's used
  const history = useHistory();

  // PE 2/3 - change to styled-components ?
  const classes = useStyles();

  const [openTitleDialog, setOpenTitleDialog] = useState(false);

  const [textFilter, setTextFilter] = useState("");

  const docsStore = useDocsStore();

  const filterAndSortDocs = () => {
    let filtered = docsStore.docs.filter((d) =>
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
        const docs = pushOrReplace([...docsStore.docs], savedDoc, "id");
        docsStore.setDocs(docs);
      },
    });
  };

  const openRandomDoc = () => {
    if (docsStore.docs.length > 0) {
      const randomDoc = sample(docsStore.docs);
      history.push(pageUrls.define.docId(randomDoc.id));

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
                  initialValue={{ title: "" }}
                  onClose={() => setOpenTitleDialog(false)}
                  afterSave={(doc) => {
                    history.push(pageUrls.define.docId(doc.id));
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

export default DefineSidebar;
