import {
  makeStyles,
  TableCell,
  TableRow,
  TextareaAutosize,
} from "@material-ui/core"
import React, { createRef, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { NoteDto } from "../../../../../dtos/define/NoteDto"
import { ApplicationState } from "../../../../../store/store"

const DocTableRow = (props: Props) => {
  const classes = useStyles()

  const [note, setNote] = useState(props.initialValue)

  const changeDescription = (newValue: string) => {
    const changed = { ...note, description: newValue }
    setNote(changed)
    props.onChange(changed)
  }

  const changeQuestion = (newValue: string) => {
    const changed = { ...note, question: newValue }
    setNote(changed)
    props.onChange(changed)
  }

  const descriptionRef = createRef<HTMLTextAreaElement>()
  const questionRef = createRef<HTMLTextAreaElement>()

  const selectDescription = () => descriptionRef.current.select()
  const selectQuestion = () => questionRef.current.select()

  return (
    <TableRow>
      <TableCell>{note.index + 1}</TableCell>
      <TableCell className={classes.textareaCell} onClick={selectDescription}>
        <TextareaAutosize
          ref={descriptionRef}
          onChange={(e) => changeDescription(e.target.value)}
          value={note.description}
          className={classes.textarea}
          autoFocus
        />
      </TableCell>
      <TableCell className={classes.textareaCell} onClick={selectQuestion}>
        <TextareaAutosize
          onChange={(e) => changeQuestion(e.target.value)}
          value={note.question}
          className={classes.textarea}
          ref={questionRef}
        />
      </TableCell>
      <TableCell align="center">{note.weight}</TableCell>
    </TableRow>
  )
}

const useStyles = makeStyles((theme) => ({
  textareaCell: {
    cursor: "pointer !important",
  },
  textarea: {
    resize: "none",
    border: "none",
    minWidth: 125,
    width: "-webkit-fill-available",
    background: "none",
    fontSize: 12,
    fontFamily: theme.typography.fontFamily,
    color: "white",
    cursor: "pointer",
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  initialValue: NoteDto
  onChange: (newValue: NoteDto) => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(DocTableRow)
