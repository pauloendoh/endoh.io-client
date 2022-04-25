import { Box, TableCell, Tooltip } from "@material-ui/core";
import { getLevelDescription } from "components/Skillbase/SkillDialog/SkillExpectations/ExpectationsAtLevel/ExpectationsAtLevel";
import Flex from "components/_UI/Flexboxes/Flex";
import React, { useMemo } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { SkillDto } from "types/domain/skillbase/SkillDto";
import { SkillExpectationDto } from "types/domain/skillbase/SkillExpectationDto";

type Props = {
  skill: SkillDto;
};

// PE 3/3
const ExpectationsTd = ({ skill }: Props) => {
  const checkedExpectations = useMemo(() => {
    return skill.expectations.filter((expectation) => expectation.checked);
  }, [skill.expectations]);

  const missingExpectations = useMemo(() => {
    return skill.expectations
      .filter((expectation) => !expectation.checked)
      .sort((a, b) => a.index - b.index)
      .sort((a, b) => a.level - b.level);
  }, [skill.expectations]);

  const missingExpectationsMap = useMemo(() => {
    const map = new Map();

    for (const expectation of missingExpectations) {
      if (map.get(expectation.level)?.length > 0) {
        map.set(expectation.level, [
          ...map.get(expectation.level),
          expectation,
        ]);
      } else {
        map.set(expectation.level, [expectation]);
      }
    }

    return map;
  }, [missingExpectations]);

  return (
    <TableCell align="center">
      {skill.expectations.length > 0 && (
        <Tooltip
          placement="bottom-end"
          title={
            <Box
              style={{
                width: 400,
                fontSize: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {Array.from(missingExpectationsMap.keys()).map((level) => (
                <div key={level}>
                  <div>
                    {level} - {getLevelDescription(level)}
                  </div>
                  <Flex flexDirection="column" style={{ gap: 4 }}>
                    {missingExpectationsMap
                      .get(level)
                      .map((expectation: SkillExpectationDto) => (
                        <span key={expectation.id}>
                          <MdCheckBoxOutlineBlank
                            style={{
                              marginRight: 4,
                              position: "relative",
                              top: 2,
                            }}
                          />
                          {expectation.description}
                        </span>
                      ))}
                  </Flex>
                </div>
              ))}
            </Box>
          }
        >
          <div>
            {checkedExpectations.length}/{skill.expectations.length}{" "}
            expectations
          </div>
        </Tooltip>
      )}
    </TableCell>
  );
};

export default ExpectationsTd;
