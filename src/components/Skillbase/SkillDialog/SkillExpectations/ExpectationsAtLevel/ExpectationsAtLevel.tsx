import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import MyReactLinkify from "components/_UI/link/MyReactLinkify";
import Txt from "components/_UI/Text/Txt";
import React, { useState } from "react";
import { FaFire } from "react-icons/fa";
import { Element } from "react-scroll";
import {
  createSkillExpectation,
  SkillExpectationDto,
} from "../../../../../types/domain/skillbase/SkillExpectationDto";
import Flex from "../../../../_UI/Flexboxes/Flex";
import ExpectationTextarea from "./ExpectationTextarea/ExpectationTextarea";

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

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    expectation: SkillExpectationDto
  ) => {
    changeExpectations(
      props.expectations.map((e) => {
        if (e.index === expectation.index && e.level === expectation.level) {
          e.checked = event.target.checked;
        }
        return e;
      })
    );
  };

  const editOrRemoveDescription = (index: number, newDescription: string) => {
    // remove
    if (newDescription.trim().length === 0) {
      changeExpectations(
        props.expectations.filter((e) => {
          if (e.index === index && e.level === props.level) return false;
          return true;
        })
      );

      return;
    }

    // update
    changeExpectations(
      props.expectations.map((e) => {
        if (e.index === index && e.level === props.level) {
          e.description = newDescription;
        }
        return e;
      })
    );
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

  const toggleCurrentGoal = (level: number, index: number) => {
    let expectation = [...props.expectations].find(
      (e) => e.level === level && e.index === index
    );

    if (!expectation) return; // very unlikely to happen

    // remove current goal from everyone
    let expectations = [...props.expectations].map((e) => ({
      ...e,
      isCurrentGoal: false,
    }));

    if (!expectation.isCurrentGoal) {
      expectation = expectations.find(
        (e) => e.level === level && e.index === index
      );
      expectation.isCurrentGoal = true;
    }

    props.onChangeExpectations(expectations);
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
        (expectation, i) => (
          <Flex
            key={i}
            title={
              props.disabled
                ? "This is not your item. You can’t change it."
                : ""
            }
          >
            {/* box is required so checkbox doesn't get vertically centralized */}
            <Box>
              <Checkbox
                disabled={props.disabled}
                onChange={(event) => handleCheck(event, expectation)}
                checked={expectation.checked}
                color="primary"
              />
            </Box>

            <Box position="relative" style={{ flexGrow: 1 }}>
              {editingIndex === i ? (
                <ExpectationTextarea
                  initialValue={expectation.description}
                  onChange={(newDescription) => {
                    if (
                      newDescription !== expectation.description ||
                      newDescription.length === 0
                    )
                      editOrRemoveDescription(i, newDescription);

                    setEditingIndex(null);
                  }}
                />
              ) : (
                <Box
                  pt={1}
                  style={{ cursor: props.disabled ? "default" : "pointer" }}
                  onClick={() => {
                    if (!props.disabled) setEditingIndex(i);
                  }}
                >
                  <Txt>
                    {expectation.checked && !props.disabled ? (
                      <s>
                        <MyReactLinkify openNewTab>
                          {expectation.description}
                        </MyReactLinkify>
                      </s>
                    ) : (
                      <MyReactLinkify openNewTab>
                        {expectation.description}
                      </MyReactLinkify>
                    )}
                  </Txt>
                </Box>
              )}
            </Box>

            <Tooltip title="Current goal">
              <IconButton
                onClick={() =>
                  toggleCurrentGoal(props.level, expectation.index)
                }
                size="small"
                style={{ width: 36, height: 36 }}
              >
                <FaFire
                  style={{
                    color: expectation.isCurrentGoal
                      ? theme.palette.secondary.main
                      : "#989898",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Flex>
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
