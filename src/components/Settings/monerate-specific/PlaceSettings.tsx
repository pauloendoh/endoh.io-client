import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import MY_AXIOS from "utils/consts/myAxios"
import { urls } from "utils/urls"
import * as monerateActions from "../../../store/monerate/monerateActions"
import { ApplicationState } from "../../../store/store"
import PlaceGetDto from "../../../types/domain/monerate/PlaceGetDto"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import PlaceIcon from "../../_UI/PlaceIcon"

const PlaceSettings = (props: Props) => {
  useEffect(() => {
    MY_AXIOS.get<PlaceGetDto[]>(urls.api.monerate.place).then((res) => {
      props.setPlaces(res.data)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      MY_AXIOS.delete<PlaceGetDto[]>(`${urls.api.monerate.place}/${id}`).then(
        (res) => {
          props.setPlaces(res.data)
        }
      )
    }
  }

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.startNewPlace()
        }}
      >
        <Box display="flex" alignItems="center">
          <FontAwesomeIcon icon={faPlus} />
          <Box ml={1}>New place</Box>
        </Box>
      </Button>

      <Box mt={4} />
      {props.places.length ? (
        <Paper>
          <Box p={2}>
            <Typography variant="h5">Places</Typography>
            <Box mt={2} />
            <Grid container spacing={1}>
              {props.places.map((place, index) => (
                <Grid key={place.id} item xs={12}>
                  <FlexVCenter>
                    <FlexVCenter>
                      <PlaceIcon place={place} />
                      <Box ml={2} width={200}>
                        {place.name}
                      </Box>
                    </FlexVCenter>
                    <FlexVCenter>
                      <IconButton
                        onClick={() => {
                          props.editPlace(place)
                        }}
                        aria-label="edit-place"
                        size="large"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleDelete(place.id || 0)
                        }}
                        aria-label="delete-place"
                        size="large"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </FlexVCenter>
                  </FlexVCenter>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      ) : null}
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  places: state.monerate.places,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPlaces: (places: PlaceGetDto[]) =>
    dispatch(monerateActions.setPlaces(places)),

  editPlace: (place: PlaceGetDto) => dispatch(monerateActions.editPlace(place)),
  startNewPlace: () => dispatch(monerateActions.startNewPlace()),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(PlaceSettings)
