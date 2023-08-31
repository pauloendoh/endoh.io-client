import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box } from "@mui/material"

import clsx from "clsx"
import { useEffect, useState } from "react"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"

interface Props {
  type: "currentLevel" | "goalLevel"
  value: number
  onChange: (newValue: number | null) => void
}

// PE 1/3
const SelectSkillLevel = (props: Props) => {
  const classes = useStyles()

  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const labels: { [index: string]: string } = {
    1: "1 - Basic I",
    2: "2 - Basic II",
    3: "3 - Basic III",
    4: "4 - Intermediary I",
    5: "5 - Intermediary II",
    6: "6 - Intermediary III",
    7: "7 - Advanced I",
    8: "8 - Advanced II",
    9: "9 - Advanced III",
    10: "10 - Expert",
  }

  const getLabel = () => {
    let text = props.type === "currentLevel" ? "Current Level" : "Goal"

    if (props.value) {
      text = labels[props.value]
    }

    if (hoverValue) {
      text = labels[hoverValue]
    }

    if (hoverValue && hoverValue === props.value) {
      text = "Remove"
    }

    return text
  }

  const [label, setLabel] = useState(getLabel())
  useEffect(
    () => {
      setLabel(getLabel())
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hoverValue]
  )

  return (
    <Box>
      <Box className={classes.label}>{label}</Box>

      <FlexVCenter>
        {options.map((option) => (
          <Box
            key={option}
            className={classes.outerBox}
            onMouseEnter={() => {
              setHoverValue(option)
            }}
            onMouseLeave={() => {
              setHoverValue(null)
            }}
            onClick={() => {
              if (option === props.value) {
                props.onChange(null)
              } else {
                props.onChange(option)
              }
            }}
          >
            {hoverValue === null ? (
              <Box
                className={clsx(classes.bar, {
                  [classes.basicBg]:
                    props.value >= 1 &&
                    props.value <= 3 &&
                    option <= props.value,
                  [classes.intermediaryBg]:
                    props.value >= 4 &&
                    props.value <= 6 &&
                    option <= props.value,
                  [classes.advancedBg]:
                    props.value >= 7 &&
                    props.value <= 10 &&
                    option <= props.value,
                })}
              />
            ) : (
              <Box
                className={clsx(classes.bar, {
                  [classes.basicBg]:
                    hoverValue >= 1 && hoverValue <= 3 && option <= hoverValue,
                  [classes.intermediaryBg]:
                    hoverValue >= 4 && hoverValue <= 6 && option <= hoverValue,
                  [classes.advancedBg]:
                    hoverValue >= 7 && hoverValue <= 10 && option <= hoverValue,
                })}
              />
            )}
          </Box>
        ))}
      </FlexVCenter>
    </Box>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  label: {
    width: 125,
  },
  outerBox: {
    display: "flex",
    alignItems: "center",
    width: 11,
    cursor: "pointer",
  },
  bar: {
    background: theme.palette.grey[500],
    height: 20,
    width: 8,
    borderRadius: 20,
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

export default SelectSkillLevel
