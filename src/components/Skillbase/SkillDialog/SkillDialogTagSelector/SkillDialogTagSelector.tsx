import { Box, Typography } from "@material-ui/core";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab";
import TagIcon from "components/_UI/Icon/TagIcon";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../../store/store";
import { TagDto } from "../../../../types/domain/relearn/TagDto";
import FlexHCenter from "../../../_UI/Flexboxes/FlexHCenter";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";
import MyTextField from "../../../_UI/MyInputs/MyTextField";

const SkillDialogTagSelector = (props: Props) => {
  const [tag, setTag] = useState<TagDto>(null);

  useEffect(
    () => {
      if (props.valueTagId) {
        setTag(props.allTags.find((tag) => tag.id === props.valueTagId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.valueTagId]
  );

  return (
    <Autocomplete // PE 1/3 - dry into <TagSelector/> also used at skill dialog
      value={tag}
      options={[...props.allTags]}
      renderOption={(option) => (
        <FlexVCenter>
          {option.id ? (
            <FlexVCenter>
              <TagIcon tag={option} />
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
          InputProps={{ id: "skill-dialog-tag-selector" }}
          fullWidth
          label="# tag"
          required={props.required}
          {...params}
          size="small"
        />
      )}
      onChange={(e, value) => {
        const tag = value as TagDto;

        if (tag) {
          props.onChange(e, tag.id, null);
        } else {
          // tag is null
          props.onChange(e, null, null);
        }
      }}
    />
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

interface OwnProps {
  valueTagId: number;
  required?: boolean;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillDialogTagSelector);
