import { Fab, Tooltip } from "@material-ui/core"
import { GlobalHotKeys } from "react-hotkeys"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import { startNewResource } from "store/relearn/relearnActions"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { buildNoteDto, NoteDto } from "types/domain/define/NoteDto"
import myAxios from "utils/consts/myAxios"
import { sleep } from "utils/sleep"
import Icons from "utils/styles/Icons"
import apiUrls from "utils/url/urls/apiUrls"
import { ApplicationState } from "../../../../../store/store"

// PE 2/3
const NavbarAddButton = (props: Props) => {
  const [openNoteDialog, closeNoteDialog] = useNoteDialogStore((s) => [
    s.onOpen,
    s.onClose,
  ])

  const location = useLocation()

  const handleAddResource = () => {
    props.startNewResource()
  }
  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)

  const pushOrReplaceNote = useDocsStore((s) => s.pushOrReplaceNote)

  const keyMap = { openModal: "q" }
  const handlers = {
    openModal: async () => {
      await sleep(100) // required so it doesn't add 'q' at the title field immediately

      if (location.pathname.includes("define")) {
        openNoteDialog({
          initialValue: buildNoteDto(),
          onSubmit: (updatedNote) => {
            myAxios
              .post<NoteDto>(apiUrls.define.note, updatedNote)
              .then((res) => {
                pushOrReplaceNote(res.data)

                closeNoteDialog()
                setSuccessMessage("Question saved!")
              })

            closeNoteDialog()
          },
        })
        return
      }
      props.startNewResource()
    },
  }

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Tooltip title="(q) Add resource">
        <Fab
          id="navbar-add-btn"
          onClick={handleAddResource}
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
    </GlobalHotKeys>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startNewResource: () => dispatch(startNewResource()),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(NavbarAddButton)
