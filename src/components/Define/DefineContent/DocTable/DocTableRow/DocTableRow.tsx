import {
  makeStyles,
  TableCell,
  TableRow,
  TextareaAutosize,
} from "@material-ui/core"
import useDebounce from "hooks/utils/useDebounce"
import { createRef, useEffect, useState } from "react"
import { NoteDto } from "../../../../../types/domain/define/NoteDto"

interface Props {
  index: number
  initialValue: NoteDto
  onChange: (newValue: NoteDto) => void
}

const DocTableRow = (props: Props) => {
  const classes = useStyles()

  const [localNote, setLocalNote] = useState(props.initialValue)

  const debouncedLocalNote = useDebounce(localNote, 250)

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

  return (
    <TableRow>
      <TableCell className={classes.td} align="center">
        {props.index + 1}
      </TableCell>
      <TableCell className={classes.textareaCell} onClick={focusDescription}>
        <TextareaAutosize
          ref={descriptionRef}
          onChange={(e) => changeDescription(e.target.value)}
          value={localNote.description}
          className={classes.textarea}
          autoFocus
        />
      </TableCell>
      <TableCell className={classes.textareaCell} onClick={focusQuestion}>
        <TextareaAutosize
          onChange={(e) => changeQuestion(e.target.value)}
          value={localNote.question}
          className={classes.textarea}
          ref={questionRef}
        />
      </TableCell>
      <TableCell align="center" className={classes.td}>
        {localNote.weight}
      </TableCell>
    </TableRow>
  )
}

const useStyles = makeStyles((theme) => ({
  textareaCell: {
    cursor: "pointer !important",
  },
  td: {
    fontSize: 13,
  },
  textarea: {
    resize: "none",
    border: "none",
    minWidth: 125,
    width: "-webkit-fill-available",
    background: "none",
    fontSize: 13,
    fontFamily: theme.typography.fontFamily,
    color: "white",
    cursor: "pointer",
  },
}))

export default DocTableRow
