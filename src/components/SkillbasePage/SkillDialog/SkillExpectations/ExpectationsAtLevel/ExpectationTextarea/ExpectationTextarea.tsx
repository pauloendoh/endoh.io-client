import React, { useState } from "react";
import MyTextField from "../../../../../_UI/MyInputs/MyTextField";

const ExpectationTextarea = (props: Props) => {
  const [value, setValue] = useState(props.initialValue);

  return (
    <>
      <MyTextField
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") props.onSave(value);
          else if (e.key === "ESC") {
            props.onSave(value);
          }
        }}
        fullWidth
        multiline
        size="small"
        onBlur={() => props.onSave(value)}
      />
    </>
  );
};

interface OwnProps {
  initialValue: string;
  onSave: (newValue: string) => void;
}

type Props = OwnProps;
export default ExpectationTextarea;
