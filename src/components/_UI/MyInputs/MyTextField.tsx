import { TextField } from "@mui/material"
import React from "react"
import Icons from "utils/styles/Icons"

type Props = React.ComponentProps<typeof TextField> & {
  onCtrlEnter?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onClickClearIcon?: () => void
}

const MyTextField = React.forwardRef<HTMLDivElement, Props>(
  ({ onCtrlEnter = (e) => {}, ...props }, ref) => {
    return (
      <TextField
        size="small"
        autoComplete="off"
        variant="outlined"
        InputProps={
          props.onClickClearIcon
            ? {
                endAdornment: (
                  <Icons.Clear
                    style={{ cursor: "pointer" }}
                    onClick={props.onClickClearIcon}
                  />
                ),
              }
            : undefined
        }
        {...props}
        ref={ref}
        onKeyDown={(e) => {
          // I had to add a default function for onCtrlEnter to remove console.error
          if (e.key === "Enter" && e.ctrlKey && onCtrlEnter) {
            onCtrlEnter(e)
          } else if (props.onKeyDown) props.onKeyDown(e)
        }}
        defaultValue={props.defaultValue || props.value}
      />
    )
  }
)

export default MyTextField
