import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@material-ui/core"
import React, { ChangeEvent, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FlexHCenter from "../../../../../components/shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import TagIcon from "../../../../../components/shared/Icon/TagIcon"
import { TagDto } from "../../../../../interfaces/dtos/relearn/TagDto"
import { ApplicationState } from "../../../../../store/store"

// PE 2/3 - Not so easy to understand the classes logic
const SkillbaseTagSelector = (props: Props) => {
  const theme = useTheme()

  const [options, setOptions] = useState<optionTypes[]>([])
  useEffect(() => {
    const options: optionTypes[] = ["All", ...props.allTags, "Untagged"]

    setOptions(options)
  }, [props.allTags])

  const getProperValue = (option: optionTypes) => {
    if (typeof option === "string") return option
    return option.id
  }

  const getLabel = (option: optionTypes) => {
    if (typeof option === "string") return option
    return option.name
  }

  const getSkillCount = (option: optionTypes) => {
    if (option === "All") return props.allSkills.length
    if (option === "Untagged")
      return props.allSkills.filter((s) => s.tagId === null).length

    return props.allSkills.filter((s) => s.tagId === option.id).length
  }

  const handleChange = (
    e: ChangeEvent<{
      name?: string
      value: unknown
    }>
  ) => {
    if (typeof e.target.value === "string")
      props.onChange(e.target.value as optionTypes)
    else {
      const tagId = e.target.value as number
      const tag = props.allTags.find((tag) => tag.id === tagId)
      props.onChange(tag)
    }
  }

  return (
    <FormControl variant="outlined" size="small" style={{ width: 250 }}>
      <InputLabel id="tag-selector-label">Tag</InputLabel>
      <Select
        labelId="tag-selector-label"
        value={getProperValue(props.value)}
        label="Tag"
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={getProperValue(option)}>
            <FlexVCenter justifyContent="space-between" width="100%">
              <FlexVCenter>
                {typeof option !== "string" && (
                  <FlexVCenter width={24} mr={1}>
                    <TagIcon tag={option} />
                  </FlexVCenter>
                )}

                <Typography noWrap style={{ maxWidth: 150 }}>
                  {getLabel(option)}
                </Typography>
              </FlexVCenter>

              <FlexHCenter width={24} color={theme.palette.grey[400]}>
                {getSkillCount(option)}
              </FlexHCenter>
            </FlexVCenter>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  allSkills: state.skillbase.skills,
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export type optionTypes = TagDto | "All" | "Untagged"

type OwnProps = {
  value: optionTypes
  onChange: (newValue: optionTypes) => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillbaseTagSelector)
