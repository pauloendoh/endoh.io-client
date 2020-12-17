import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core"
import PATHS from "consts/PATHS"
import { Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { Dispatch } from "redux"
import MyAxiosError from "interfaces/MyAxiosError"
import Flex from "../../../components/shared/Flexboxes/Flex"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import API from "../../../consts/API"
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"
import * as utilsActions from "../../../store/utils/utilsActions"
import MY_AXIOS from "../../../consts/MY_AXIOS"

const EditTagDialog = (props: Props) => {
  const [redirectTo, setRedirectTo] = useState("")
  useEffect(() => {
    setRedirectTo("") // Avoids bug which redirects to the previously open tag dialog
  }, [props.editingTag])

  const handleSubmit = (sentTag: TagDto) => {
    MY_AXIOS.post<TagDto[]>(API.relearn.tag, sentTag)
      .then((res) => {
        props.setTags(res.data)
        props.setSuccessMessage("Tag saved!")

        const tags = res.data
        const savedTagId = tags.find((t) => t.name === sentTag.name).id
        setRedirectTo(PATHS.relearn.tag + "/" + savedTagId)
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message)
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
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="edit-tag-dialog-title">Add Tag</DialogTitle>
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

                <Flex mt={2}>
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

      {redirectTo.length > 0 && <Redirect to={redirectTo} />}
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  editingTag: state.relearn.editingTag,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeTagDialog: () => dispatch(relearnActions.closeTagDialog()),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(EditTagDialog)
