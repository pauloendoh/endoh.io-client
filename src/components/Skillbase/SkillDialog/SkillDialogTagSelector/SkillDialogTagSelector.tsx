import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Typography,
} from "@mui/material"
import TagIcon from "components/_UI/Icon/TagIcon"
import React, { useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ApplicationState } from "../../../../store/store"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import FlexHCenter from "../../../_UI/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import MyTextField from "../../../_UI/MyInputs/MyTextField"

const SkillDialogTagSelector = (props: Props) => {
  const [tag, setTag] = useState<TagDto>(null)

  useEffect(
    () => {
      if (props.selectedTagId)
        setTag(props.allTags.find((tag) => tag.id === props.selectedTagId))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.selectedTagId]
  )

  const sortedTags = useMemo(() => {
    if (props.allTags?.length === 0) return []
    return props.allTags.sort((a, b) => (a.id > b.id ? 1 : -1))
  }, [props.allTags])

  return (
    <Autocomplete // PE 1/3 - dry into <TagSelector/> also used at skill dialog
      value={tag}
      options={sortedTags}
      renderOption={(liProps, option) => (
        <li {...liProps} style={{ display: "flex", alignItems: "center" }}>
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
        </li>
      )}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      renderInput={(params) => (
        <MyTextField
          InputProps={{ id: "skill-dialog-tag-selector" }}
          fullWidth
          label="Tag"
          required={props.required}
          {...params}
          size="small"
        />
      )}
      onChange={(e, value) => {
        const tag = value as TagDto
        if (tag) return props.onChange(e, tag.id, null)

        return props.onChange(e, null, null)
      }}
    />
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  selectedTagId: number
  required?: boolean
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: number,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown>
  ) => void
}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillDialogTagSelector)
