import { Typography } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import { NoteDto } from "types/domain/questions/NoteDto"
import { useDefaultSubmitQuestion } from "../useDefaultSubmitQuestion"

type Props = {
  question: NoteDto
}

const QuestionSavedMessage = (props: Props) => {
  const { question: data } = props
  const submit = useDefaultSubmitQuestion()
  const { openNoteDialog } = useNoteDialogStore()

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
