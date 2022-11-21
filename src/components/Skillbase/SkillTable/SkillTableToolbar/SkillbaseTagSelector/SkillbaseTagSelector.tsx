import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import { ApplicationState } from "../../../../../store/store"
import { TagDto } from "../../../../../types/domain/relearn/TagDto"
import FlexHCenter from "../../../../_UI/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../../_UI/Flexboxes/FlexVCenter"
import TagIcon from "../../../../_UI/Icon/TagIcon"

// PE 2/3 - Not so easy to understand the classes logic
const SkillbaseTagSelector = (props: Props) => {
  const theme = useTheme()

  const { skills: allSkills } = useSkillbaseStore()

  const [options, setOptions] = useState<optionTypes[]>([])
  useEffect(() => {
    const sortedTags =
      props.allTags?.sort((a, b) => (a.id > b.id ? 1 : -1)) || []
    const options: optionTypes[] = ["All", ...sortedTags, "Untagged"]

    setOptions(options)
  }, [props.allTags])

  const getOptionValue = (option: optionTypes) => {
    if (typeof option === "string") return option
    if (option === undefined) return ""
    return option.id
  }

  const getSelectValue = (option: optionTypes) => {
    if (typeof option === "string") return { value: option, name: option }
    if (option === undefined) return ""
    return {
      value: option.id,
      name: option.name,
    }
  }

  const getLabel = (option: optionTypes) => {
    if (typeof option === "string") return option
    return option.name
  }

  const getSkillCount = (option: optionTypes) => {
    if (option === "All") return allSkills.length
    if (option === "Untagged")
      return allSkills.filter((s) => s.tagId === null).length

    return allSkills.filter((s) => s.tagId === option.id).length
  }

  const handleChange = (e: SelectChangeEvent<number | "All" | "Untagged">) => {
    if (typeof e.target.value === "string")
      props.onChange(e.target.value as optionTypes)
    if (typeof e.target.value === "number") {
      const tagId = e.target.value as number
      const tag = props.allTags.find((tag) => tag.id === tagId)
      props.onChange(tag)
    }
  }

  return (
    <FormControl variant="outlined" size="small" style={{ width: 250 }}>
      <InputLabel id="tag-selector-label">Tag</InputLabel>

      {/* Use this conditional to hide warning message: "There are no options available for the selected value" */}
      {options.length > 0 && (
        <Select
          id="tag-selector"
          labelId="tag-selector-label"
          value={getOptionValue(props.value)}
          label="Tag"
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={getOptionValue(option)}>
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
      )}
    </FormControl>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
})

export type optionTypes = TagDto | "All" | "Untagged"

type OwnProps = {
  value: optionTypes
  onChange: (newValue: optionTypes) => void
}

type Props = ReturnType<typeof mapStateToProps> & OwnProps

export default connect(mapStateToProps, undefined)(SkillbaseTagSelector)
