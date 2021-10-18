import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter";
import { MY_LIST_COLORS } from "../../../../utils/consts/MY_LIST_COLORS";

// PE 2/3
const SelectColor = (props: OwnProps) => {
  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value as string)}
        label="Color"
      >
        {MY_LIST_COLORS.map((color) => (
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
  );
};

interface OwnProps {
  value: string;
  onChange?: (newValue: string) => void;
}

export default SelectColor;
