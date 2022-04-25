import { Box, Button, Typography, useTheme } from "@material-ui/core";
import React, { useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Element } from "react-scroll";
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore";
import {
  newSkillExpectationDto,
  SkillExpectationDto,
} from "../../../../../types/domain/skillbase/SkillExpectationDto";
import ExpectationItem from "./ExpectationItem/ExpectationItem";
import changeExpectationPosition from "./ExpectationItem/utils/changeExpectationPosition";

interface Props {
  expectations: SkillExpectationDto[];
  level: number;
  isHighlighted: boolean;
  disabled?: boolean;
  onChangeExpectations: (expectations: SkillExpectationDto[]) => void;
}

const ExpectationsAtLevel = (props: Props) => {
  const theme = useTheme();
  const { setDraggingExpectation } = useSkillbaseStore();
  const [editingIndex, setEditingIndex] = useState<number>(null);

  const handleAddExpectation = () => {
    const newExpectation = newSkillExpectationDto(
      props.level,
      filteredAndSorted.length
    );

    const expectations = [...props.expectations, newExpectation];

    setEditingIndex(newExpectation.index);

    console.log({ expectations });
    props.onChangeExpectations(expectations);

    // beforeOnChangeExpectations(expectations);
  };

  const beforeOnChangeExpectations = (expectations: SkillExpectationDto[]) => {
    const otherLevelsExpectations = expectations.filter(
      (e) => e.level !== props.level
    );

    // normalizing index
    const thisLevelExpectation = filteredAndSorted.map((exp, index) => ({
      ...exp,
      index,
    }));

    const newExpectations = [
      ...otherLevelsExpectations,
      ...thisLevelExpectation,
    ];

    console.log({ newExpectations });
    props.onChangeExpectations(newExpectations);
  };

  const filteredAndSorted = useMemo(() => {
    if (!props.expectations) return [];
    return props.expectations
      .filter((expectation) => expectation.level === props.level)
      .sort((a, b) => {
        if (a.index > b.index) return 1;
        if (a.index < b.index) return -1;
        return 0;
      });
  }, [props.expectations, props.level]);

  // when you drop an item over "+ add button", it must add to the end of that level
  const [, dropItemRef] = useDrop<SkillExpectationDto, unknown, unknown>({
    accept: "dnd-expectation",
    hover(from, monitor) {
      const toIndex = filteredAndSorted.length;

      if (from.level === props.level && from.index === toIndex) return;

      const newExpectations = changeExpectationPosition(
        props.expectations,
        from,
        { ...from, index: toIndex, level: props.level }
      );

      props.onChangeExpectations(newExpectations);
      // required to avoid multiple events
      from.index = toIndex;
      from.level = props.level;
    },

    drop: () => {
      setDraggingExpectation(null);
    },
  });

  const htmlDropItemRef = useRef<HTMLButtonElement>();
  dropItemRef(htmlDropItemRef);

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

      {filteredAndSorted.map((expectation, index) => (
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
      ))}

      <Box mt={0.5} ml={1}>
        {editingIndex === null && !props.disabled && (
          <Button
            onClick={handleAddExpectation}
            size="small"
            style={{
              background: theme.palette.grey[800],
              fontWeight: "normal",
            }}
            ref={htmlDropItemRef}
          >
            Add Goal or Concept to Learn
          </Button>
        )}
      </Box>
    </Box>
  );
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
