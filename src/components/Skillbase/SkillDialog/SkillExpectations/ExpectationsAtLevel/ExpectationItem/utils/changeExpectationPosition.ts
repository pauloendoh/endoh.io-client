import { SkillExpectationDto } from "types/domain/skillbase/SkillExpectationDto"
import { expectationsAtLevel } from "./expectationsAtLevel"
import { normalizeExpectations } from "./normalizeExpectations"

const changeExpectationPosition = (
  expectations: SkillExpectationDto[],
  from: SkillExpectationDto,
  to: SkillExpectationDto
) => {
  const expectationsTargetLevel = expectationsAtLevel(expectations, to.level)
  const expectationsOriginLevel = expectationsAtLevel(expectations, from.level)
  const allOtherItems = expectations.filter(
    (e) => e.level !== to.level && e.level !== from.level
  )

  // backup item -> remove -> splice (insert) -> normalize
  const indexToDelete = expectationsOriginLevel.findIndex((expectation) => {
    // had to add this since null ids could not be dragged before each other
    if (expectation.id === null && from.id === null)
      return expectation.randomId === from.randomId
    return expectation.id === from.id
  })
  const draggedExpectation = expectationsOriginLevel[indexToDelete]

  // guarantees "remove" on both situations (same level and different levels)
  const areSameLevel = from.level === to.level
  if (areSameLevel) expectationsTargetLevel.splice(indexToDelete, 1)
  else expectationsOriginLevel.splice(indexToDelete, 1)

  // inserting
  expectationsTargetLevel.splice(to.index, 0, draggedExpectation)

  const newToLevelExpectations = normalizeExpectations(
    expectationsTargetLevel,
    to.level
  )

  // if same level, "ignore" this step by creating an empty array
  const newFromLevelExpectations = areSameLevel
    ? []
    : normalizeExpectations(expectationsOriginLevel, from.level)

  return [
    ...allOtherItems,
    ...newFromLevelExpectations,
    ...newToLevelExpectations,
  ]
}

export default changeExpectationPosition
