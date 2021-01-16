import { makeStyles } from "@material-ui/core"
import clsx from "clsx"
import React from "react"

const SkillLevelText = (props: { value: number }) => {
  const classes = useStyles()
  return (
    <span
      className={clsx(classes.root, {
        [classes.basic]: props.value >= 1 && props.value <= 3,
        [classes.intermediary]: props.value >= 4 && props.value <= 6,
        [classes.advanced]: props.value >= 7 && props.value <= 10,
      })}
    >
      {props.value}
    </span>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 900,
  },
  basic: {
    color: "#ffaa00",
  },
  intermediary: {
    color: "#3DAC8D",
  },
  advanced: {
    color: "#C862AC",
  },
}))

export default SkillLevelText
