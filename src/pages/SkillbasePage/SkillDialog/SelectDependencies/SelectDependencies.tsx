import { Box, Typography } from "@material-ui/core";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import FlexHCenter from "../../../../components/shared/Flexboxes/FlexHCenter";
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter";
import MyTextField from "../../../../components/shared/MyInputs/MyTextField";
import { ApplicationState } from "../../../../store/store";
import { SkillDto } from "../../../../types/domain/skillbase/SkillDto";

const SelectDependencies = (props: Props) => {
  const [options, setOptions] = useState<SkillDto[]>(props.allSkills);

  // filtering options
  useEffect(
    () => {
      const dontShowTheseIds = [props.parentSkillId];

      setOptions(
        props.allSkills.filter((skill) => !dontShowTheseIds.includes(skill.id))
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.allSkills, props.selected]
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

const mapStateToProps = (state: ApplicationState) => ({
  allSkills: state.skillbase.skills,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

interface OwnProps {
  parentSkillId: number;
  selected: SkillDto[];
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown>
  ) => void;
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SelectDependencies);
