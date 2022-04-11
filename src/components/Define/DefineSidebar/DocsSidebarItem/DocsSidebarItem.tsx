import {
  Box,
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import useSaveDocLastOpenedAt from "hooks/react-query/define/useSaveDocLastOpenedAt";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useDocsStore from "store/zustand/domain/useDocsStore";
import { pushOrReplace } from "utils/array/pushOrReplace";
import { DocDto } from "../../../../types/domain/define/DocDto";
import pageUrls from "../../../../utils/url/urls/pageUrls";
import Flex from "../../../_UI/Flexboxes/Flex";
import FlexHCenter from "../../../_UI/Flexboxes/FlexHCenter";

interface Props {
  doc: DocDto;
  selected: boolean;
}

function DocsSidebarItem(props: Props) {
  const docsStore = useDocsStore();

  // PE 2/3 - change to styled-components ?
  const classes = useStyles();

  const notesCount = useMemo(
    () => docsStore.notes.filter((note) => note.docId === props.doc.id).length,
    [docsStore.notes, props.doc]
  );

  const questionsCount = useMemo(
    () =>
      docsStore.notes.filter(
        (note) => note.docId === props.doc.id && note.question.trim().length > 0
      ).length,
    [docsStore.notes, props.doc]
  );

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

  return (
    <ListItem
      button
      component={Link}
      to={pageUrls.define.docId(props.doc.id)}
      selected={props.selected}
      onClick={() => handleSaveDocLastOpenedAt(props.doc.id)}
    >
      <ListItemText>
        <Flex>
          <DescriptionIcon />
          <Box ml={1} width={210}>
            <Typography style={{ maxWidth: "inherit" }}>
              {props.doc.title}
            </Typography>
          </Box>
          <FlexHCenter width={24}>
            <Typography className={classes.resourcesCount}>
              {notesCount}
              {questionsCount > 0 && `/${questionsCount}`}
            </Typography>
          </FlexHCenter>
        </Flex>
      </ListItemText>
    </ListItem>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resourcesCount: {
      fontSize: 12,
      color: theme.palette.grey[400],
    },
  })
);

export default DocsSidebarItem;
