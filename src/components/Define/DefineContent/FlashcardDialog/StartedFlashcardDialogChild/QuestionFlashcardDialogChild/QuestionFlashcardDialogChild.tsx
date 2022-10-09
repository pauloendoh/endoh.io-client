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
import { NoteDto } from "../../../../../../types/domain/define/NoteDto"
import DarkButton from "../../../../../_UI/Buttons/DarkButton/DarkButton"
import FlexVCenter from "../../../../../_UI/Flexboxes/FlexVCenter"
import NoteDialog from "../NoteDialog/NoteDialog"

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
  const [openNoteDialog, setOpenNoteDialog] = useState(false)

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
      <DialogTitle>
        <FlexVCenter justifyContent="space-between">
          <Typography>
            ({p.questionNumber}/{p.totalQuestions}) {p.docTitle}
          </Typography>
          <IconButton onClick={p.closeDialog} size="small">
            <Clear />
          </IconButton>
        </FlexVCenter>
      </DialogTitle>
      <DialogContent style={{ height: 300 }}>
        <Typography variant="h4">{p.question.question}</Typography>
        <Box mt={4} />

        {showingAnswer && (
          <Box>
            <Typography
              variant="body1"
              style={{ fontStyle: "italic", whiteSpace: "pre-line" }}
            >
              {p.question.description}
            </Typography>
            <Box mt={2}>
              <Link
                href="#"
                onClick={(e: any) => {
                  e.preventDefault()
                  setOpenNoteDialog(true)
                }}
                variant="body2"
              >
                edit
              </Link>
              <NoteDialog
                initialValue={p.question}
                onClose={() => {
                  setOpenNoteDialog(false)
                }}
                onSubmit={(changed) => {
                  p.onEditQuestion(changed)
                  setOpenNoteDialog(false)
                }}
                open={openNoteDialog}
              />
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
