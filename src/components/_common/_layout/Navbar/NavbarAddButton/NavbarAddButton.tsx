import { Fab, Tooltip } from "@mui/material"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { useCallback, useMemo } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useLocation } from "react-router-dom"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import { buildNoteDto } from "types/domain/questions/NoteDto"
import { newResourceDto } from "types/domain/relearn/ResourceDto"
import { sleep } from "utils/sleep"
import Icons from "utils/styles/Icons"

// PE 2/3
const NavbarAddButton = () => {
  const { editingResource, setEditingResource } = useRelearnStore()

  const [openNoteDialog] = useNoteDialogStore((s) => [s.openNoteDialog])

  const location = useLocation()

  const [docs] = useDocsStore((s) => [s.docs])

  const defaultSubmit = useDefaultSubmitQuestion()

  const openQuestionDialog = () => {
    const splits = location.pathname.split("/")
    const docId = Number(splits[splits.length - 1])
    const doc = docs.find((d) => d.id === docId)

    openNoteDialog({
      initialValue: buildNoteDto({
        docId: doc?.id,
      }),
      onSubmit: defaultSubmit,
    })
  }

  const isQuestionsPage = useMemo(() => {
    return location.pathname.includes("questions")
  }, [location.pathname])

  const handleActivateButton = useCallback(() => {
    if (isQuestionsPage) {
      openQuestionDialog()
      return
    }

    setEditingResource(newResourceDto())
  }, [isQuestionsPage, editingResource, location.pathname, docs])

  // PE 1/3 - put into a hook 'useQHotkey'
  useHotkeys(
    "q",
    () => {
      sleep(100).then(() => handleActivateButton())
    },
    [location, docs] // if you don't put 'docs', sometimes it will appear unselected
  )

  return (
    <Tooltip title={isQuestionsPage ? "(q) New question" : "(q) New resource"}>
      <Fab
        id="navbar-add-btn"
        onClick={handleActivateButton}
        color="primary"
        style={{
          width: "1.875rem",
          height: "1.875rem",
          minHeight: "1.875rem",
        }}
      >
        <Icons.Add />
      </Fab>
    </Tooltip>
  )
}

export default NavbarAddButton
