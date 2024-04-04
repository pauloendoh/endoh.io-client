import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { urls } from "utils/urls"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"

const QuestionsDescription = () => {
  return (
    <Grid id="questions-description" spacing={3} container>
      <Grid item xs={12} sm={8}>
        <Box>
          <iframe
            width="480"
            height="315"
            src="https://www.youtube.com/embed/GIXsLVjuNYo"
            title="YouTube video player"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h4">
          <FlexVCenter>
            <FontAwesomeIcon icon={faUsers} />
            <Box ml={1}>Flashcards</Box>
          </FlexVCenter>
        </Typography>

        <Typography variant="subtitle1">
          Study questions and flashcards{" "}
        </Typography>

        <Box mt={2}>
          <Link
            to={urls.pages.questions.index}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              Check /questions
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

export default QuestionsDescription
