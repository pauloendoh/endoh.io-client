import { makeStyles, TextField } from "@material-ui/core"
import React, { useState } from "react"

// PE 2/3
const SkillDialogTitleTextField = (props: Props) => {
  const classes = useStyles()

  const [localValue, setLocalValue] = useState(props.initialValue)
  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  const handleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLocalValue(e.target.value)

    clearTimeout(throttle)
    setThrottle(
      setTimeout(() => {
        props.onChange(e.target.value)
      }, 250)
    )
  }

  return (
    <TextField
      className={classes.nameTextField}
      fullWidth
      placeholder="Untitled skill"
      InputProps={{
        disableUnderline: true,
        className: classes.nameInput,
      }}
      id={"name"}
      name={"name"}
      value={localValue}
      onChange={handleChange}
      autoFocus
      required
    />
  )
}

const useStyles = makeStyles((theme) => ({
  nameTextField: {
    background: "transparent",
  },
  nameInput: {
    fontSize: 24,
  },
}))

type Props = {
  initialValue: string
  onChange: (newValue: string) => void
}

export default SkillDialogTitleTextField
