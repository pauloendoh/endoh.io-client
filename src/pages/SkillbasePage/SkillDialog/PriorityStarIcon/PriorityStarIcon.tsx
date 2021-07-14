import { IconButton, makeStyles, Tooltip } from "@material-ui/core"
import StarIcon from "@material-ui/icons/Star"
import clsx from "clsx"
import React from "react"

// PE 2/3
const PriorityStarIcon = (props: Props) => {
  const classes = useStyles()

  return (
    <Tooltip
      title="This skill is a priority in your life right now"
      enterDelay={500}
      enterNextDelay={500}
    >
      <IconButton size="small" onClick={props.onClick}>
        <StarIcon
          className={clsx({
            [classes.isNotPriority]: !props.isPriority,
            [classes.isPriority]: props.isPriority,
          })}
        />
      </IconButton>
    </Tooltip>
  )
}

const useStyles = makeStyles((theme) => ({
  nameTextField: {
    background: "transparent",
  },
  nameInput: {
    fontSize: 24,
  },
  isNotPriority: {
    color: theme.palette.grey[400],
  },
  isPriority: {
    color: "#ffb400",
  },
}))

type Props = {
  isPriority: boolean,
  tooltipText: string,
  onClick: () => void
}

export default PriorityStarIcon
