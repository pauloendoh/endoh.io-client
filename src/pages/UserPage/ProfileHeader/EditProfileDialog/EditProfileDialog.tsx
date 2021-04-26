import CameraAltIcon from "@material-ui/icons/CameraAlt"
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  InputLabel,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Form, Formik, FormikErrors } from "formik"
import React, { ChangeEvent, createRef, useState } from "react"
import { connect } from "react-redux"
import { Label } from "recharts"
import { Dispatch } from "redux"
import Flex from "../../../../components/shared/Flexboxes/Flex"
import MyTextField from "../../../../components/shared/MyInputs/MyTextField"
import ProfilePicture from "../../../../components/shared/ProfilePicture/ProfilePicture"
import API from "../../../../consts/API"
import MY_AXIOS from "../../../../consts/MY_AXIOS"
import { ProfileDto } from "../../../../dtos/ProfileDto"
import MyAxiosError from "../../../../interfaces/MyAxiosError"
import {
  editProfilePicture,
  setProfile,
} from "../../../../store/profile/profileActions"
import { ApplicationState } from "../../../../store/store"
import * as utilsActions from "../../../../store/utils/utilsActions"
import { urlIsValid } from "../../../../utils/url/isValidUrl"

// PE 2/3
const EditProfileDialog = (props: Props) => {
  const classes = useStyles()
  const [file, setFile] = useState<File>(null)

  const fileInput = createRef<HTMLInputElement>()

  const handleSubmit = (sentProfile: ProfileDto) => {
    MY_AXIOS.put<ProfileDto>(API.user.profile, sentProfile)
      .then((res) => {
        props.setProfile(res.data)
        props.setSuccessMessage("Profile saved!")

        // if (file) {
        // }
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        setFile(null)
        props.onClose()
      })
  }

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    if (file) {
      setFile(file)

      handleFileUpload(file)
    }
  }

  const handleFileUpload = (file: File) => {
    const formData = new FormData()
    formData.append("file", file, file.name)

    MY_AXIOS.post<string>(API.user.picture, formData)
      .then((res) => {
        props.setSuccessMessage("Image uploaded!")
        props.editProfilePicture(res.data)
      })
      .catch((err) => {
        props.setErrorMessage(
          "Profile picture error: invalid type or image is too heavy (2MB max)"
        )
      })
      .finally(() => {
        // setFile(null)
      })
  }

  return (
    <Dialog
      onClose={() => {
        props.onClose()
      }}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="edit-profile-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={props.profile}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues)
          }}
          validate={(values: ProfileDto) => {
            let errors: FormikErrors<ProfileDto> = {}

            if (values.website.length > 0 && !urlIsValid(values.website)) {
              errors.website = "Invalid URL"
            }
            return errors
          }}
        >
          {({ errors, values, isSubmitting, setFieldValue, handleChange }) => (
            <Form>
              <DialogTitle id="edit-profile-dialog-title">
                Edit Profile
              </DialogTitle>
              <DialogContent>
                <Flex>
                  <Box>
                    <Box
                      position="relative"
                      onClick={() => {
                        if (fileInput?.current) {
                          fileInput.current.click()
                        }
                      }}
                    >
                      <ProfilePicture
                        isLink={false}
                        pictureUrl={props.profile.pictureUrl}
                        username=""
                        size={120}
                        onClick={() => {}}
                      />
                      <CameraAltIcon className={classes.cameraIcon} />
                    </Box>
                  </Box>
                  <Box ml={3} flexGrow={1}>
                    <Box>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleFileSelection}
                        ref={fileInput}
                      />
                    </Box>
                    <Box mt={2}>
                      <MyTextField
                        id="fullName"
                        name="fullName"
                        value={values.fullName}
                        label="Full Name"
                        onChange={handleChange}
                        fullWidth
                        autoFocus
                      />
                    </Box>

                    <Box mt={2}>
                      <MyTextField
                        id="bio"
                        name="bio"
                        value={values.bio}
                        label="Bio"
                        multiline
                        onChange={handleChange}
                        fullWidth
                      />
                    </Box>

                    <Box mt={2}>
                      <MyTextField
                        id="website"
                        name="website"
                        value={values.website}
                        label="Website"
                        onChange={handleChange}
                        fullWidth
                      />
                      <Box>
                        {errors.website && (
                          <Typography color="error">
                            {errors.website}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Flex>

                {/* trocar por save cancel button? */}
                <Flex mt={4}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    id="save-profile-button"
                  >
                    Save
                  </Button>

                  <Box ml={1}>
                    <Button onClick={() => props.onClose()} variant="text">
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

const useStyles = makeStyles(() => ({
  cameraIcon: {
    position: "absolute",
    left: 56,
    bottom: 48,
    cursor: "pointer",
  },
}))

const mapStateToProps = (state: ApplicationState) => ({
  profile: state.profile.profile,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProfile: (profile: ProfileDto) => dispatch(setProfile(profile)),
  editProfilePicture: (url: string) => editProfilePicture(dispatch, url),
  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

interface OwnProps {
  open: boolean
  onClose: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDialog)