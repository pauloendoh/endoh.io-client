import { Box, Typography } from "@material-ui/core";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore";
import { SkillDto } from "../../../../types/domain/skillbase/SkillDto";
import FlexHCenter from "../../../_UI/Flexboxes/FlexHCenter";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import MyTextField from "../../../_UI/MyInputs/MyTextField";

interface Props {
  parentSkillId: number;
  selected: SkillDto[];
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown>
  ) => void;
}

const SelectDependencies = (props: Props) => {
  const { skills: allSkills } = useSkillbaseStore();

  const [options, setOptions] = useState<SkillDto[]>(allSkills);

  // filtering options
  useEffect(
    () => {
      const dontShowTheseIds = [props.parentSkillId];

      setOptions(
        allSkills.filter((skill) => !dontShowTheseIds.includes(skill.id))
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allSkills, props.selected]
  );

  return (
    <Box>
      <Autocomplete
        multiple
        value={props.selected}
        options={[...options]}
        getOptionSelected={(option, value) => {
          return option.id === value.id;
        }}
        renderOption={(option) => (
          <FlexVCenter>
            {option.id ? (
              <FlexVCenter>
                <Box ml={1}>
                  <Typography variant="body2">{option.name}</Typography>
                </Box>
              </FlexVCenter>
            ) : (
              <FlexHCenter>{option.name}</FlexHCenter>
            )}
          </FlexVCenter>
        )}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <MyTextField
            fullWidth
            label="Dependencies"
            {...params}
            size="small"
          />
        )}
        onChange={(e, value) => {
          const skills = value as SkillDto[];

          // setDependencies(skills)
          props.onChange(e, skills, null);
        }}
      />
    </Box>
  );
};

export default SelectDependencies;
