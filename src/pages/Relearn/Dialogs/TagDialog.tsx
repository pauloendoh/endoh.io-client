import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@material-ui/core"
import PATHS from "consts/PATHS"
import { Form, Formik } from "formik"
import MyAxiosError from "interfaces/MyAxiosError"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
  IWithRedirectProps,
  withRedirect,
} from "../../../components/hocs/withRedirect"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"
import * as utilsActions from "../../../store/utils/utilsActions"
import SelectColor from "./SelectColor/SelectColor"

// PE 2/3
const TagDialog = (props: Props) => {
  const handleSubmit = (sentTag: TagDto) => {
    MY_AXIOS.post<TagDto[]>(API.relearn.tag, sentTag)
      .then((res) => {
        props.setSuccessMessage("Tag saved!")

        const returnedTags = res.data
        props.setTags(returnedTags)

        const savedTagId = returnedTags.find((t) => t.name === sentTag.name).id

        props.redirectTo(PATHS.relearn.tag + "/" + savedTagId)
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
                  <SelectColor
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

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IWithRedirectProps

export default withRedirect(
  connect(mapStateToProps, mapDispatchToProps)(TagDialog)
)
