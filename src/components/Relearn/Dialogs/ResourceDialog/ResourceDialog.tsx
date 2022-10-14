import { faGlobeAmericas, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@material-ui/core"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import { Autocomplete } from "@material-ui/lab"
import { AxiosError } from "axios"
import FlexHCenter from "components/_UI/Flexboxes/FlexHCenter"
import FlexVCenterBetween from "components/_UI/Flexboxes/FlexVCenterBetween"
import TagIcon from "components/_UI/Icon/TagIcon"
import Txt from "components/_UI/Text/Txt"
import { FormikErrors, useFormik } from "formik"
import { useLinkPreviewQuery } from "generated/graphql"
import useQueryParams from "hooks/utils/react-router/useQueryParams"
import useConfirmTabClose from "hooks/utils/useConfirmTabClose"
import React, { useEffect, useMemo, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { MdDeleteForever } from "react-icons/md"
import ReactInputMask from "react-input-mask"
import { connect } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import useDialogsStore from "store/zustand/useDialogsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import buildGraphqlClient from "utils/consts/buildGraphqlClient"
import linkPng from "../../../../static/images/link.png"
import * as relearnActions from "../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../store/store"
import { ResourceDto } from "../../../../types/domain/relearn/ResourceDto"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import myAxios from "../../../../utils/consts/myAxios"
import { urlIsValid } from "../../../../utils/url/isValidUrl"
import apiUrls from "../../../../utils/url/urls/apiUrls"
import pageUrls from "../../../../utils/url/urls/pageUrls"
import RatingButton from "../../../_common/RatingButton/RatingButton"
import SaveCancelButtons from "../../../_UI/Buttons/SaveCancelButtons"
import Flex from "../../../_UI/Flexboxes/Flex"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import MyTextField from "../../../_UI/MyInputs/MyTextField"

// PE 1/3 - tá muito grande
const ResourceDialog = (props: Props) => {
  const theme = useTheme()
  const history = useHistory()
  const location = useLocation()
  const { openConfirmDialog } = useDialogsStore()
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()
  const queryParams = useQueryParams()

  const openResourceId = useMemo(
    () => Number(queryParams.get("openResourceId")) || undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryParams.get("openResourceId")]
  )

  const sortedTags = useMemo(
    () => props.tags?.sort((a, b) => (a.id > b.id ? 1 : -1)) || [],
    [props.tags]
  )

  const clearOpenResourceId = () => {
    queryParams.delete("openResourceId")
    history.push(`${location.pathname}?${queryParams.toString()}`)
  }

  // Testing ?openResourceId -> should open a resource dialog
  useEffect(() => {
    if (!openResourceId) {
      clearOpenResourceId()
      return
    }

    if (props.resources?.length === 0) return

    const resource = props.resources.find((r) => r.id === openResourceId)
    if (resource) {
      props.editResource(resource)

      return
    }

    clearOpenResourceId()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openResourceId, props.resources])

  useEffect(() => {
    if (props.editingResource) {
      setInitialValues({
        ...props.editingResource,
        tag: props.editingResource?.tag || getCurrentTag(),
      })
    }
  }, [props.editingResource])

  const [isFetchingLinkPreview, setIsFetchingLinkPreview] = useState(false)

  const getCurrentTag = (): TagDto => {
    if (location.pathname.startsWith(pageUrls.relearn.tag)) {
      const tagId = Number(location.pathname.split("/").pop())
      if (tagId) {
        const currentTag = sortedTags.find((t) => t.id === tagId)
        if (currentTag) {
          currentTag.resources = undefined
          return currentTag
        }
      }
    }
    return null
  }

  const [initialValues, setInitialValues] = useState<ResourceDto>({
    ...props.editingResource,
    tag: props.editingResource?.tag || getCurrentTag(),
  })

  const {
    errors,
    values,
    isSubmitting,
    submitForm,
    handleChange,
    setFieldValue,
    setValues,
    dirty,
    handleSubmit: formikHandleSubmit,
  } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (formikValues, { setSubmitting }) => {
      handleSubmit(formikValues)
    },
    validate: (newValue: ResourceDto) => {
      let errors: FormikErrors<ResourceDto> = {}

      if (newValue.url.length > 0 && !urlIsValid(newValue.url)) {
        errors.url = "Invalid URL"
      }
      return errors
    },
  })

  useConfirmTabClose(!!props.editingResource && dirty)

  const confirmClose = (isDirty: boolean) => {
    if (isDirty) {
      openConfirmDialog({
        onConfirm: () => closeAndClearQueryParam(),
        title: "Discard changes?",
      })
    } else {
      closeAndClearQueryParam()
    }
  }

  const closeAndClearQueryParam = () => {
    clearOpenResourceId()
    props.closeResourceDialog()
  }

  const handleSubmit = (resource: ResourceDto, closeOnSuccess = true) => {
    myAxios
      .post<ResourceDto[]>(apiUrls.relearn.resource, resource)
      .then((res) => {
        const resources = [...props.resources]
        props.setResources(res.data)
        setSuccessMessage("Resource saved!")

        myAxios.get<TagDto[]>(apiUrls.relearn.tag).then((res) => {
          props.setTags(res.data)
        })

        // PE 1/3 - why this?
        if (closeOnSuccess) {
          closeAndClearQueryParam()
          return
        }

        let newResource = res.data.find((r) => r.id === resource.id)
        if (!newResource) {
          const prevResourcesIds = resources.map((r) => r.id)
          newResource = res.data.find((r) => !prevResourcesIds.includes(r.id))
        }

        setInitialValues({
          ...newResource,
          tag: props.editingResource?.tag || getCurrentTag(),
        })
      })
      .catch((err: AxiosError) => {
        setErrorMessage(err.message || "Error while saving resource.")
      })
      .finally()
  }

  useHotkeys(
    "Control+s",
    (e) => {
      e.preventDefault()
      handleSubmit(values, false)
    },
    {
      enableOnTags: ["INPUT", "SELECT", "TEXTAREA"],
    }
  )

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  const fetchLinkPreview = (
    url: string,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    setValues: (
      values: React.SetStateAction<ResourceDto>,
      shouldValidate?: boolean
    ) => void
  ) => {
    clearTimeout(throttle)
    setThrottle(
      setTimeout(() => {
        if (urlIsValid(url)) {
          setIsFetchingLinkPreview(true)
          setFieldValue("title", "Loading...")

          useLinkPreviewQuery
            .fetcher(buildGraphqlClient(), {
              url,
            })()
            .then((res) => {
              const { getLinkPreview: preview } = res
              if (preview.youtubeVideoLength !== "00:00h")
                setFieldValue("estimatedTime", preview.youtubeVideoLength)
              setFieldValue("title", preview.title)
              setFieldValue("thumbnail", preview.image)

              if (preview.alreadySavedResource) {
                openConfirmDialog({
                  title: "You already saved this URL. Open it?",
                  description: preview.alreadySavedResource.title,
                  onConfirm: () => {
                    if (preview.alreadySavedResource?.tagId) {
                      const tag = props.tags.find(
                        (t) => t.id === preview.alreadySavedResource.tagId
                      )
                      if (tag)
                        return setValues({
                          ...preview.alreadySavedResource,
                          tag,
                        } as ResourceDto)
                    }
                    setValues(preview.alreadySavedResource as ResourceDto)
                  },
                })
              }
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

  // PE 1/3 - dry with resource more icon?
  const handleDeleteResource = () => {
    openConfirmDialog({
      title: "Delete resource?",
      onConfirm: () => {
        myAxios
          .delete(`${apiUrls.relearn.resource}/${values.id}`)
          .then((res) => {
            setSuccessMessage("Resource deleted!")
            props.removeResource(values.id)
            closeAndClearQueryParam()
          })
      },
    })
  }

  return (
    <Dialog
      onClose={() => confirmClose(dirty)}
      open={!!props.editingResource}
      fullWidth
      maxWidth="md"
      aria-labelledby="edit-resource-dialog"
    >
      <Box pb={1} px={1}>
        <DialogTitle id="edit-resource-dialog-title">
          <FlexVCenterBetween>
            <Txt variant="h5">
              {values.id > 0 ? "Edit Resource" : "Add Resource"}
            </Txt>
            {values.id > 0 && (
              <Button
                onClick={handleDeleteResource}
                style={{
                  color: theme.palette.error.main,
                }}
                startIcon={<MdDeleteForever />}
              >
                Delete
              </Button>
            )}
          </FlexVCenterBetween>
        </DialogTitle>
        <form onSubmit={formikHandleSubmit}>
          <DialogContent>
            <Flex>
              {values.thumbnail?.length > 0 && (
                <Box mr={2} position="relative">
                  <a href={values.url} target="_blank" rel="noreferrer">
                    <img
                      style={{ maxHeight: 90, maxWidth: 200 }}
                      alt="link-preview-thumbnail"
                      src={values.thumbnail}
                      onError={(e: any) => {
                        e.target.onerror = null
                        e.target.src = linkPng
                        e.target.alt = "default-link-thumbnail"
                      }}
                    />
                  </a>
                  <IconButton
                    onClick={() => setFieldValue("thumbnail", "")}
                    size="small"
                    style={{ position: "absolute", right: 0 }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
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
                    onClickClearIcon={() => {
                      setFieldValue("title", "")
                    }}
                  />
                </Box>
                <Box mt={2} position="relative">
                  <MyTextField
                    id="url"
                    name="url"
                    value={values.url}
                    onChange={(e) => {
                      handleChange(e)
                      fetchLinkPreview(e.target.value, setFieldValue, setValues)
                      // if (urlAutofillChecked) {
                      //   fetchLinkPreview(e.target.value, setFieldValue)
                      // }
                    }}
                    fullWidth
                    label="URL"
                    onClickClearIcon={() => setFieldValue("url", "")}
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
                  <ReactInputMask
                    mask="99:99h"
                    value={values.estimatedTime}
                    onChange={handleChange}
                    maskPlaceholder=" "
                  >
                    {() => (
                      <MyTextField
                        id="estimatedTime"
                        name="estimatedTime"
                        label="Duration"
                        fullWidth
                      />
                    )}
                  </ReactInputMask>
                </Grid>

                <Grid item xs={6} sm={9}>
                  {/* PE 1/3 - dry into <TagSelector/> also used at skill dialog */}
                  <Autocomplete
                    id="tags-autocomplete-input"
                    options={sortedTags}
                    value={values.tag}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    onChange={(e, val) => {
                      console.log(val)
                      const selectedTag = val as TagDto
                      setFieldValue("tag", selectedTag)
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        size="small"
                        required
                        label="Tag"
                        error={!!errors.tag}
                        helperText={errors?.tag?.id || ""}
                      />
                    )}
                    renderOption={(option) => (
                      <FlexVCenter>
                        {option.id ? (
                          <FlexVCenter>
                            <TagIcon tag={option} />
                            <Box ml={1}>
                              <Typography>{option.name}</Typography>
                            </Box>
                          </FlexVCenter>
                        ) : (
                          <FlexHCenter>{option.name}</FlexHCenter>
                        )}
                      </FlexVCenter>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <RatingButton
                rating={values.rating}
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
                maxRows={16}
                onCtrlEnter={() => {
                  submitForm()
                }}
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
                onCtrlEnter={() => {
                  submitForm()
                }}
                onChange={handleChange}
                fullWidth
                maxRows={16}
                label={
                  <FlexVCenter>
                    <FontAwesomeIcon icon={faLock} style={{ marginRight: 4 }} />
                    Private Notes
                  </FlexVCenter>
                }
              />
            </Box>

            <Box mt={2} />
            <SaveCancelButtons
              submitButtonId="save-resource-button"
              disabled={isSubmitting || !dirty}
              onCancel={() => confirmClose(dirty)}
            />
          </DialogContent>
        </form>
      </Box>
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  // editingPlace: state.monerate.editingPlace,
  resources: state.relearn.resources,
  tags: state.relearn.tags,
  editingResource: state.relearn.editingResource,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) =>
    dispatch(relearnActions.editResource(resource)),
  closeResourceDialog: () => dispatch(relearnActions.closeResourceDialog()),
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  removeResource: (id: number) => dispatch(relearnActions.removeResource(id)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDialog)
