import { IconButton, ListItem, ListItemText, Tooltip } from "@mui/material"
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

const QuestionsToRefineListItem = (props: Props) => {
  const [allNotes, pushOrReplaceNote] = useDocsStore((s) => [
    s.notes,
    s.pushOrReplaceNote,
  ])

  const [openNoteDialog, closeNoteDialog] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])

  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)

  const questionsToRefine = useMemo(() => {
    return allNotes.filter((n) => n.toRefine)
  }, [allNotes])

  const openRandomQuestionToRefine = useCallback(() => {
    const randomIndex = getRandomIntInclusive(0, questionsToRefine.length - 1)

    openNoteDialog({
      initialValue: questionsToRefine[randomIndex],
      onSubmit: (updatedNote) => {
        myAxios.post<NoteDto>(apiUrls.define.note, updatedNote).then((res) => {
          pushOrReplaceNote(res.data)

          closeNoteDialog()
          setSuccessMessage("Question saved!")
        })
      },
    })
  }, [questionsToRefine])

  return (
    <ListItem>
      <ListItemText>
        <FlexVCenter justifyContent="space-between">
          {questionsToRefine.length} questions to refine
          {questionsToRefine.length > 0 && (
            <Tooltip title="Open random question to refine">
              <IconButton
                size="small"
                onClick={() => openRandomQuestionToRefine()}
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

export default QuestionsToRefineListItem
