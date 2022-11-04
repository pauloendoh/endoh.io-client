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
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { Dispatch } from "redux"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import MyAxiosError from "types/MyAxiosError"
import pageUrls from "utils/url/urls/pageUrls"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"
import { TagDto } from "../../../types/domain/relearn/TagDto"
import myAxios from "../../../utils/consts/myAxios"
import apiUrls from "../../../utils/url/urls/apiUrls"
import Flex from "../../_UI/Flexboxes/Flex"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import MyTextField from "../../_UI/MyInputs/MyTextField"
import TagColorSelector from "./TagColorSelector/TagColorSelector"

// PE 2/3
const TagDialog = (props: Props) => {
  const history = useHistory()

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const handleSubmit = (sentTag: TagDto) => {
    myAxios
      .post<TagDto[]>(apiUrls.relearn.tag, sentTag)
      .then((res) => {
        setSuccessMessage("Tag saved!")

        const returnedTags = res.data
        props.setTags(returnedTags)

        const savedTagId = returnedTags.find((t) => t.name === sentTag.name).id

        history.push(pageUrls.relearn.tag + "/" + savedTagId)
      })
      .catch((err: MyAxiosError) => {
        setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        props.closeTagDialog()
      })
  }

  return (
    <Dialog
      onClose={() => {
        props.closeTagDialog()
      }}
      open={!!props.editingTag}
      fullWidth
      maxWidth="xs"
      aria-labelledby="edit-tag-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={props.editingTag}
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
                      onClick={() => props.closeTagDialog()}
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
  editingTag: state.relearn.editingTag,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeTagDialog: () => dispatch(relearnActions.closeTagDialog()),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(TagDialog)
