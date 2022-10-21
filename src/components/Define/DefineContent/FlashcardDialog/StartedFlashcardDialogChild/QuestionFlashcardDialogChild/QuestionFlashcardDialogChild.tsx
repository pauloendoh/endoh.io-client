import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Clear } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import { NoteDto } from "../../../../../../types/domain/define/NoteDto"
import DarkButton from "../../../../../_UI/Buttons/DarkButton/DarkButton"
import FlexVCenter from "../../../../../_UI/Flexboxes/FlexVCenter"

// PE 2/3
const QuestionFlashcardDialogChild = (p: {
  question: NoteDto
  questionNumber: number
  totalQuestions: number
  docTitle: string
  closeDialog: () => void
  onEditQuestion: (newQuestion: NoteDto) => void
  onWrongAnswer: () => void
  onHalfAnswer: () => void
  onCorrectAnswer: () => void
}) => {
  const [showingAnswer, setShowingAnswer] = useState(false)

  const [openNoteDialog, closeDialog] = useNoteDialogStore((s) => [
    s.onOpen,
    s.onClose,
  ])

  useEffect(() => {
    setShowingAnswer(false)
  }, [p.questionNumber])

  const keyMap = {
    onSpacePress: "space",
    onJPress: "j",
    onKPress: "k",
    onLPress: "l",
  }
  const handlers = {
    onSpacePress: async () => {
      if (!showingAnswer) setShowingAnswer(true)
    },
    onJPress: async () => {
      if (!showingAnswer) setShowingAnswer(true)
      if (showingAnswer) p.onWrongAnswer()
    },
    onKPress: async () => {
      if (!showingAnswer) setShowingAnswer(true)
      if (showingAnswer) p.onHalfAnswer()
    },
    onLPress: async () => {
      if (!showingAnswer) setShowingAnswer(true)
      if (showingAnswer) p.onCorrectAnswer()
    },
  }

  const classes = useStyles()

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
      <DialogTitle style={{ paddingBottom: 0 }}>
        <FlexVCenter justifyContent="space-between">
          <Typography variant="h6">
            ({p.questionNumber}/{p.totalQuestions}) {p.question.question}
          </Typography>

          <IconButton onClick={p.closeDialog} size="small">
            <Clear />
          </IconButton>
        </FlexVCenter>
      </DialogTitle>
      <DialogContent style={{ height: 300 }}>
        <Typography style={{ marginTop: 8, fontStyle: "italic" }}>
          {p.docTitle}
        </Typography>
        <Box mt={4} />

        {showingAnswer && (
          <Box>
            <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
              {p.question.description}
            </Typography>
            <Box mt={2}>
              <Link
                href="#"
                onClick={(e: any) => {
                  e.preventDefault()
                  openNoteDialog({
                    initialValue: p.question,
                    onSubmit: (value) => {
                      p.onEditQuestion(value)
                      closeDialog()
                    },
                  })
                }}
                variant="body2"
              >
                edit
              </Link>
            </Box>
          </Box>
        )}

        <Box mt={4} />
      </DialogContent>

      <DialogTitle>
        {showingAnswer === false ? (
          <DarkButton onClick={() => setShowingAnswer(true)} fullWidth>
            Show Answer (Space, J, K or L)
          </DarkButton>
        ) : (
          <FlexVCenter mx="auto" justifyContent="space-between">
            <Button onClick={p.onWrongAnswer} className={classes.wrongButton}>
              Wrong (J)
            </Button>
            <DarkButton onClick={p.onHalfAnswer} className={classes.button}>
              Half (K)
            </DarkButton>
            <Button
              onClick={p.onCorrectAnswer}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Correct (L)
            </Button>
          </FlexVCenter>
        )}
      </DialogTitle>
    </GlobalHotKeys>
  )
}

const useStyles = makeStyles((theme) => ({
  wrongButton: {
    width: 125,
    color: "white",
    background: theme.palette.error.main,
  },
  button: {
    width: 125,
  },
}))

export default QuestionFlashcardDialogChild
