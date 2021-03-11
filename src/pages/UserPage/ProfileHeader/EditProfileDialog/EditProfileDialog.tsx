import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core"
import { Form, Formik, FormikErrors } from "formik"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../../components/shared/Flexboxes/Flex"
import MyTextField from "../../../../components/shared/MyInputs/MyTextField"
import API from "../../../../consts/API"
import MY_AXIOS from "../../../../consts/MY_AXIOS"
import { ProfileDto } from "../../../../dtos/ProfileDto"
import MyAxiosError from "../../../../interfaces/MyAxiosError"
import { setProfile } from "../../../../store/profile/profileActions"
import { ApplicationState } from "../../../../store/store"
import * as utilsActions from "../../../../store/utils/utilsActions"
import { urlIsValid } from "../../../../utils/url/isValidUrl"

// PE 2/3
const EditProfileDialog = (props: Props) => {
  const handleSubmit = (sentProfile: ProfileDto) => {
    MY_AXIOS.put<ProfileDto>(API.user.profile, sentProfile)
      .then((res) => {
        props.setProfile(res.data)
        props.setSuccessMessage("Profile saved!")
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        props.onClose()
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
                <Box>
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
                      <Typography color="error">{errors.website}</Typography>
                    )}
                  </Box>
                </Box>

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

const mapStateToProps = (state: ApplicationState) => ({
  profile: state.profile.profile,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProfile: (profile: ProfileDto) => dispatch(setProfile(profile)),
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
