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
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { setDocs } from "store/define/defineActions";
import { pushOrReplace } from "utils/pushOrReplace";
import Flex from "../../../../components/shared/Flexboxes/Flex";
import FlexHCenter from "../../../../components/shared/Flexboxes/FlexHCenter";
import { ApplicationState } from "../../../../store/store";
import { DocDto } from "../../../../types/domain/define/DocDto";
import pageUrls from "../../../../utils/consts/pageUrls";

function DocsSidebarItem(props: Props) {
  // PE 2/3 - change to styled-components ?
  const classes = useStyles();

  // PE 1/3 - create a .utils memo file
  const getNotesCount = (doc: DocDto) => {
    return props.allNotes.filter((note) => note.docId === doc.id).length;
  };

  // PE 1/3 - create a .utils memo file
  const getQuestionsCount = (doc: DocDto) => {
    return props.allNotes.filter(
      (note) => note.docId === doc.id && note.question.trim().length > 0
    ).length;
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

  return (
    <ListItem
      button
      component={Link}
      to={pageUrls.define.doc(props.doc.id)}
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
              {getNotesCount(props.doc)}
              {getQuestionsCount(props.doc) > 0 &&
                `/${getQuestionsCount(props.doc)}`}
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

const mapStateToProps = (state: ApplicationState) => ({
  allDocs: state.define.docs,
  allNotes: state.define.notes,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDocs: (docs: DocDto[]) => dispatch(setDocs(docs)),
});

interface OwnProps {
  doc: DocDto;
  selected: boolean;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocsSidebarItem);
