import React, { useState } from "react";
import MyTextField from "../../../../../_UI/MyInputs/MyTextField";

interface Props {
  initialValue: string;
  onChange: (value: string) => void;
}

const ExpectationTextarea = (props: Props) => {
  const [localValue, setLocalValue] = useState(props.initialValue);

  return (
    <>
      <MyTextField
        autoFocus
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            props.onChange(props.initialValue);
            e.stopPropagation();
            return;
          }

          if (e.key === "Enter") props.onChange(localValue);
        }}
        fullWidth
        multiline
        size="small"
        onBlur={() => props.onChange(localValue)}
        onFocus={(e) => e.currentTarget.select()}
      />
    </>
  );
};

export default ExpectationTextarea;
