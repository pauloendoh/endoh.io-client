import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import { Form, Formik } from "formik"
import React from "react"
import SaveCancelButtons from "../../../../../../components/shared/Buttons/SaveCancelButtons"
import MyTextField from "../../../../../../components/shared/MyInputs/MyTextField"
import { NoteDto } from "../../../../../../dtos/define/NoteDto"

interface Props {
  open: boolean
  initialValue: NoteDto
  onClose: () => void
  onSubmit: (newValue: NoteDto) => void
}

const NoteDialog = (props: Props) => {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="note-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          enableReinitialize
          initialValues={props.initialValue}
          onSubmit={(values) => {
            props.onSubmit(values)
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="note-dialog-title">
                {values.id ? "Edit Question" : "New Question"}
              </DialogTitle>
              <DialogContent>
                <Box>
                  <MyTextField
                    id="question"
                    name="question"
                    value={values.question}
                    onChange={handleChange}
                    size="small"
                    label="Question"
                    multiline
                    className="mt-3"
                    fullWidth
                    required
                    autoFocus
                  />
                </Box>

                <Box mt={2}>
                  <MyTextField
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    size="small"
                    label="Answer"
                    multiline
                    className="mt-3"
                    fullWidth
                    required
                  />
                </Box>
              </DialogContent>
              <DialogTitle>
                <SaveCancelButtons
                  disabled={isSubmitting}
                  onCancel={props.onClose}
                />
              </DialogTitle>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  )
}

export default NoteDialog
