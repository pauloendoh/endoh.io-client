import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import { tagColors } from "./_utils/tagColors"

// PE 2/3
const TagColorSelector = (props: OwnProps) => {
  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={props.value}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e.target.value as string)
          }
        }}
        label="Color"
      >
        {tagColors.map((color) => (
          <MenuItem value={color.color} key={color.color}>
            <FlexVCenter>
              <Box
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 12,
                  background: color.color,
                }}
                mr={1}
              />
              {color.name}
            </FlexVCenter>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

interface OwnProps {
  value: string
  onChange?: (newValue: string) => void
}

export default TagColorSelector
