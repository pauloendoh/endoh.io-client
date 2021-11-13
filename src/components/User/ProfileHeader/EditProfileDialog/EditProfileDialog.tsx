import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Form, Formik, FormikErrors } from "formik";
import { useEditProfilePicture } from "hooks/auth/useEditProfilePicture";
import React, { ChangeEvent, createRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import useProfileStore from "store/zustand/domain/useProfileStore";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import { ProfileDto } from "../../../../types/domain/_common/ProfileDto";
import MyAxiosError from "../../../../types/MyAxiosError";
import apiUrls from "../../../../utils/consts/apiUrls";
import myAxios from "../../../../utils/consts/myAxios";
import { urlIsValid } from "../../../../utils/url/isValidUrl";
import Flex from "../../../_UI/Flexboxes/Flex";
import MyTextField from "../../../_UI/MyInputs/MyTextField";
import ProfilePicture from "../../../_UI/ProfilePicture/ProfilePicture";

// PE 2/3
const EditProfileDialog = (props: Props) => {
  const classes = useStyles();

  const fileInput = createRef<HTMLInputElement>();

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const profileStore = useProfileStore();
  const editProfilePicture = useEditProfilePicture(props.dispatch);

  const handleSubmit = (sentProfile: ProfileDto) => {
    myAxios
      .put<ProfileDto>(apiUrls.user.profile, sentProfile)
      .then((res) => {
        profileStore.setProfile(res.data);
        setSuccessMessage("Profile saved!");
      })
      .catch((err: MyAxiosError) => {
        setErrorMessage(err.response.data.errors[0].message);
      })
      .finally(() => {
        props.onClose();
      });
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    myAxios
      .post<string>(apiUrls.user.picture, formData)
      .then((res) => {
        setSuccessMessage("Image uploaded!");
        editProfilePicture(res.data);
      })
      .catch((err) => {
        setErrorMessage(
          "Profile picture error: invalid type or image is too heavy (2MB max)"
        );
      });
  };

  return (
    <Dialog
      onClose={() => {
        props.onClose();
      }}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="edit-profile-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={profileStore.profile}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues);
          }}
          validate={(values: ProfileDto) => {
            let errors: FormikErrors<ProfileDto> = {};

            if (values.website.length > 0 && !urlIsValid(values.website)) {
              errors.website = "Invalid URL";
            }
            return errors;
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
                          fileInput.current.click();
                        }
                      }}
                    >
                      <ProfilePicture
                        isLink={false}
                        pictureUrl={profileStore.profile.pictureUrl}
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
  );
};

const useStyles = makeStyles(() => ({
  cameraIcon: {
    position: "absolute",
    left: 56,
    bottom: 48,
    cursor: "pointer",
  },
}));

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
});

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps;

export default connect(undefined, mapDispatchToProps)(EditProfileDialog);
