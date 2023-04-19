import { Theme, useMediaQuery } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Clear } from "@mui/icons-material"
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import { useEffect, useState } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { MdArrowBack, MdArrowForward } from "react-icons/md"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import { NoteDto } from "../../../../../../types/domain/questions/NoteDto"
import DarkButton from "../../../../../_UI/Buttons/DarkButton/DarkButton"
import FlexVCenter from "../../../../../_UI/Flexboxes/FlexVCenter"

// PE 1/3 - rename to QuestionFlashcardDialogContent
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
  goBack: () => void
  goNext: () => void
}) => {
  // PE 1/3 - isShowingAnswer
  const [showingAnswer, setShowingAnswer] = useState(false)

  const [openNoteDialog, closeDialog] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])

  useEffect(() => {
    setShowingAnswer(false)
  }, [props.questionNumber])

  // PE 1/3 - use hook
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

  // PE 1/3 stop using this '-'
  const classes = useStyles()

  const isSmallScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  )

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
      <DialogTitle style={{ paddingBottom: 0 }}>
        <Flex justifyContent="space-between">
          <Typography variant="h6">
            ({props.questionNumber}/{props.totalQuestions}){" "}
            {props.question.question}
          </Typography>

          <Box>
            <IconButton onClick={props.closeDialog} size="small">
              <Clear />
            </IconButton>
          </Box>
        </Flex>
      </DialogTitle>
      <DialogContent style={{ height: 300 }}>
        <Typography style={{ marginTop: 8, fontStyle: "italic" }}>
          {props.docTitle}
        </Typography>
        <Box mt={4} />

        {showingAnswer && (
          <Box>
            <Typography
              variant="body1"
              style={{
                whiteSpace: "pre-line",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {props.question.description}
            </Typography>
            <FlexVCenter mt={2} gap={3}>
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
                    customOnDelete() {
                      props.onEditQuestion({
                        ...props.question,
                        description: "",
                        question: "",
                        weight: 1,
                        testedTimes: 0,
                      })
                      closeDialog()
                    },
                  })
                }}
                variant="body2"
              >
                Edit
              </Link>

              <Link
                href="#"
                onClick={(e: any) => {
                  e.preventDefault()
                  props.onEditQuestion({
                    ...props.question,
                    toRefine: true,
                  })
                }}
                variant="body2"
              >
                To refine
              </Link>
            </FlexVCenter>
          </Box>
        )}

        <Box mt={4} />
      </DialogContent>

      <DialogTitle>
        {showingAnswer === false ? (
          <FlexVCenter style={{ gap: 8 }}>
            <IconButton
              style={{ visibility: props.isFirst ? "hidden" : undefined }}
              onClick={() => props.goBack()}
            >
              <MdArrowBack />
            </IconButton>
            <DarkButton onClick={() => setShowingAnswer(true)} fullWidth>
              Show Answer {!isSmallScreen && "(Space, J, K or L)"}
            </DarkButton>
            <IconButton onClick={() => props.goNext()}>
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
              onClick={() => props.goBack()}
            >
              <MdArrowBack />
            </IconButton>

            <Button
              onClick={props.onWrongAnswer}
              className={classes.wrongButton}
              fullWidth
            >
              Wrong {!isSmallScreen && "(J)"}
            </Button>
            <DarkButton onClick={props.onHalfAnswer} fullWidth>
              Half {!isSmallScreen && "(K)"}
            </DarkButton>
            <Button
              onClick={props.onCorrectAnswer}
              variant="contained"
              color="primary"
              fullWidth
            >
              Correct {!isSmallScreen && "(L)"}
            </Button>

            <IconButton onClick={() => props.goNext()}>
              <MdArrowForward />
            </IconButton>
          </FlexVCenter>
        )}
      </DialogTitle>
    </GlobalHotKeys>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  wrongButton: {
    color: "white",
    background: theme.palette.error.main,
  },
}))

export default QuestionFlashcardDialogChild
