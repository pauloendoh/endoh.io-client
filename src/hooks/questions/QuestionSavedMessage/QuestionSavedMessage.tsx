import { Typography } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import { QuestionDto } from "types/domain/questions/QuestionDto"
import { useDefaultSubmitQuestion } from "../useDefaultSubmitQuestion"

type Props = {
  question: QuestionDto
}

const QuestionSavedMessage = (props: Props) => {
  const { question: data } = props
  const submit = useDefaultSubmitQuestion()
  const { openDialog: openNoteDialog } = useQuestionDialogStore()

  return (
    <FlexVCenter gap={0.5}>
      <Typography>Question saved!</Typography>
      <Typography
        sx={{
          cursor: "pointer",
        }}
        fontWeight={500}
        onClick={() => {
          openNoteDialog({
            initialValue: data,
            onSubmit: submit,
          })
        }}
      >
        Open
      </Typography>
    </FlexVCenter>
  )
}

export default QuestionSavedMessage
