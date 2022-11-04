import { Paper, Typography, useTheme } from "@mui/material"
import ShowMoreText from "react-show-more-text"
import colors from "utils/consts/colors"
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
        border: colors.border,
      }}
    >
      <Typography color="textSecondary" style={{ whiteSpace: "pre-line" }}>
        <ShowMoreText keepNewLines>{props.text}</ShowMoreText>
      </Typography>
    </Paper>
  )
}

export default ShowMoreTextField
