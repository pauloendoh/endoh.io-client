import { Box, Button, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { Element } from "react-scroll";
import {
  createSkillExpectation,
  SkillExpectationDto,
} from "../../../../../types/domain/skillbase/SkillExpectationDto";
import ExpectationItem from "./ExpectationItem/ExpectationItem";

interface Props {
  expectations: SkillExpectationDto[];
  level: number;
  isHighlighted: boolean;
  disabled?: boolean;
  onChangeExpectations: (expectations: SkillExpectationDto[]) => void;
}

const ExpectationsAtLevel = (props: Props) => {
  const theme = useTheme();
  const [editingIndex, setEditingIndex] = useState<number>(null);

  const handleAddExpectation = () => {
    const newExpectation = createSkillExpectation(
      props.level,
      props.expectations.filter((e) => e.level === props.level).length
    );

    const expectations = [...props.expectations];
    expectations.push(newExpectation);

    setEditingIndex(newExpectation.index);
    changeExpectations(expectations);
  };

  const changeExpectations = (expectations: SkillExpectationDto[]) => {
    const otherLevelsExpectations = expectations.filter(
      (e) => e.level !== props.level
    );

    // Fixing this level's indexes
    const thisLevelExpectation = filterAndSortExpectations(
      expectations,
      props.level
    ).map((exp, index) => ({ ...exp, index }));

    props.onChangeExpectations([
      ...otherLevelsExpectations,
      ...thisLevelExpectation,
    ]);
  };

  return (
    <Box mt={3}>
      <Element name={`expectation-title-${props.level}`} />
      <Typography
        style={{ color: props.isHighlighted ? "#ffb400" : "inherit" }}
      >
        <b>
          {props.level} - {getLevelDescription(props.level)}
        </b>
      </Typography>

      {filterAndSortExpectations(props.expectations, props.level).map(
        (expectation, index) => (
          <ExpectationItem
            expectations={props.expectations}
            level={props.level}
            disabled={props.disabled}
            onChangeExpectations={props.onChangeExpectations}
            expectation={expectation}
            index={index}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
          />
        )
      )}

      <Box mt={0.5} ml={1}>
        {editingIndex === null && !props.disabled && (
          <Button
            onClick={handleAddExpectation}
            size="small"
            style={{
              background: theme.palette.grey[800],
              fontWeight: "normal",
            }}
          >
            Add Goal or Concept to Learn
          </Button>
        )}
      </Box>
    </Box>
  );
};

const filterAndSortExpectations = (
  expectations: SkillExpectationDto[],
  level: number
) => {
  if (!expectations) return [];
  return expectations
    .filter((expectation) => expectation.level === level)
    .sort((a, b) => {
      if (a.index > b.index) return 1;
      if (a.index < b.index) return -1;
      return 0;
    });
};

export const getLevelDescription = (level: number) => {
  switch (level) {
    case 1:
      return "Basic I";
    case 2:
      return "Basic II";
    case 3:
      return "Basic III";
    case 4:
      return "Intermediary I";
    case 5:
      return "Intermediary II";
    case 6:
      return "Intermediary III";
    case 7:
      return "Advanced I";
    case 8:
      return "Advanced II";
    case 9:
      return "Advanced III";
    case 10:
      return "Expert";
  }
};

export default ExpectationsAtLevel;
