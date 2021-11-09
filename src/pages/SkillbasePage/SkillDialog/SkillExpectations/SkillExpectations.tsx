import { Box } from "@material-ui/core";
import Txt from "components/shared/Text/Txt";
import React from "react";
import { SkillExpectationDto } from "../../../../types/domain/skillbase/SkillExpectationDto";
import ExpectationsAtLevel from "./ExpectationsAtLevel/ExpectationsAtLevel";

interface Props {
  currentLevel: number;
  expectations: SkillExpectationDto[];
  onChangeExpectations: (expectations: SkillExpectationDto[]) => void;
}

// PE 2/3 - rename to SkillRoadmap?
const SkillExpectations = (props: Props) => {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Box mt={2} maxHeight={450}>
      <Txt variant="h5">Roadmap</Txt>

      {levels.map((level) => (
        <ExpectationsAtLevel
          key={level}
          expectations={props.expectations}
          level={level}
          isHighlighted={props.currentLevel === level}
          onChangeExpectations={props.onChangeExpectations}
        />
      ))}
    </Box>
  );
};

export default SkillExpectations;
