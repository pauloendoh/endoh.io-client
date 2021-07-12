import { Box } from "@material-ui/core"
import { Form, Formik } from "formik"
import React from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router"
import { Dispatch } from "redux"
import PATHS from "../../../consts/PATHS"
import { ResourceDto } from "../../../interfaces/dtos/relearn/ResourceDto"
import { editResource } from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"
import MyTextField from "../../shared/MyInputs/MyTextField"

const SearchBar = (props: Props) => {
  const history = useHistory()
  return (
    <Box>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { setSubmitting }) => {
          if (values.query.length) {
            history.push(PATHS.search(values.query))
          }
        }}
      >
        {({ errors, values, isSubmitting, setFieldValue, handleChange }) => (
          <Form>
            <MyTextField
              id="query"
              name="query"
              label="Search endoh.io"
              onChange={handleChange}
            />
          </Form>
        )}
      </Formik>
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  allResources: state.relearn.resources,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) => dispatch(editResource(resource)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
