import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material"
import { AxiosError } from "axios"
import { Controller, useForm } from "react-hook-form"
import useAuthStore from "store/zustand/useAuthStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import myAxios from "utils/consts/myAxios"
import apiUrls from "utils/url/urls/apiUrls"
import { UsernamePutDto } from "../../../../../types/domain/auth/UsernamePutDto"
import Flex from "../../../../_UI/Flexboxes/Flex"
import MyTextField from "../../../../_UI/MyInputs/MyTextField"

type Props = {
  open: boolean
  onClose: () => void
}

const EditUsernameDialog = (props: Props) => {
  const { setUsername } = useAuthStore()
  const { handleSubmit, control, formState } = useForm<UsernamePutDto>({
    defaultValues: {
      newUsername: "",
    },
  })

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const submit = async (formData: UsernamePutDto) => {
    return myAxios
      .put(apiUrls.auth.username, formData)
      .then((res) => {
        setSuccessMessage("Username changed!")
        setUsername(formData.newUsername)
        props.onClose()
      })
      .catch((err: AxiosError<{ message: string }>) => {
        setErrorMessage(err.response.data.message)
      })
  }

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="edit-username-dialog"
    >
      <Box pb={1} px={1}>
        <form onSubmit={handleSubmit(submit)}>
          <DialogTitle id="edit-username-dialog-title">
            Edit Username
          </DialogTitle>

          <DialogContent>
            <Box>
              <Controller
                render={({ field }) => (
                  <MyTextField
                    {...field}
                    label="New username"
                    required
                    fullWidth
                    sx={{ mt: 1 }}
                    InputLabelProps={{ required: false }}
                  />
                )}
                control={control}
                name="newUsername"
              />
            </Box>

            <Flex mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                id="save-username-button"
                disabled={formState.isSubmitting}
              >
                Save
              </Button>

              <Box ml={1}>
                <Button variant="text" onClick={props.onClose}>
                  Cancel
                </Button>
              </Box>
            </Flex>
          </DialogContent>
        </form>
      </Box>
    </Dialog>
  )
}

export default EditUsernameDialog
