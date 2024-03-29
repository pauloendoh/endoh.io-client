import { IconButton, ListItem, ListItemText, Tooltip } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { useAxios } from "hooks/utils/useAxios"
import { useCallback, useMemo } from "react"
import { MdShuffle } from "react-icons/md"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import getRandomIntInclusive from "utils/math/getRandomIntInclusive"

interface Props {
  test?: string
}

const UnansweredQuestionsListItem = (props: Props) => {
  const myAxios = useAxios()
  const [allNotes, pushOrReplaceNote] = useDocsStore((s) => [
    s.notes,
    s.pushOrReplaceNote,
  ])

  const [openNoteDialog, closeNoteDialog] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])

  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)

  const notesWithoutAnswer = useMemo(() => {
    return allNotes.filter(
      (n) => n.question.trim().length > 0 && n.description.trim().length === 0
    )
  }, [allNotes])

  const onSubmit = useDefaultSubmitQuestion()

  const openRandomUnansweredQuestion = useCallback(() => {
    const randomIndex = getRandomIntInclusive(0, notesWithoutAnswer.length - 1)

    openNoteDialog({
      initialValue: notesWithoutAnswer[randomIndex],
      onSubmit,
    })
  }, [notesWithoutAnswer])

  return (
    <ListItem>
      <ListItemText>
        <FlexVCenter justifyContent="space-between">
          {notesWithoutAnswer.length} unanswered questions
          {notesWithoutAnswer.length > 0 && (
            <Tooltip title="Open random unanswered question">
              <IconButton
                size="small"
                onClick={() => openRandomUnansweredQuestion()}
              >
                <MdShuffle />
              </IconButton>
            </Tooltip>
          )}
        </FlexVCenter>
      </ListItemText>
    </ListItem>
  )
}

export default UnansweredQuestionsListItem
