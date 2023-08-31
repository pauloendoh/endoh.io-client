import { Box, useTheme } from "@mui/material"
import ShowMoreText from "react-show-more-text"
import myColors from "utils/consts/myColors"
import "./ShowMoreTextField.css"

interface Props {
  text: string
}

function ShowMoreTextField(props: Props) {
  const theme = useTheme()
  return (
    <Box
      style={{
        padding: 16,
        background: theme.palette.grey[900],
        border: myColors.border,
        borderRadius: 4,
      }}
    >
      <ShowMoreText keepNewLines>{props.text}</ShowMoreText>
    </Box>
  )
}

export default ShowMoreTextField
