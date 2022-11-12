import { Fab, Tooltip } from "@mui/material"
import { useAxios } from "hooks/utils/useAxios"
import { useMemo } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import { startNewResource } from "store/relearn/relearnActions"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { buildNoteDto, NoteDto } from "types/domain/define/NoteDto"
import { sleep } from "utils/sleep"
import Icons from "utils/styles/Icons"
import apiUrls from "utils/url/urls/apiUrls"

// PE 2/3
const NavbarAddButton = (props: Props) => {
  const [openNoteDialog, closeNoteDialog] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])

  const myAxios = useAxios()

  const location = useLocation()

  const [pushOrReplaceNote, docs] = useDocsStore((s) => [
    s.pushOrReplaceNote,
    s.docs,
  ])

  const openQuestionDialog = () => {
    const splits = location.pathname.split("/")
    const docId = Number(splits[splits.length - 1])
    const doc = docs.find((d) => d.id === docId)

    openNoteDialog({
      initialValue: buildNoteDto({
        docId: doc?.id,
      }),
      onSubmit: (updatedNote) => {
        myAxios.post<NoteDto>(apiUrls.define.note, updatedNote).then((res) => {
          pushOrReplaceNote(res.data)

          setSuccessMessage("Question saved!")
          closeNoteDialog()
        })
      },
    })
  }

  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)

  const isQuestionsPage = useMemo(() => {
    return location.pathname.includes("define")
  }, [location.pathname])

  const handleActivateButton = () => {
    if (isQuestionsPage) {
      openQuestionDialog()
      return
    }
    props.startNewResource()
  }

  useHotkeys(
    "q",
    (e) => {
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startNewResource: () => dispatch(startNewResource()),
})

type Props = ReturnType<typeof mapDispatchToProps>

export default connect(undefined, mapDispatchToProps)(NavbarAddButton)
