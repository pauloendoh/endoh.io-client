import { TextareaAutosize } from "@mui/material"
import { makeStyles } from "@mui/styles"
import classNames from "classnames"
import { useRef, useState } from "react"
import myColors from "utils/consts/myColors"
import { DecisionTableItemDto } from "../../../../../types/domain/big-decisions/DecisionTableItemDto"
import { TD, TR } from "../../../../_UI/Table/MyTableWrappers"

type Props = {
  initialItem: DecisionTableItemDto
  biggerColsWidth: number
  onThrottledChange: (newValue: DecisionTableItemDto) => void
}

const DecisionTableRow = (props: Props) => {
  const classes = useStyles()

  const [localItem, setLocalItem] = useState(props.initialItem)

  const problemRef = useRef<HTMLTextAreaElement>(null)
  const solutionRef = useRef<HTMLTextAreaElement>(null)
  const weightRef = useRef<HTMLInputElement>(null)

  const focusProblem = () => problemRef.current?.focus()
  const focusSolution = () => solutionRef.current?.focus()
  const selectWeight = () => weightRef.current?.select()

  // handles timeout to props.on
  const [throttle, setThrottle] = useState<NodeJS.Timeout | null>(null)

  const changeLocalItem = (newValue: DecisionTableItemDto) => {
    setLocalItem(newValue)

    if (throttle) {
      clearTimeout(throttle)
    }
    setThrottle(
      setTimeout(() => {
        props.onThrottledChange(newValue)
      }, 250)
    )
  }

  return (
    <TR key={props.initialItem.id}>
      <TD
        className={classes.textareaCell}
        width={props.biggerColsWidth}
        onClick={focusProblem}
      >
        <TextareaAutosize
          ref={problemRef}
          onChange={(e) =>
            changeLocalItem({ ...localItem, problem: e.target.value })
          }
          value={localItem.problem}
          className={classes.textarea}
        />
      </TD>
      <TD
        className={classes.textareaCell}
        width={props.biggerColsWidth}
        onClick={focusSolution}
      >
        <TextareaAutosize
          onChange={(e) =>
            changeLocalItem({ ...localItem, solution: e.target.value })
          }
          value={localItem.solution}
          className={classes.textarea}
          ref={solutionRef}
        />
      </TD>
      <TD
        className={classNames(classes.textareaCell, classes.col3)}
        onClick={selectWeight}
      >
        <input
          ref={weightRef}
          className={classNames(classes.textarea, {
            [classes.bold]: localItem.weight >= 3,
          })}
          style={{ textAlign: "center" }}
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
      </TD>
    </TR>
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
    width: "-webkit-fill-available",
    background: "none",
    fontSize: 13,
    fontFamily: theme.typography.fontFamily,
    color: "white",
    cursor: "pointer",
  },
  bold: { fontWeight: "bold", color: myColors.ratingYellow[5] },
  col3: { width: 60, textAlign: "center" },
}))

export default DecisionTableRow
