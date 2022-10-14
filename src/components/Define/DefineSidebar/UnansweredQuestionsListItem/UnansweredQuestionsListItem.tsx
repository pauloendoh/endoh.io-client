import { IconButton, ListItem, ListItemText } from "@material-ui/core"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useCallback, useMemo } from "react"
import { MdShuffle } from "react-icons/md"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { NoteDto } from "types/domain/define/NoteDto"
import myAxios from "utils/consts/myAxios"
import getRandomIntInclusive from "utils/math/getRandomIntInclusive"
import apiUrls from "utils/url/urls/apiUrls"

interface Props {
  test?: string
}

const UnansweredQuestionsListItem = (props: Props) => {
  const [allNotes, pushOrReplaceNote] = useDocsStore((s) => [
    s.notes,
    s.pushOrReplaceNote,
  ])

  const [openNoteDialog, closeNoteDialog] = useNoteDialogStore((s) => [
    s.onOpen,
    s.onClose,
  ])

  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)

  const notesWithoutAnswer = useMemo(() => {
    return allNotes.filter(
      (n) => n.question.trim().length > 0 && n.description.trim().length === 0
    )
  }, [allNotes])

  const openRandomUnansweredQuestion = useCallback(() => {
    const randomIndex = getRandomIntInclusive(0, notesWithoutAnswer.length - 1)

    openNoteDialog({
      initialValue: notesWithoutAnswer[randomIndex],
      onSubmit: (updatedNote) => {
        myAxios.post<NoteDto>(apiUrls.define.note, updatedNote).then((res) => {
          pushOrReplaceNote(res.data)

          closeNoteDialog()
          setSuccessMessage("Question saved!")
        })
      },
    })
  }, [notesWithoutAnswer])

  return (
    <ListItem>
      <ListItemText>
        <FlexVCenter justifyContent="space-between">
          {notesWithoutAnswer.length} unanswered questions
          {notesWithoutAnswer.length > 0 && (
            <IconButton
              size="small"
              onClick={() => openRandomUnansweredQuestion()}
            >
              <MdShuffle />
            </IconButton>
          )}
        </FlexVCenter>
      </ListItemText>
    </ListItem>
  )
}

export default UnansweredQuestionsListItem
