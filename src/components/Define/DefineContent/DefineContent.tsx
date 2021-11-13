import { Box, Button, Container, Typography } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React, { useState } from "react";
import useDocsStore from "store/zustand/domain/useDocsStore";
import Flex from "../../_UI/Flexboxes/Flex";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";
import DocTable from "./DocTable/DocTable";
import FlashcardDialog from "./FlashcardDialog/FlashcardDialog";
import TitleMoreIcon from "./TitleMoreIcon/TitleMoreIcon";

interface Props {
  docId: number;
}

const DefineContent = (props: Props) => {
  const docsStore = useDocsStore();
  const [flashcardDialog, setFlashcardDialog] = useState(false);

  const getDoc = () => {
    return docsStore.docs.find((doc) => doc.id === props.docId);
  };

  const getQuestionsCount = () => {
    return docsStore.notes.filter(
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

export default DefineContent;
