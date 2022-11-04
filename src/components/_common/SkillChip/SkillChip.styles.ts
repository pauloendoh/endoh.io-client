import { Button, styled } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
const SkillChipStyles = {
  SkillButton: styled(Button)(({ theme }) => ({
    marginRight: 8,
    marginBottom: 8,
    fontWeight: 400,
  })),
  InnerChip: styled(FlexVCenter)(({ theme }) => ({
    background: "#393939",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
  })),
}

export default SkillChipStyles
