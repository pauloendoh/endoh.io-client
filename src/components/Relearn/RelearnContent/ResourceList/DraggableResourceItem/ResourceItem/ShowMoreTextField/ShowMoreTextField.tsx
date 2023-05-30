import { Paper, Typography, useTheme } from "@mui/material"
import ShowMoreText from "react-show-more-text"
import myColors from "utils/consts/myColors"
import "./ShowMoreTextField.css"

interface Props {
  text: string
}

function ShowMoreTextField(props: Props) {
  const theme = useTheme()
  return (
    <Paper
      style={{
        padding: 16,
        background: theme.palette.grey[900],
        border: myColors.border,
      }}
    >
      <Typography color="textSecondary" style={{ whiteSpace: "pre-line" }}>
        <ShowMoreText keepNewLines>{props.text}</ShowMoreText>
      </Typography>
    </Paper>
  )
}

export default ShowMoreTextField
