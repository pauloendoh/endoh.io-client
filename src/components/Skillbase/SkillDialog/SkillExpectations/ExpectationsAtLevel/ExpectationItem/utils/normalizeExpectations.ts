import { SkillExpectationDto } from "types/domain/skillbase/SkillExpectationDto";

export function normalizeExpectations(
  expectations: SkillExpectationDto[],
  level: number
) {
  return expectations.map(
    (expectation, index) =>
      ({
        ...expectation,
        index,
        level,
      } as SkillExpectationDto)
  );
}
