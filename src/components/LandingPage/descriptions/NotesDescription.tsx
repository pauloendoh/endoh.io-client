import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import pageUrls from "../../../utils/url/urls/pageUrls"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"

const NotesDescription = () => {
  return (
    <Grid id="notes-description" spacing={3} container>
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
            <Box ml={1}>Notes</Box>
          </FlexVCenter>
        </Typography>

        <Typography variant="subtitle1">Study notes and flashcards </Typography>

        <Box mt={2}>
          <Link
            to={pageUrls.questions.index}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              Check /define
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

export default NotesDescription
