import React from "react";
import Txt from "../../../../_UI/Text/Txt";
import S from "./QuestionsQtyInput.styles";

interface Props {
  value: number;
  maxValue: number;
  onChange: (newValue: number) => void;
}

const QuestionsQtyInput = (props: Props) => {
  return (
    <Txt variant="h5">
      <S.Input
        type="number"
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        min={0}
        max={props.maxValue}
      />
      <span>/ {props.maxValue} flashcards</span>
    </Txt>
  );
};

export default QuestionsQtyInput;
