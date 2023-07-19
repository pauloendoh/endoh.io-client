import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@mui/material"
import { Form, Formik } from "formik"
import { useAxios } from "hooks/utils/useAxios"
import { useHistory } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import MyAxiosError from "types/MyAxiosError"
import { urls } from "utils/urls"
import { TagDto } from "../../../types/domain/relearn/TagDto"
import Flex from "../../_UI/Flexboxes/Flex"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import MyTextField from "../../_UI/MyInputs/MyTextField"
import TagColorSelector from "./TagColorSelector/TagColorSelector"

// PE 2/3
const TagDialog = () => {
  const history = useHistory()

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()
  const { editingTag, setEditingTag, setTags } = useRelearnStore()

  const axios = useAxios()
  const handleSubmit = (sentTag: TagDto) => {
    axios
      .post<TagDto[]>(urls.api.relearn.tag, sentTag)
      .then((res) => {
        setSuccessMessage("Tag saved!")

        const returnedTags = res.data
        setTags(returnedTags)

        const savedTagId = returnedTags.find((t) => t.name === sentTag.name)?.id

        history.push(urls.pages.resources.tag + "/" + savedTagId)
      })
      .catch((err: MyAxiosError) => {
        setErrorMessage(err.response?.data.errors[0].message)
      })
      .finally(() => {
        setEditingTag(null)
      })
  }

  return (
    <Dialog
      onClose={() => {
        setEditingTag(null)
      }}
      open={!!editingTag}
      fullWidth
      maxWidth="xs"
      aria-labelledby="edit-tag-dialog"
    >
      <Box pb={1} px={1}>
        {editingTag && (
          <Formik
            initialValues={editingTag}
            onSubmit={(formikValues, { setSubmitting }) => {
              handleSubmit(formikValues)
            }}
          >
            {({ values, isSubmitting, setFieldValue, handleChange }) => (
              <Form>
                <DialogTitle id="edit-tag-dialog-title">
                  {values.id ? "Edit Tag" : "Add Tag"}
                </DialogTitle>
                <DialogContent>
                  <Box>
                    <MyTextField
                      data-testid="tag-name-input"
                      id="name"
                      name="name"
                      value={values.name}
                      inputProps={{ "aria-label": "tag-name-input" }}
                      required
                      sx={{ mt: 1 }}
                      label="Tag Name"
                      onChange={handleChange}
                      fullWidth
                      autoFocus
                    />
                  </Box>

                  <Box mt={2}>
                    {/*  */}
                    <TagColorSelector
                      value={values.color}
                      onChange={(newValue) => {
                        setFieldValue("color", newValue)
                      }}
                    />
                  </Box>

                  <FlexVCenter>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.isPrivate}
                          onChange={() => {
                            setFieldValue("isPrivate", !values.isPrivate)
                          }}
                          color="primary"
                        />
                      }
                      label="Private tag"
                    />
                  </FlexVCenter>

                  <Flex mt={4}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      id="save-tag-button"
                    >
                      Save
                    </Button>

                    <Box ml={1}>
                      <Button
                        onClick={() => setEditingTag(null)}
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
        )}
      </Box>
    </Dialog>
  )
}

export default TagDialog
