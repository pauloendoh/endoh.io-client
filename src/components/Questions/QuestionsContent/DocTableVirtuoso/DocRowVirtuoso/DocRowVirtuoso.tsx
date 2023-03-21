import { useAxios } from "hooks/utils/useAxios"
import useDebounce from "hooks/utils/useDebounce"
import { useEffect, useRef, useState } from "react"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { NoteDto } from "../../../../../types/domain/questions/NoteDto"

interface Props {
  index: number
  question: NoteDto
  onChange: (newValue: NoteDto) => void
  isSmallScreen: boolean
}

// PE 1/3 - delete?
const DocRowVirtuoso = (props: Props) => {
  const [localNote, setLocalNote] = useState(props.question)

  const debouncedLocalNote = useDebounce(localNote, 500)

  useEffect(() => {
    if (debouncedLocalNote !== props.question)
      props.onChange(debouncedLocalNote)
  }, [debouncedLocalNote])

  const changeDescription = (newValue: string) => {
    const changed = { ...localNote, description: newValue }
    setLocalNote(changed)
  }

  const changeQuestion = (newValue: string) => {
    const changed = { ...localNote, question: newValue }
    setLocalNote(changed)
  }

  const initialQuestion = useRef(props.question.question)
  const initialDescription = useRef(props.question.description)

  const pushOrReplaceNote = useDocsStore((s) => s.pushOrReplaceNote)
  const [openNoteDialog, closeNoteDialog] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])
  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)
  const axios = useAxios()

  const handleClick = (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>
  ) => {
    if (e.altKey) {
      openNoteDialog({
        initialValue: props.question,

        onSubmit: (updatedNote) => {
          axios.post<NoteDto>(urls.api.define.note, updatedNote).then((res) => {
            pushOrReplaceNote(res.data)
            setLocalNote(res.data)
            initialDescription.current = res.data.description
            initialQuestion.current = res.data.question
            closeNoteDialog()
            setSuccessMessage("Question saved!")
          })
        },
      })
      e.preventDefault()
      e.stopPropagation()
      return
    }
  }

  return (
    <>
      {!props.isSmallScreen && (
        <td
          align="center"
          onClick={handleClick}
          style={{ verticalAlign: "top" }}
        >
          {props.index + 1}
        </td>
      )}
      <td
        onClick={handleClick}
        style={{
          cursor: "pointer",
          verticalAlign: "top",
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
        }}
        contentEditable
        onInput={(e) => {
          changeQuestion(e.currentTarget.innerText)
        }}
      >
        {props.question.question}
      </td>
      <td
        onClick={handleClick}
        style={{
          cursor: "pointer",
          verticalAlign: "top",
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
        }}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          changeDescription(e.currentTarget.textContent)
        }}
      >
        {props.question.description}
      </td>
      <td></td>
    </>
  )
}

export default DocRowVirtuoso
