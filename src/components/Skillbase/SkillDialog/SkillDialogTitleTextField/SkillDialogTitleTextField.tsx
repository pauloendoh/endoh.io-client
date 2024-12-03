import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { TextField } from "@mui/material"
import React from "react"

// PE 2/3
const SkillDialogTitleTextField = (props: Props) => {
  const classes = useStyles()

  const handleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    props.onChange(e.target.value)
  }

  return (
    <TextField
      className={classes.nameTextField}
      placeholder="Untitled skill"
      fullWidth
      multiline
      variant="standard"
      InputProps={{
        className: classes.nameInput,
      }}
      autoComplete="off"
      id={"name"}
      name={"name"}
      value={props.value}
      onChange={handleChange}
      autoFocus
      required
    />
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  nameTextField: {
    background: "transparent",
  },
  nameInput: {
    fontSize: 24,
  },
}))

type Props = {
  value: string
  onChange: (newValue: string) => void
}

export default SkillDialogTitleTextField
