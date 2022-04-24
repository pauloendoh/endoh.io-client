import { SkillExpectationDto } from "types/domain/skillbase/SkillExpectationDto";
import { expectationsAtLevel } from "./expectationsAtLevel";
import { normalizeExpectations } from "./normalizeExpectations";

const changeExpectationPosition = (
  expectations: SkillExpectationDto[],
  from: SkillExpectationDto,
  to: SkillExpectationDto
) => {
  const toLevelExpectations = expectationsAtLevel(expectations, to.level);
  const fromLevelExpectations = expectationsAtLevel(expectations, from.level);
  const allOtherItems = expectations.filter(
    (e) => e.level !== to.level && e.level !== from.level
  );

  // backup item -> remove -> splice (insert) -> normalize
  const indexToDelete = fromLevelExpectations.findIndex(
    (e) => e.id === from.id
  );
  const draggedExpectation = fromLevelExpectations[indexToDelete];

  // guarantees "remove" on both situations (same level and different levels)
  const areSameLevel = from.level === to.level;
  if (areSameLevel) toLevelExpectations.splice(indexToDelete, 1);
  else fromLevelExpectations.splice(indexToDelete, 1);

  // inserting
  toLevelExpectations.splice(to.index, 0, draggedExpectation);

  const newToLevelExpectations = normalizeExpectations(
    toLevelExpectations,
    to.level
  );

  // if same level, "ignore" this step by creating an empty array
  const newFromLevelExpectations = areSameLevel
    ? []
    : normalizeExpectations(fromLevelExpectations, from.level);

  return [
    ...allOtherItems,
    ...newFromLevelExpectations,
    ...newToLevelExpectations,
  ];
};

export default changeExpectationPosition;
