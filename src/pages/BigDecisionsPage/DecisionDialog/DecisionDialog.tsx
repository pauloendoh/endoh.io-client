import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import { Form, Formik } from "formik"
import React from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { Dispatch } from "redux"
import * as utilsActions from "store/utils/utilsActions"
import usePostDecisionMutation from "utils/hooks/queryHooks/BigDecisions/usePostDecisionMutation"
import SaveCancelButtons from "components/shared/Buttons/SaveCancelButtons"
import MyTextField from "components/shared/MyInputs/MyTextField"
import PATHS from "consts/PATHS"
import { DecisionDto } from "dtos/BigDecisions/DecisionDto"
import { DocDto } from "dtos/define/DocDto"
import { addOrReplaceDoc } from "store/define/defineActions"
import { ApplicationState } from "store/store"

const DecisionDialog = (props: Props) => {
  const history = useHistory()

  const handleClose = () => {
    props.onClose()
  }

  const { mutate: postDecision } = usePostDecisionMutation()

  const handleSubmit = (values: DecisionDto) => {
    postDecision(values, {
      onSuccess: (data) => {
        props.setSuccessMessage("Decision saved!")
        handleClose()
        history.push(PATHS.BigDecisions.decision(data.id))
      },
    })
  }

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="decision-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          enableReinitialize
          initialValues={props.initialValue}
          onSubmit={(formikValues) => {
            handleSubmit(formikValues)
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="decision-dialog-title">
                {values.id ? "Edit Decision" : "New Decision"}
              </DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    size="small"
                    label="Title"
                    className="mt-3"
                    fullWidth
                    required
                    autoFocus
                  />
                </Box>
              </DialogContent>
              <DialogTitle>
                <SaveCancelButtons
                  disabled={isSubmitting}
                  onCancel={handleClose}
                />
              </DialogTitle>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  // editingTag: state.relearn.editingTag,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addOrReplaceDoc: (doc: DocDto) => dispatch(addOrReplaceDoc(doc)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

interface OwnProps {
  open: boolean
  initialValue: DecisionDto
  onClose: () => void
  afterSave?: (returned: DecisionDto) => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(DecisionDialog)