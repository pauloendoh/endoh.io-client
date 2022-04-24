import { SkillExpectationDto } from "types/domain/skillbase/SkillExpectationDto";

export function expectationsAtLevel(
  expectations: SkillExpectationDto[],
  level: number
) {
  const expectationsAtLevel = expectations.filter(
    (expectation) => expectation.level === level
  );
  return expectationsAtLevel;
}
