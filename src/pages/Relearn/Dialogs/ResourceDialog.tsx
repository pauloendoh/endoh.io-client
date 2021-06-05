import { faGlobeAmericas, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  Typography,
} from "@material-ui/core"
import Chip from "@material-ui/core/Chip"
import { Autocomplete } from "@material-ui/lab"
import { Form, Formik, FormikErrors } from "formik"
import React, { useState } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import MaskedInput from "react-text-mask"
import { Dispatch } from "redux"
import RateButton from "../../../components/resources/RateButton/RateButton"
import SaveCancelButtons from "../../../components/shared/Buttons/SaveCancelButtons"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import PATHS from "../../../consts/PATHS"
import { LinkPreviewDto } from "../../../interfaces/dtos/relearn/LinkPreviewDto"
import { ResourceDto } from "../../../interfaces/dtos/relearn/ResourceDto"
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto"
import MyAxiosError from "../../../interfaces/MyAxiosError"
import linkPng from "../../../static/images/link.png"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"
import * as utilsActions from "../../../store/utils/utilsActions"
import { urlIsValid } from "../../../utils/url/isValidUrl"
import ResourceThumbnail from "../Content/ResourceList/DraggableResourceItem/ResourceThumbnail/ResourceThumbnail"

// PE 1/3 - tá muito grande
const ResourceDialog = (props: Props) => {
  const [isFetchingLinkPreview, setIsFetchingLinkPreview] = useState(false)

  const handleSubmit = (resource: ResourceDto) => {
    MY_AXIOS.post<ResourceDto[]>(API.relearn.resource, resource)
      .then((res) => {
        props.setResources(res.data)
        props.setSuccessMessage("Resource saved!")

        MY_AXIOS.get<TagDto[]>(API.relearn.tag).then((res) => {
          props.setTags(res.data)
        })
      })
      .catch((err: MyAxiosError) => {
        // PE 1/3 - This is common. Should I create a getFirstErrorMessage(err: MyAxiosErr)
        // or even props.showAxiosError(err: MyAxiosError)
        props.setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        props.closeResourceDialog()
      })
  }

  const [urlAutofillChecked, setUrlAutofillChecked] = useState(true)

  const handleCheckAutofill = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        if (urlIsValid(url)) {
          setIsFetchingLinkPreview(true)
          setFieldValue("title", "Loading...")
          MY_AXIOS.get<LinkPreviewDto>(API.utils.linkPreview + "?url=" + url)
            .then((res) => {
              const preview = res.data
              if (preview.duration !== "00:00h")
                setFieldValue("estimatedTime", preview.duration)
              setFieldValue("title", preview.title)
              setFieldValue("thumbnail", preview.image)
            })
            .catch(() => {
              setFieldValue("title", "")
            })
            .finally(() => {
              setIsFetchingLinkPreview(false)
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

            if (values.url.length > 0 && !urlIsValid(values.url)) {
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
                {values.id > 0 ? "Edit Resource" : "Add Resource"}
              </DialogTitle>
              <DialogContent>
                <Flex>
                  {values.thumbnail.length > 0 && (
                    <Box mr={2}>
                      <img
                        style={{ maxHeight: 90, maxWidth: 200 }}
                        alt="link-preview-thumbnail"
                        src={values.thumbnail}
                        // Testing... 20210510
                        onError={(e: any) => {
                          e.target.onerror = null
                          e.target.src = linkPng
                          e.target.alt = "default-link-thumbnail"
                        }}
                      />
                    </Box>
                  )}

                  <Box flexGrow={1}>
                    <Box position="relative">
                      <MyTextField
                        id="title"
                        name="title"
                        value={values.title}
                        inputProps={{ "aria-label": "resource-title-input" }}
                        label="Title"
                        required
                        onChange={handleChange}
                        fullWidth
                        autoFocus
                      />
                    </Box>
                    <Box mt={2} position="relative">
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
                      />
                      {isFetchingLinkPreview && (
                        <CircularProgress
                          style={{ position: "absolute", right: 12, top: 10 }}
                          size={16}
                        />
                      )}
                    </Box>
                    <FlexVCenter justifyContent="space-between">
                      <FlexVCenter mt={1}>
                        {/* <FormControlLabel
                          control={
                            <Checkbox
                              checked={urlAutofillChecked}
                              onChange={handleCheckAutofill}
                              name="urlAutofillCheckBox"
                              color="primary"
                            />
                          }
                          label="Autofill via URL"
                        /> */}
                      </FlexVCenter>

                      <Box>
                        {errors.url && (
                          <Typography color="error">{errors.url}</Typography>
                        )}
                      </Box>
                    </FlexVCenter>
                  </Box>
                </Flex>

                <Box mt={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                      {/* <Typography component="legend">Duration</Typography> */}
                      <MyTextField
                        id="estimatedTime"
                        name="estimatedTime"
                        value={values.estimatedTime}
                        onChange={handleChange}
                        label="Duration"
                        fullWidth
                        InputProps={{
                          inputComponent: TextMaskCustom as any,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      {/* <Typography component="legend">Due Date</Typography> */}
                      <MyTextField
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={values.dueDate}
                        onChange={handleChange}
                        label="Due Date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                <Box mt={2}>
                  <RateButton
                    resource={values}
                    onChange={(newRating) => {
                      setFieldValue("rating", newRating)

                      // If you're adding a rating, set "completedAt"
                      setFieldValue(
                        "completedAt",
                        newRating > 0 ? new Date().toISOString() : ""
                      )
                    }}
                  />
                </Box>

                {/* public review */}
                <Box mt={2}>
                  <MyTextField
                    id="publicReview"
                    name="publicReview"
                    value={values.publicReview}
                    multiline
                    onChange={handleChange}
                    fullWidth
                    label={
                      <FlexVCenter>
                        <FontAwesomeIcon
                          icon={faGlobeAmericas}
                          style={{ marginRight: 4 }}
                        />
                        Public Review
                      </FlexVCenter>
                    }
                  />
                </Box>

                <Box mt={2}>
                  <MyTextField
                    id="privateNote"
                    name="privateNote"
                    value={values.privateNote}
                    multiline
                    onChange={handleChange}
                    fullWidth
                    label={
                      <FlexVCenter>
                        <FontAwesomeIcon
                          icon={faLock}
                          style={{ marginRight: 4 }}
                        />
                        Private Notes
                      </FlexVCenter>
                    }
                  />
                </Box>

                <Box mt={2} />
                <SaveCancelButtons
                  submitButtonId="save-resource-button"
                  disabled={isSubmitting}
                  onCancel={() => props.closeResourceDialog()}
                />
              </DialogContent>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  )
}

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/\d/, /\d/, ":", /\d/, /\d/, "h"]}
      placeholderChar={"\u2000"}
      showMask
    />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDialog)
