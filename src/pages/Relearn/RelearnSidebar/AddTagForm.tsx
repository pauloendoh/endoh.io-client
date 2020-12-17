import { Box, Button } from "@material-ui/core"
import Flex from "components/shared/Flexboxes/Flex"
import MyTextField from "components/shared/MyInputs/MyTextField"
import API from "consts/API"
import { newTagDto, TagDto } from "interfaces/dtos/relearn/TagDto"
import { Form, Formik } from "formik"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import MY_AXIOS from "consts/MY_AXIOS"
import * as relearnActions from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"

function AddTagForm(props: Props) {
  return (
    <Box>
      <Formik
        initialValues={newTagDto()}
        onSubmit={(formikValues, { setSubmitting }) => {
          MY_AXIOS.post<TagDto[]>(API.relearn.tag, formikValues)
            .then((res) => {
              props.setTags(res.data)
            })
            .finally(() => {
              setSubmitting(false)
              props.onCloseForm()
            })
        }}
      >
        {({ values, isSubmitting, handleChange }) => (
          <Form>
            <MyTextField
              id="name"
              name="name"
              value={values.name}
              label="Tag Name"
              onChange={handleChange}
              required
              autoFocus
            />
            <Flex mt={1}>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Save
              </Button>
              <Box ml={1}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    props.onCloseForm()
                  }}
                  color="secondary"
                  size="small"
                >
                  Cancel
                </Button>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  // user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
})

interface OwnProps {
  onCloseForm: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(AddTagForm)
