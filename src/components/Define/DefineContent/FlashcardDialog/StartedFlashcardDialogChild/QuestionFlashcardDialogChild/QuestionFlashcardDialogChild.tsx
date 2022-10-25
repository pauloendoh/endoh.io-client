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
import { MdArrowBack, MdArrowForward } from "react-icons/md"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import { NoteDto } from "../../../../../../types/domain/define/NoteDto"
import DarkButton from "../../../../../_UI/Buttons/DarkButton/DarkButton"
import FlexVCenter from "../../../../../_UI/Flexboxes/FlexVCenter"

// PE 2/3
const QuestionFlashcardDialogChild = (props: {
  question: NoteDto
  questionNumber: number
  totalQuestions: number
  docTitle: string
  closeDialog: () => void
  onEditQuestion: (newQuestion: NoteDto) => void
  onWrongAnswer: () => void
  onHalfAnswer: () => void
  onCorrectAnswer: () => void
  isFirst: boolean
  isLast: boolean
  goBack: () => void
  goNext: () => void
}) => {
  const [showingAnswer, setShowingAnswer] = useState(false)

  const [openNoteDialog, closeDialog] = useNoteDialogStore((s) => [
    s.onOpen,
    s.onClose,
  ])

  useEffect(() => {
    setShowingAnswer(false)
  }, [props.questionNumber])

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
      if (showingAnswer) props.onWrongAnswer()
    },
    onKPress: async () => {
      if (!showingAnswer) setShowingAnswer(true)
      if (showingAnswer) props.onHalfAnswer()
    },
    onLPress: async () => {
      if (!showingAnswer) setShowingAnswer(true)
      if (showingAnswer) props.onCorrectAnswer()
    },
  }

  const classes = useStyles()

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
      <DialogTitle style={{ paddingBottom: 0 }}>
        <FlexVCenter justifyContent="space-between">
          <Typography variant="h6">
            ({props.questionNumber}/{props.totalQuestions}){" "}
            {props.question.question}
          </Typography>

          <IconButton onClick={props.closeDialog} size="small">
            <Clear />
          </IconButton>
        </FlexVCenter>
      </DialogTitle>
      <DialogContent style={{ height: 300 }}>
        <Typography style={{ marginTop: 8, fontStyle: "italic" }}>
          {props.docTitle}
        </Typography>
        <Box mt={4} />

        {showingAnswer && (
          <Box>
            <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
              {props.question.description}
            </Typography>
            <Box mt={2}>
              <Link
                href="#"
                onClick={(e: any) => {
                  e.preventDefault()
                  openNoteDialog({
                    initialValue: props.question,
                    onSubmit: (value) => {
                      props.onEditQuestion(value)
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
          <FlexVCenter style={{ gap: 8 }}>
            <IconButton
              style={{ visibility: props.isFirst ? "hidden" : undefined }}
              onClick={props.goBack}
            >
              <MdArrowBack />
            </IconButton>
            <DarkButton onClick={() => setShowingAnswer(true)} fullWidth>
              Show Answer (Space, J, K or L)
            </DarkButton>
            <IconButton
              style={{ visibility: props.isLast ? "hidden" : undefined }}
              onClick={props.goNext}
            >
              <MdArrowForward />
            </IconButton>
          </FlexVCenter>
        ) : (
          <FlexVCenter
            mx="auto"
            justifyContent="space-between"
            style={{ gap: 8 }}
          >
            <IconButton
              style={{ visibility: props.isFirst ? "hidden" : undefined }}
              onClick={props.goBack}
            >
              <MdArrowBack />
            </IconButton>

            <Button
              onClick={props.onWrongAnswer}
              className={classes.wrongButton}
              fullWidth
            >
              Wrong (J)
            </Button>
            <DarkButton onClick={props.onHalfAnswer} fullWidth>
              Half (K)
            </DarkButton>
            <Button
              onClick={props.onCorrectAnswer}
              variant="contained"
              color="primary"
              fullWidth
            >
              Correct (L)
            </Button>

            <IconButton
              style={{ visibility: props.isLast ? "hidden" : undefined }}
              onClick={props.goNext}
            >
              <MdArrowForward />
            </IconButton>
          </FlexVCenter>
        )}
      </DialogTitle>
    </GlobalHotKeys>
  )
}

const useStyles = makeStyles((theme) => ({
  wrongButton: {
    color: "white",
    background: theme.palette.error.main,
  },
}))

export default QuestionFlashcardDialogChild
