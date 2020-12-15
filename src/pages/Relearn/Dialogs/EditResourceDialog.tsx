import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@material-ui/core"
import Chip from "@material-ui/core/Chip"
import { Autocomplete } from "@material-ui/lab"
import Flex from "components/shared/Flexboxes/Flex"
import MyTextField from "components/shared/MyInputs/MyTextField"
import API from "consts/API"
import { Form, Formik, FormikErrors } from "formik"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import myAxios from "utils/myAxios"
import { ResourceDto } from "../../../dtos/relearn/ResourceDto"
import { TagDto } from "../../../dtos/relearn/TagDto"
import * as relearnActions from "../../../store/relearn/relearnActions"
import * as utilsActions from "../../../store/utils/utilsActions"
import { ApplicationState } from "../../../store/store"
import { LinkPreviewDto } from "../../../dtos/relearn/LinkPreviewDto"
import MyAxiosError from "utils/MyAxiosError"
import { useLocation } from "react-router-dom"
import PATHS from "consts/PATHS"
import { isValidUrl } from "utils/isValidUrl"
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter"

const EditResourceDialog = (props: Props) => {
  const handleSubmit = (resource: ResourceDto) => {
    myAxios
      .post<ResourceDto[]>(API.relearn.resource, resource)
      .then((res) => {
        props.setResources(res.data)

        props.setSuccessMessage("Resource saved!")

        myAxios.get<TagDto[]>(API.relearn.tag).then((res) => {
          props.setTags(res.data)
        })
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        props.closeResourceDialog()
      })
  }

  const [urlAutofillChecked, setUrlAutofillChecked] = useState(true)

  const handleCheckAutofill = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUrlAutofillChecked(event.target.checked)
  }

  // Adding throttle to avoid LinkPreview over
  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  const fetchLinkPreview = (
    url: string,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    clearTimeout(throttle)
    setThrottle(
      setTimeout(() => {
        if (isValidUrl(url)) {
          myAxios
            .get<LinkPreviewDto>(API.relearn.utils.linkPreview + "?url=" + url)
            .then((res) => {
              const preview = res.data

              setFieldValue("title", preview.title)
              setFieldValue("thumbnail", preview.image)
            })
        }
      }, 200)
    )
  }

  const location = useLocation()
  const getCurrentTag = (): TagDto => {
    if (location.pathname.startsWith(PATHS.relearn.tag)) {
      const tagId = Number(location.pathname.split("/").pop())
      if (tagId) {
        const currentTag = props.tags.find((t) => t.id === tagId)
        if (currentTag) {
          return currentTag
        }
      }
    }
    return null
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
          initialValues={
            {
              ...props.editingResource,
              tag: props.editingResource?.tag
                ? props.editingResource.tag
                : getCurrentTag(),
            } as ResourceDto
          }
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues)
          }}
          validate={(values: ResourceDto) => {
            let errors: FormikErrors<ResourceDto> = {}

            if (values.url.length > 0 && !isValidUrl(values.url)) {
              errors.url = "Invalid URL"
            }
            return errors
          }}
        >
          {({
            touched,
            errors,
            values,
            isSubmitting,
            handleChange,
            setFieldValue,
          }) => (
            <Form>
              <DialogTitle id="edit-resource-dialog-title">
                Add Resource
              </DialogTitle>
              <DialogContent>
                <Flex>
                  {values.thumbnail.length > 0 && (
                    <Box mr={2}>
                      <Link href={values.url} target="_blank">
                        <img
                          style={{ maxHeight: 100 }}
                          alt="link-preview-thumbnail"
                          src={values.thumbnail}
                        />
                      </Link>
                    </Box>
                  )}

                  <Box flexGrow={1}>
                    <Box>
                      <MyTextField
                        id="url"
                        name="url"
                        value={values.url}
                        onChange={(e) => {
                          handleChange(e)

                          if (urlAutofillChecked) {
                            fetchLinkPreview(e.target.value, setFieldValue)
                          }
                        }}
                        fullWidth
                        label="URL"
                        error={errors?.url?.length > 0}
                        autoFocus
                      />
                    </Box>
                    <FlexVCenter justifyContent="space-between">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={urlAutofillChecked}
                            onChange={handleCheckAutofill}
                            name="urlAutofillCheckBox"
                            color="primary"
                          />
                        }
                        label="Autofill via URL"
                      />
                      <Box>
                        {errors.url && (
                          <Typography color="error">{errors.url}</Typography>
                        )}
                      </Box>
                    </FlexVCenter>

                    <Box mt={2}>
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
                  </Box>
                </Flex>

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
                        id="tags-autocomplete-input"
                        options={props.tags}
                        defaultValue={
                          props.editingResource?.tag
                            ? props.editingResource.tag
                            : getCurrentTag()
                        }
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        onChange={(e, val) => {
                          const selectedTag = val as TagDto
                          setFieldValue("tag", selectedTag)
                        }}
                        renderInput={(params) => (
                          <MyTextField {...params} size="small" label="Tag" />
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
                  <Button type="submit" variant="contained" color="primary" id="save-resource-button">
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
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(EditResourceDialog)
