import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { TableCell, TableRow } from "@mui/material"
import clsx from "clsx"
import useDebounce from "hooks/utils/useDebounce"
import { useEffect, useRef, useState } from "react"
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

  return (
    <TableRow>
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
