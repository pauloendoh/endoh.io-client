import { makeStyles, TableCell } from "@material-ui/core"
import clsx from "clsx"
import React from "react"

// PE 2/3 - Not so easy to understand the classes logic
const SkillLevelTd = (props: { value: number; isPriority: boolean }) => {
  const classes = useStyles()
  return (
    <TableCell
      align="center"
      className={clsx(classes.root, {
        [classes.basic]: props.value >= 1 && props.value <= 3,
        [classes.intermediary]: props.value >= 4 && props.value <= 6,
        [classes.advanced]: props.value >= 7 && props.value <= 10,
        [classes.isPriority]: props.isPriority,
      })}
    >
      {props.value}
    </TableCell>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    width: 50,
  },
  isPriority: {
    fontWeight: "bold",
  },
  basic: {
    background: "#FFF2CC",
    // color: "#ffaa00",
  },
  intermediary: {
    background: "#B6D7A8",

  },
  advanced: {
    background: "#B4A7D6",

    // color: "#C862AC",
  },
}))

export default SkillLevelTd
