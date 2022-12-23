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

const QuestionsToRefineListItem = (props: Props) => {
  const [allNotes, pushOrReplaceNote] = useDocsStore((s) => [
    s.notes,
    s.pushOrReplaceNote,
  ])

  const myAxios = useAxios()

  const [openNoteDialog, closeNoteDialog] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])

  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)

  const questionsToRefine = useMemo(() => {
    return allNotes.filter((n) => n.toRefine)
  }, [allNotes])

  const axios = useAxios()

  const defaultSubmit = useDefaultSubmitQuestion()

  const openRandomQuestionToRefine = useCallback(() => {
    const randomIndex = getRandomIntInclusive(0, questionsToRefine.length - 1)

    openNoteDialog({
      initialValue: questionsToRefine[randomIndex],

      onSubmit: defaultSubmit,
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
