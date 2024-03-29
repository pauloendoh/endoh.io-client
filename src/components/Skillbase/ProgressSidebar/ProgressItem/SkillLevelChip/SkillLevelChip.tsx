import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { Chip } from "@mui/material"
import clsx from "clsx"
import React from "react"
import FlexVCenter from "../../../../_UI/Flexboxes/FlexVCenter"

const SkillLevelChip = (props: { currentLevel: number; goalLevel: number }) => {
  const classes = useStyles()
  return (
    <Chip
      className={clsx(classes.root, {
        [classes.basicBg]: props.currentLevel >= 1 && props.currentLevel <= 3,
        [classes.intermediaryBg]:
          props.currentLevel >= 4 && props.currentLevel <= 6,
        [classes.advancedBg]:
          props.currentLevel >= 7 && props.currentLevel <= 10,
      })}
      size="small"
      label={
        <FlexVCenter>
          {props.currentLevel ? props.currentLevel : "?"}
          {props.goalLevel && (
            <React.Fragment>
              <ArrowRightAltIcon />
              {props.goalLevel}
            </React.Fragment>
          )}
        </FlexVCenter>
      }
    />
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    cursor: "inherit",
    position: "relative",
    height: "20px",
    left: 5,
  },
  basicBg: {
    background: "#e48900",
  },
  intermediaryBg: {
    background: "#3DAC8D",
  },
  advancedBg: {
    background: "#C862AC",
  },
}))

export default SkillLevelChip
