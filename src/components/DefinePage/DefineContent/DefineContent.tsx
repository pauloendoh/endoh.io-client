import { Box, Button, Container, Typography } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../store/store";
import Flex from "../../_UI/Flexboxes/Flex";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";
import DocTable from "./DocTable/DocTable";
import FlashcardDialog from "./FlashcardDialog/FlashcardDialog";
import TitleMoreIcon from "./TitleMoreIcon/TitleMoreIcon";

const DefineContent = (props: Props) => {
  const [flashcardDialog, setFlashcardDialog] = useState(false);

  const getDoc = () => {
    return props.allDocs.find((doc) => doc.id === props.docId);
  };

  const getQuestionsCount = () => {
    return props.allNotes.filter(
      (note) => note.docId === props.docId && note.question.trim().length > 0
    ).length;
  };

  return (
    <Container>
      {/* Header */}
      <Flex justifyContent="space-between">
        <Typography variant="h4">{getDoc().title}</Typography>
        <Box>
          <TitleMoreIcon doc={getDoc()} afterDelete={() => {}} />
        </Box>
      </Flex>

      <Box mt={3}>
        <Button
          onClick={() => setFlashcardDialog(true)}
          variant="contained"
          color="primary"
        >
          <FlexVCenter>
            <PlayArrowIcon fontSize="small" />
            <Box ml={1}>
              Test Yourself{" "}
              {getQuestionsCount() > 0 && `(${getQuestionsCount()})`}
            </Box>
          </FlexVCenter>
        </Button>

        {flashcardDialog && (
          <FlashcardDialog
            docId={props.docId}
            open={flashcardDialog}
            onClose={() => setFlashcardDialog(false)}
          />
        )}
      </Box>

      <Box mt={3}>
        <DocTable docId={props.docId} />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  allDocs: state.define.docs,
  allNotes: state.define.notes,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

interface OwnProps {
  docId: number;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(DefineContent);
