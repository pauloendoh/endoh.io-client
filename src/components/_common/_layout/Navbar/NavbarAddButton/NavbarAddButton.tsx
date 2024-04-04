import { Fab, Tooltip } from "@mui/material"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { useCallback, useMemo } from "react"
import { useLocation } from "react-router-dom"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import { buildQuestionDto } from "types/domain/questions/QuestionDto"
import { buildResourceDto } from "types/domain/relearn/ResourceDto"
import Icons from "utils/styles/Icons"
import { useQHotkey } from "./useQHotkey"

// PE 2/3
const NavbarAddButton = () => {
  const { initialValue: editingResource, setInitialValue: setEditingResource } =
    useResourceDialogStore()

  const [openNoteDialog] = useQuestionDialogStore((s) => [s.openDialog])

  const location = useLocation()

  const [docs] = useDocsStore((s) => [s.docs])

  const defaultSubmit = useDefaultSubmitQuestion()

  const openQuestionDialog = () => {
    const splits = location.pathname.split("/")
    const docId = Number(splits[splits.length - 1])
    const doc = docs.find((d) => d.id === docId)

    openNoteDialog({
      initialValue: buildQuestionDto({
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

    setEditingResource(buildResourceDto())
  }, [isQuestionsPage, editingResource, location.pathname, docs])

  useQHotkey({
    callback: handleActivateButton,
    docs,
    location,
  })

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
