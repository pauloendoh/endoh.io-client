import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Typography,
} from "@mui/material"
import TagIcon from "components/_UI/Icon/TagIcon"
import React, { useEffect, useMemo, useState } from "react"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import FlexHCenter from "../../../_UI/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import MyTextField from "../../../_UI/MyInputs/MyTextField"

interface Props {
  selectedTagId: number | null
  required?: boolean
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: number | null,
    reason: AutocompleteChangeReason | null,
    details?: AutocompleteChangeDetails<unknown>
  ) => void
}

const SkillDialogTagSelector = (props: Props) => {
  const [tag, setTag] = useState<TagDto | null>(null)

  const { tags: allTags } = useRelearnStore()

  useEffect(
    () => {
      if (props.selectedTagId)
        setTag(allTags.find((tag) => tag.id === props.selectedTagId) || null)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.selectedTagId]
  )

  const sortedTags = useMemo(() => {
    if (allTags?.length === 0) return []
    return allTags.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1))
  }, [allTags, allTags?.length])

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
                <Typography>{option.name}</Typography>
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
          label="Tag"
          required={props.required}
          {...params}
          fullWidth
          size="small"
        />
      )}
      onChange={(e, value) => {
        const tag = value as TagDto
        if (!props.onChange) return
        if (tag) return props.onChange(e, Number(tag.id), null)

        return props.onChange(e, null, null)
      }}
    />
  )
}

export default SkillDialogTagSelector
