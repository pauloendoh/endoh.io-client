import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import StarIcon from "@mui/icons-material/Star"
import { IconButton, Tooltip } from "@mui/material"
import clsx from "clsx"

// PE 2/3
const PriorityStarIcon = (props: Props) => {
  const classes = useStyles()

  return (
    <Tooltip title={props.tooltipText} enterDelay={500} enterNextDelay={500}>
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

const useStyles = makeStyles<Theme>((theme) => ({
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
  isPriority: boolean
  tooltipText: string
  onClick: () => void
}

export default PriorityStarIcon
