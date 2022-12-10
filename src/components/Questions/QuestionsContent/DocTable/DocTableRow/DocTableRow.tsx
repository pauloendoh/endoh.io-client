import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { TableCell, TableRow } from "@mui/material"
import clsx from "clsx"
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
  initialValue: NoteDto
  onChange: (newValue: NoteDto) => void
  isSmallScreen: boolean
}

const DocTableRow = (props: Props) => {
  const classes = useStyles()

  const [localNote, setLocalNote] = useState(props.initialValue)

  const debouncedLocalNote = useDebounce(localNote, 500)

  useEffect(() => {
    if (debouncedLocalNote !== props.initialValue)
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

  const initialQuestion = useRef(props.initialValue.question)
  const initialDescription = useRef(props.initialValue.description)

  const pushOrReplaceNote = useDocsStore((s) => s.pushOrReplaceNote)
  const [openNoteDialog, closeNoteDialog] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])
  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)
  const axios = useAxios()

  return (
    <TableRow
      onClick={(e) => {
        if (e.altKey) {
          openNoteDialog({
            initialValue: props.initialValue,

            onSubmit: (updatedNote) => {
              axios
                .post<NoteDto>(urls.api.define.note, updatedNote)
                .then((res) => {
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
      }}
    >
      {!props.isSmallScreen && (
        <TableCell className={classes.td} align="center">
          {props.index + 1}
        </TableCell>
      )}

      <TableCell
        className={clsx([classes.textareaCell, classes.td])}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          changeQuestion(e.currentTarget.innerText)
        }}
        sx={{ whiteSpace: "pre-wrap", width: "50%", overflowWrap: "anywhere" }}
      >
        {initialQuestion.current}
      </TableCell>
      <TableCell
        className={clsx([classes.textareaCell, classes.td])}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          changeDescription(e.currentTarget.textContent)
        }}
        sx={{ whiteSpace: "pre-wrap", width: "50%", overflowWrap: "anywhere" }}
      >
        {initialDescription.current}
      </TableCell>
      <TableCell width="0px" />
    </TableRow>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  textareaCell: {
    cursor: "pointer !important",
    verticalAlign: "top",
  },
  td: {
    fontSize: 13,
    verticalAlign: "top",
  },
}))

export default DocTableRow
