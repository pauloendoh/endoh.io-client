import classNames from "classnames"
import {
  makeStyles,
  TableCell,
  TableRow,
  TextareaAutosize,
} from "@material-ui/core"
import React, { useRef, useState } from "react"
import { DecisionTableItemDto } from "../../../../../dtos/BigDecisions/DecisionTableItemDto"

type Props = {
  initialItem: DecisionTableItemDto
  onChange: (newValue: DecisionTableItemDto) => void
}

const DecisionTableRow = (props: Props) => {
  const classes = useStyles()

  const [localItem, setLocalItem] = useState(props.initialItem)

  const problemRef = useRef<HTMLTextAreaElement>()
  const solutionRef = useRef<HTMLTextAreaElement>()
  const weightRef = useRef<HTMLInputElement>()

  const focusProblem = () => problemRef.current.focus()
  const focusSolution = () => solutionRef.current.focus()
  const selectWeight = () => weightRef.current.select()

  // handles timeout to props.on
  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  const changeLocalItem = (newValue: DecisionTableItemDto) => {
    setLocalItem(newValue)
    clearTimeout(throttle)
    setThrottle(
      setTimeout(() => {
        props.onChange(newValue)
      }, 250)
    )
  }

  return (
    <TableRow key={props.initialItem.id}>
      <TableCell className={classes.textareaCell} onClick={focusProblem}>
        <TextareaAutosize
          ref={problemRef}
          onChange={(e) =>
            changeLocalItem({ ...localItem, problem: e.target.value })
          }
          value={localItem.problem}
          className={classes.textarea}
        />
      </TableCell>
      <TableCell className={classes.textareaCell} onClick={focusSolution}>
        <TextareaAutosize
          onChange={(e) =>
            changeLocalItem({ ...localItem, solution: e.target.value })
          }
          value={localItem.solution}
          className={classes.textarea}
          ref={solutionRef}
        />
      </TableCell>
      <TableCell
        align="center"
        className={classes.textareaCell}
        onClick={selectWeight}
      >
        <input
          ref={weightRef}
          className={classNames(classes.textarea, {
            [classes.bold]: localItem.weight >= 3,
          })}
          type="number"
          min="1"
          max="5"
          value={localItem.weight ? localItem.weight : ""}
          onChange={(e) => {
            const newValue = Number(e.target.value)
            if (newValue < 1) changeLocalItem({ ...localItem, weight: 1 })
            else if (newValue > 5) changeLocalItem({ ...localItem, weight: 5 })
            else if (newValue >= 1 && newValue <= 5)
              changeLocalItem({ ...localItem, weight: newValue })
          }}
        />
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
  bold: { fontWeight: "bold" },
}))

export default DecisionTableRow
