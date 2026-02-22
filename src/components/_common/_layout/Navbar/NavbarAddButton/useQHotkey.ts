import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { useCallback, useMemo } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useLocation } from "react-router-dom"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import { buildQuestionDto } from "types/domain/questions/QuestionDto"
import { buildResourceDto } from "types/domain/relearn/ResourceDto"
import { sleep } from "utils/sleep"

export const useQHotkey = () => {
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

  const runQHotkeyManually = useCallback(() => {
    if (isQuestionsPage) {
      openQuestionDialog()
      return
    }

    setEditingResource(buildResourceDto())
  }, [isQuestionsPage, editingResource, location.pathname, docs])

  useHotkeys(
    "q",
    () => {
      // PE 1/3 - why this ?
      sleep(100).then(runQHotkeyManually)
    },
    [location, docs], // if you don't put 'docs', sometimes it will appear unselected
  )

  return { runQHotkeyManually }
}
