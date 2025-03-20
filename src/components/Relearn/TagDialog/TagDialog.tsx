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
import { useSaveTagMutation } from "hooks/react-query/relearn/useSaveTagMutation"
import { useNavigate } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import { urls } from "utils/urls"
import Flex from "../../_UI/Flexboxes/Flex"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import MyTextField from "../../_UI/MyInputs/MyTextField"
import TagColorSelector from "./TagColorSelector/TagColorSelector"

const TagDialog = () => {
  const navigate = useNavigate()

  const { editingTag, setEditingTag } = useRelearnStore()

  const { mutate: submitSave, isLoading } = useSaveTagMutation()

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
            onSubmit={(formikValues) => {
              submitSave(formikValues, {
                onSuccess: (saved) => {
                  navigate(urls.pages.resources.tag + "/" + saved.id)
                  setEditingTag(null)
                },
              })
            }}
          >
            {({ values, setFieldValue, handleChange }) => (
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
                      disabled={isLoading}
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
