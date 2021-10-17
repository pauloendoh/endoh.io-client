import { TextField } from "@material-ui/core";
import React from "react";

type Props = React.ComponentProps<typeof TextField> & {
  onCtrlEnter?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

const MyTextField = (props: Props) => {
  return (
    <TextField
      size="small"
      autoComplete="off"
      variant="outlined"
      {...props}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.ctrlKey) {
          props.onCtrlEnter(e);
        } else if (props.onKeyDown) props.onKeyDown(e);
      }}
    />
  );
};

export default MyTextField;
