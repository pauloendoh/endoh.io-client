import { ListItem, ListItemText } from "@mui/material"
import FlashcardDialog from "components/Questions/QuestionsContent/FlashcardDialog/FlashcardDialog"
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useMemo, useState } from "react"
import { MdPlayCircleFilled } from "react-icons/md"
import useDocsStore from "store/zustand/domain/useDocsStore"

interface Props {
  test?: string
}

const AnsweredQuestionsListItem = (props: Props) => {
  const [allNotes] = useDocsStore((s) => [s.questions])

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
          <DarkButton
            onClick={() => setDialogIsOpen(true)}
            startIcon={<MdPlayCircleFilled />}
            fullWidth
          >
            <FlexVCenter justifyContent="space-between">
              Exercise your memory!
            </FlexVCenter>
          </DarkButton>
        </ListItemText>
      </ListItem>

      <FlashcardDialog
        availableQuestions={answeredQuestions}
        open={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
      />
    </>
  )
}

export default AnsweredQuestionsListItem
