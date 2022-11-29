import TextareaAutosize from "react-textarea-autosize"

import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { TableCell, TableRow } from "@mui/material"
import useDebounce from "hooks/utils/useDebounce"
import { createRef, useEffect, useState } from "react"
import { NoteDto } from "../../../../../types/domain/define/NoteDto"

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

  const descriptionRef = createRef<HTMLTextAreaElement>()
  const questionRef = createRef<HTMLTextAreaElement>()

  const focusDescription = () => descriptionRef.current.focus()
  const focusQuestion = () => questionRef.current.focus()

  const [questionHeight, setQuestionHeight] = useState(0)
  const [answerHeight, setAnswerHeight] = useState(0)

  return (
    <TableRow>
      {!props.isSmallScreen && (
        <TableCell className={classes.td} align="center">
          {props.index + 1}
        </TableCell>
      )}

      <TableCell className={classes.textareaCell} onClick={focusQuestion}>
        <TextareaAutosize
          onHeightChange={setQuestionHeight}
          style={{ height: questionHeight }}
          onChange={(e) => changeQuestion(e.target.value)}
          value={localNote.question}
          className={classes.textarea}
          autoFocus
          ref={questionRef}
        />
      </TableCell>
      <TableCell className={classes.textareaCell} onClick={focusDescription}>
        <TextareaAutosize
          onHeightChange={setAnswerHeight}
          style={{ height: answerHeight }}
          ref={descriptionRef}
          onChange={(e) => changeDescription(e.target.value)}
          value={localNote.description}
          className={classes.textarea}
        />
      </TableCell>

      {!props.isSmallScreen && (
        <TableCell align="center" className={classes.td}>
          {localNote.weight}
        </TableCell>
      )}
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
  textarea: {
    resize: "none",
    border: "none",
    background: "none",
    fontSize: 13,
    fontFamily: theme.typography.fontFamily,
    color: "white",
    cursor: "pointer",
  },
}))

export default DocTableRow
