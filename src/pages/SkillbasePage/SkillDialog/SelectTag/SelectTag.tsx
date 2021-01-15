import { Box, Typography } from "@material-ui/core"
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FlexHCenter from "../../../../components/shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter"
import MyTextField from "../../../../components/shared/MyInputs/MyTextField"
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto"
import { ApplicationState } from "../../../../store/store"

const SelectTag = (props: Props) => {
  const [tag, setTag] = useState<TagDto>(null)

  useEffect(
    () => {
      setTag(props.allTags.find((tag) => tag.id === props.tagId))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.tagId]
  )

  return (
    <Box>
      <Autocomplete
        value={tag}
        options={[...props.allTags]}
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
            label="# tag"
            {...params}
            size="small"
          />
        )}
        onChange={(e, value) => {
          const tag = value as TagDto

          if (tag) {
            props.onChange(e, tag.id, null)
          } else {
            // tag is null
            props.onChange(e, null, null)
          }
        }}
      />
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  tagId: number
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown>
  ) => void
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SelectTag)
