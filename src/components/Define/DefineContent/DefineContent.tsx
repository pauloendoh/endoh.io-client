import { Box, Button, Container, Typography } from "@material-ui/core"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import { useMemo, useState } from "react"
import useDocsStore from "store/zustand/domain/useDocsStore"
import Flex from "../../_UI/Flexboxes/Flex"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import DocMoreMenu from "./DocMoreMenu/DocMoreMenu"
import DocTable from "./DocTable/DocTable"
import FlashcardDialog from "./FlashcardDialog/FlashcardDialog"

interface Props {
  docId: number
}

const DefineContent = (props: Props) => {
  const [docs, notes] = useDocsStore((s) => [s.docs, s.notes])
  const [flashcardDialog, setFlashcardDialog] = useState(false)

  const currentDoc = useMemo(() => docs.find((doc) => doc.id === props.docId), [
    docs,
    props.docId,
  ])

  const availableQuestions = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.docId === props.docId &&
          note.question.trim().length > 0 &&
          note.description.trim().length > 0
      ),

    [notes, props.docId]
  )

  return (
    <Container>
      {/* Header */}
      <Flex justifyContent="space-between">
        <Typography variant="h4">{currentDoc.title}</Typography>
        <Box>
          <DocMoreMenu doc={currentDoc} afterDelete={() => {}} />
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
              {availableQuestions.length > 0 &&
                `(${availableQuestions.length})`}
            </Box>
          </FlexVCenter>
        </Button>

        {flashcardDialog && (
          <FlashcardDialog
            availableNotes={availableQuestions}
            open={flashcardDialog}
            onClose={() => setFlashcardDialog(false)}
          />
        )}
      </Box>

      <Box mt={3}>
        <DocTable docId={props.docId} />
      </Box>
    </Container>
  )
}

export default DefineContent
