import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import * as monerateActions from "../../../store/monerate/monerateActions"
import { ApplicationState } from "../../../store/store"
import CategoryGetDto from "../../../types/domain/monerate/CategoryGetDto"
import MY_AXIOS from "../../../utils/consts/myAxios"
import apiUrls from "../../../utils/url/urls/apiUrls"
import CategoryIcon from "../../_UI/CategoryIcon"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"

const CategorySettings = (props: Props) => {
  useEffect(() => {
    MY_AXIOS.get<CategoryGetDto[]>(apiUrls.monerate.category).then((res) => {
      props.setCategories(res.data)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (id: number) => {
    if (window.confirm("Confirm delete?")) {
      MY_AXIOS.delete<CategoryGetDto[]>(
        `${apiUrls.monerate.category}/${id}`
      ).then((res) => {
        props.setCategories(res.data)
      })
    }
  }

  return (
    <Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          props.startNewCategory()
        }}
      >
        <Box display="flex" alignItems="center">
          <FontAwesomeIcon icon={faPlus} />
          <Box ml={1}>New category</Box>
        </Box>
      </Button>

      <Box mt={4} />
      {props.categories.length ? (
        <Paper>
          <Box p={2}>
            <Typography variant="h5">Categories</Typography>
            <Box mt={2} />
            <Grid container spacing={1}>
              {props.categories.map((category, index) => (
                <Grid key={category.id} item xs={12}>
                  <FlexVCenter>
                    <FlexVCenter>
                      <CategoryIcon category={category} />
                      <Box ml={2} width={200}>
                        {category.name}
                      </Box>
                    </FlexVCenter>
                    <FlexVCenter>
                      <IconButton
                        onClick={() => {
                          props.editCategory(category)
                        }}
                        aria-label="edit-category"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleDelete(category.id)
                        }}
                        aria-label="delete-category"
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
  categories: state.monerate.categories,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCategories: (categories: CategoryGetDto[]) =>
    dispatch(monerateActions.setCategories(categories)),

  editCategory: (category: CategoryGetDto) =>
    dispatch(monerateActions.editCategory(category)),
  startNewCategory: () => dispatch(monerateActions.startNewCategory()),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(CategorySettings)
