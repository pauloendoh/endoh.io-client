import { Box, makeStyles } from "@material-ui/core"
import { Form, Formik } from "formik"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import PATHS from "../../../consts/PATHS"
import { ResourceDto } from "../../../interfaces/dtos/relearn/ResourceDto"
import { editResource } from "../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../store/store"
import { IWithRedirectProps, withRedirect } from "../../hocs/withRedirect"
import MyTextField from "../../shared/MyInputs/MyTextField"

const SearchBar = (props: Props) => {
  const classes = useStyles()
  return (
    <Box>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { setSubmitting }) => {
          if (values.query.length) {
            props.redirectTo(PATHS.search(values.query))
          }
        }}
      >
        {({ errors, values, isSubmitting, setFieldValue, handleChange }) => (
          <Form>
            <MyTextField
              id="query"
              name="query"
              label="Search Endoh.io"
              onChange={handleChange}
            />
          </Form>
        )}
      </Formik>

      {/* Old search box with autocomplete */}
      {/* <Autocomplete
        options={props.allResources}
        renderOption={(option) => (
          <FlexVCenter>
            {option.id ? (
              <FlexVCenter>
                <Box ml={1}>
                  <Typography variant="body2">{option.title}</Typography>
                </Box>
              </FlexVCenter>
            ) : (
              <FlexHCenter>{option.title}</FlexHCenter>
            )}
          </FlexVCenter>
        )}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <MyTextField
            label="Search endoh.io"
            {...params}
            size="small"
            className={classes.textfield}
          />
        )}
        onChange={(e, value) => {
          props.editResource(value as ResourceDto)
        }}
      /> */}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: 200,
  },
}))

const mapStateToProps = (state: ApplicationState) => ({
  allResources: state.relearn.resources,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) => dispatch(editResource(resource)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IWithRedirectProps

export default withRedirect(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
)
