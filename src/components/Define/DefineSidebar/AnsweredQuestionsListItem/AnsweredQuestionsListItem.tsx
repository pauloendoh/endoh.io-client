import { Button, ListItem, ListItemText } from "@material-ui/core"
import FlashcardDialog from "components/Define/DefineContent/FlashcardDialog/FlashcardDialog"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useMemo, useState } from "react"
import { MdPlayCircleFilled } from "react-icons/md"
import useDocsStore from "store/zustand/domain/useDocsStore"

interface Props {
  test?: string
}

const AnsweredQuestionsListItem = (props: Props) => {
  const [allNotes] = useDocsStore((s) => [s.notes])

  const answeredQuestions = useMemo(() => {
    return allNotes.filter(
      (note) =>
        note.question.trim().length > 0 && note.description.trim().length > 0
    )
  }, [allNotes])

  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <ListItem>
        <ListItemText>
          <Button
            onClick={() => setDialogIsOpen(true)}
            startIcon={<MdPlayCircleFilled />}
            fullWidth
            variant="contained"
            color="primary"
          >
            <FlexVCenter justifyContent="space-between">
              Test yourself!
            </FlexVCenter>
          </Button>
        </ListItemText>
      </ListItem>

      <FlashcardDialog
        availableNotes={answeredQuestions}
        open={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
      />
    </>
  )
}

export default AnsweredQuestionsListItem
