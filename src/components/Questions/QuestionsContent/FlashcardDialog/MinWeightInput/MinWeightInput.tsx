import React from "react";
import Txt from "../../../../_UI/Text/Txt";
import S from "./MinWeightInput.styles";

interface Props {
  value: number;
  onChange: (newValue: number) => void;
}

const MinWeightInput = (props: Props) => {
  return (
    <Txt variant="h5">
      <S.Input
        type="number"
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        min={1}
      />
      <span style={{ marginLeft: 8 }}>min. weight</span>
    </Txt>
  );
};

export default MinWeightInput;
