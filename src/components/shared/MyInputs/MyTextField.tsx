import { TextField } from "@material-ui/core";
import React from "react";

type Props = React.ComponentProps<typeof TextField> & {
  onCtrlEnter?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

const MyTextField = React.forwardRef<HTMLDivElement, Props>(
  ({ onCtrlEnter = (e) => {}, ...props }, ref) => {
    return (
      <TextField
        size="small"
        autoComplete="off"
        variant="outlined"
        {...props}
        ref={ref}
        onKeyDown={(e) => {
          // I had to add a default function for onCtrlEnter to remove console.error
          if (e.key === "Enter" && e.ctrlKey && onCtrlEnter) {
            onCtrlEnter(e);
          } else if (props.onKeyDown) props.onKeyDown(e);
        }}
      />
    );
  }
);

export default MyTextField;
