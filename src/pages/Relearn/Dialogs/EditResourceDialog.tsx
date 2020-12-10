import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core"
import Chip from "@material-ui/core/Chip"
import { Autocomplete } from "@material-ui/lab"
import Flex from "components/shared/Flexboxes/Flex"
import MyTextField from "components/shared/MyInputs/MyTextField"
import API from "consts/API"
import { Form, Formik } from "formik"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import myAxios from "utils/myAxios"
import { ResourceDto } from "../../../dtos/relearn/ResourceDto"
import { TagDto } from "../../../dtos/relearn/TagDto"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"

const EditResourceDialog = (props: Props) => {
  const handleSubmit = (resource: ResourceDto) => {
    myAxios
      .post<ResourceDto[]>(API.relearn.resource, resource)
      .then((res) => {
        props.setResources(res.data)
      })
      .finally(() => {
        props.closeResourceDialog()
      })
  }

  return (
    <Dialog
      onClose={() => props.closeResourceDialog()}
      open={!!props.editingResource}
      fullWidth
      maxWidth="md"
      aria-labelledby="edit-resource-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={props.editingResource}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues)
          }}
        >
          {({ values, isSubmitting, handleChange, setFieldValue }) => (
            <Form>
              <DialogTitle id="edit-resource-dialog-title">
                Add Resource
              </DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    id="title"
                    name="title"
                    value={values.title}
                    inputProps={{ "aria-label": "resource-title-input" }}
                    label="Title"
                    required
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>

                <Box mt={2}>
                  <MyTextField
                    id="url"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                    fullWidth
                    label="URL"
                  />
                </Box>

                <Box mt={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={3} md={2}>
                      {/* <Typography component="legend">Duration</Typography> */}
                      <MyTextField
                        id="estimatedTime"
                        name="estimatedTime"
                        value={values.estimatedTime}
                        onChange={handleChange}
                        label="Duration"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2}>
                      {/* <Typography component="legend">Due Date</Typography> */}
                      <MyTextField
                        id="dueDate"
                        name="dueDate"
                        value={values.dueDate}
                        onChange={handleChange}
                        label="Due Date"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                      {/* <Typography component="legend">Tags</Typography> */}
                      <Autocomplete
                        multiple
                        id="tags-autocomplete-input"
                        options={props.tags}
                        defaultValue={props.editingResource?.tags}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        onChange={(e, arr) => {
                          const selectedTags = arr as TagDto[]
                          setFieldValue("tags", selectedTags)
                        }}
                        renderInput={(params) => (
                          <MyTextField {...params} size="small" label="Tags" />
                        )}
                        renderTags={(tagValue, getTagProps) =>
                          tagValue.map((option, index) => (
                            <Chip
                              size="small"
                              label={option.name}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Flex mt={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>

                  <Box ml={1}>
                    <Button
                      onClick={() => props.closeResourceDialog()}
                      variant="text"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Flex>
              </DialogContent>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  // editingPlace: state.monerate.editingPlace,
  tags: state.relearn.tags,
  editingResource: state.relearn.editingResource,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeResourceDialog: () => dispatch(relearnActions.closeResourceDialog()),
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(EditResourceDialog)
