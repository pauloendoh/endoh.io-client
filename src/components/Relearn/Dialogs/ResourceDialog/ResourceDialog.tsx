import { faGlobeAmericas, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import {
  Autocomplete,
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import { AxiosError } from "axios"
import FlexHCenter from "components/_UI/Flexboxes/FlexHCenter"
import FlexVCenterBetween from "components/_UI/Flexboxes/FlexVCenterBetween"
import TagIcon from "components/_UI/Icon/TagIcon"
import Txt from "components/_UI/Text/Txt"
import { FormikErrors, useFormik } from "formik"
import useQueryParams from "hooks/utils/react-router/useQueryParams"
import { useAxios } from "hooks/utils/useAxios"
import useConfirmTabClose from "hooks/utils/useConfirmTabClose"
import { DateTime } from "luxon"
import { useEffect, useMemo, useState } from "react"
import { MdClose, MdSave } from "react-icons/md"
import { useHistory, useLocation } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import useDialogsStore from "store/zustand/useDialogsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { format } from "timeago.js"
import { urls } from "utils/urls"
import linkPng from "../../../../static/images/link.png"
import { ResourceDto } from "../../../../types/domain/relearn/ResourceDto"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import { urlIsValid } from "../../../../utils/url/isValidUrl"
import SaveCancelButtons from "../../../_UI/Buttons/SaveCancelButtons"
import Flex from "../../../_UI/Flexboxes/Flex"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import MyTextField from "../../../_UI/MyInputs/MyTextField"
import RatingButton from "../../../_common/RatingButton/RatingButton"
import ResourceDialogMoreMenu from "./ResourceDialogMoreMenu/ResourceDialogMoreMenu"
import ResourceSavedMessage from "./ResourceSavedMessage/ResourceSavedMessage"
import { useFetchLinkPreview } from "./useFetchLinkPreview/useFetchLinkPreview"

const ResourceDialog = () => {
  const {
    resources,
    tags,
    editingResource,
    setEditingResource,
    removeResource,
    setResources,
    setTags,
  } = useRelearnStore()

  const axios = useAxios()
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
    () =>
      tags
        ?.sort((a, b) => (a.id > b.id ? 1 : -1))
        .sort((a, b) => {
          // !isPrivate tags first
          if (a.isPrivate && !b.isPrivate) return 1
          if (!a.isPrivate && b.isPrivate) return -1
          return 0
        }) || [],

    // had to add editingResource because tags were not sorted properly when refreshing page
    [tags, editingResource]
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

    if (resources?.length === 0) return

    const resource = resources.find((r) => r.id === openResourceId)
    if (resource) {
      setEditingResource(resource)

      return
    }

    clearOpenResourceId()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openResourceId, resources])

  useEffect(() => {
    if (editingResource) {
      setInitialValues({
        ...editingResource,
        tag: editingResource?.tag || getCurrentTag(),
      })
    }
  }, [editingResource])

  const [isFetchingLinkPreview, setIsFetchingLinkPreview] = useState(false)

  const getCurrentTag = (): TagDto => {
    if (location.pathname.startsWith(urls.pages.resources.tag)) {
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
    ...editingResource,
    tag: editingResource?.tag || getCurrentTag(),
  })

  const {
    errors,
    values,

    submitForm,
    handleChange,
    setFieldValue,
    setValues,
    dirty,
    handleSubmit: formikHandleSubmit,
  } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (formikValues) => {
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

  const isDisabled = useMemo(
    () => !dirty || !editingResource,
    [dirty, editingResource]
  )

  useConfirmTabClose(!!editingResource && dirty)

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
    setEditingResource(null)
  }

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (resource: ResourceDto, closeOnSuccess = true) => {
    setIsLoading(true)
    const payload: ResourceDto = {
      ...resource,
      tag: {
        ...resource.tag,
        resources: undefined,
      },
    }
    axios
      .post<ResourceDto[]>(urls.api.relearn.resource, payload)
      .then((res) => {
        const currentResources = [...resources]

        setResources(res.data)
        setSuccessMessage(<ResourceSavedMessage allResources={res.data} />)

        axios.get<TagDto[]>(urls.api.relearn.tag).then((res) => {
          setTags(res.data)
        })

        // PE 1/3 - why this?
        if (closeOnSuccess) {
          closeAndClearQueryParam()
          return
        }

        let newResource = res.data.find((r) => r.id === resource.id)
        if (!newResource) {
          const prevResourcesIds = currentResources.map((r) => r.id)
          newResource = res.data.find((r) => !prevResourcesIds.includes(r.id))
        }

        setInitialValues({
          ...newResource,
          tag: editingResource?.tag || getCurrentTag(),
        })
      })
      .catch((err: AxiosError) => {
        setErrorMessage(err.message || "Error while saving resource.")
      })
      .finally(() => setIsLoading(false))
  }

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  const fetchLinkPreview = useFetchLinkPreview({
    throttle,
    setThrottle,
    setIsFetchingLinkPreview,
    tags,
    values,
  })

  const handleDeleteResource = () => {
    openConfirmDialog({
      title: "Delete resource?",
      onConfirm: () => {
        axios
          .delete(`${urls.api.relearn.resource}/${values.id}`)
          .then((res) => {
            setSuccessMessage("Resource deleted!")

            removeResource(values.id)
            closeAndClearQueryParam()
          })
      },
    })
  }

  const completedOverOneDayAgo = useMemo(() => {
    if (!values.completedAt) return false

    const dt = DateTime.fromISO(values.completedAt)
    return dt.diffNow().as("days") < -1
  }, [values.completedAt])

  return (
    <Dialog
      onClose={() => confirmClose(dirty)}
      open={!!editingResource}
      fullWidth
      maxWidth="md"
      aria-labelledby="edit-resource-dialog"
    >
      <form onSubmit={formikHandleSubmit}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle id="edit-resource-dialog-title">
          <FlexVCenterBetween>
            <Txt variant="h5">
              {values.id > 0 ? "Edit Resource" : "Add Resource"}
            </Txt>

            <FlexVCenter>
              <SaveCancelButtons
                submitButtonId="save-resource-button"
                isLoading={isLoading}
                disabled={isDisabled}
                onEnabledAndCtrlEnter={() => submitForm()}
                onEnableAndCtrlS={() => {
                  handleSubmit(values, false)
                }}
                onCancel={() => confirmClose(dirty)}
                hideCancelButton
                saveButtonText={
                  <FlexVCenter gap={1}>
                    <MdSave fontSize={16} />
                    Save and close
                  </FlexVCenter>
                }
              />
              {values.id > 0 && (
                <ResourceDialogMoreMenu
                  resource={values}
                  onClickDelete={handleDeleteResource}
                />
              )}

              <IconButton
                onClick={() => confirmClose(dirty)}
                color="inherit"
                sx={{ minWidth: "auto" }}
              >
                <MdClose />
              </IconButton>
            </FlexVCenter>
          </FlexVCenterBetween>
        </DialogTitle>

        <DialogContent
          sx={{
            maxHeight: "calc(100vh - 200px)",
            pb: 4,
          }}
        >
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
                  sx={{ mt: 1 }}
                  id="title"
                  name="title"
                  value={values.title}
                  inputProps={{ "aria-label": "resource-title-input" }}
                  label="Title"
                  required
                  onChange={handleChange}
                  fullWidth
                  autoFocus
                  InputLabelProps={{
                    shrink: !!values.title,
                  }}
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
                <FlexVCenter mt={1}></FlexVCenter>

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
                {/* <ReactInputMask
                  mask="99:99h"
                  value={values.estimatedTime}
                  onChange={handleChange}
                  maskPlaceholder=" "
                >
                  {(p) => (
                    <>
                      <MyTextField
                        id="estimatedTime"
                        name="estimatedTime"
                        label="Duration"
                        fullWidth
                        {...p}
                      />
                    </>
                  )} */}
                {/* </ReactInputMask> */}

                <MyTextField
                  id="estimatedTime"
                  name="estimatedTime"
                  label="Duration"
                  fullWidth
                  value={values.estimatedTime}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6} sm={9}>
                {/* PE 1/3 - dry into <TagSelector/> also used at skill dialog */}
                <Autocomplete
                  id="tags-autocomplete-input"
                  options={sortedTags}
                  value={values.tag}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.name
                  }
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
                  renderOption={(liProps, option) => (
                    <li
                      {...liProps}
                      style={{ display: "flex", alignItems: "center" }}
                    >
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
                    </li>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <FlexVCenter mt={2} gap={2}>
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
            <Typography variant="body2">
              {completedOverOneDayAgo && format(values.completedAt)}
            </Typography>
          </FlexVCenter>

          {/* public review */}
          <Box mt={2}>
            <MyTextField
              id="publicReview"
              name="publicReview"
              value={values.publicReview}
              multiline
              onChange={handleChange}
              fullWidth
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
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: values.privateNote ? true : undefined,
              }}
              label={
                <FlexVCenter>
                  <FontAwesomeIcon icon={faLock} style={{ marginRight: 4 }} />
                  Private Notes
                </FlexVCenter>
              }
            />
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ResourceDialog
