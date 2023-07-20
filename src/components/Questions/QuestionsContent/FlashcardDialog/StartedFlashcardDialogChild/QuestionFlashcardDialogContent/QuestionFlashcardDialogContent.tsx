import { Theme, useMediaQuery } from "@mui/material"

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
import { useMuiTheme } from "hooks/utils/useMuiTheme"
import { useEffect, useState } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { MdArrowBack, MdArrowForward } from "react-icons/md"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import { NoteDto } from "../../../../../../types/domain/questions/NoteDto"
import DarkButton from "../../../../../_UI/Buttons/DarkButton/DarkButton"
import FlexVCenter from "../../../../../_UI/Flexboxes/FlexVCenter"

const QuestionFlashcardDialogContent = (props: {
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
  const [isShowingAnswer, setIsShowingAnswer] = useState(false)

  const [openNoteDialog, closeDialog] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])

  useEffect(() => {
    setIsShowingAnswer(false)
  }, [props.questionNumber])

  const keyMap = {
    onSpacePress: "space",
    onJPress: "j",
    onKPress: "k",
    onLPress: "l",
  }
  const handlers = {
    onSpacePress: async () => {
      if (!isShowingAnswer) setIsShowingAnswer(true)
    },
    onJPress: async () => {
      if (!isShowingAnswer) setIsShowingAnswer(true)
      if (isShowingAnswer) props.onWrongAnswer()
    },
    onKPress: async () => {
      if (!isShowingAnswer) setIsShowingAnswer(true)
      if (isShowingAnswer) props.onHalfAnswer()
    },
    onLPress: async () => {
      if (!isShowingAnswer) setIsShowingAnswer(true)
      if (isShowingAnswer) props.onCorrectAnswer()
    },
  }

  const isSmallScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  )

  const theme = useMuiTheme()

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

        {isShowingAnswer && (
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
        {isShowingAnswer === false ? (
          <FlexVCenter style={{ gap: 8 }}>
            <IconButton
              style={{ visibility: props.isFirst ? "hidden" : undefined }}
              onClick={() => props.goBack()}
            >
              <MdArrowBack />
            </IconButton>
            <DarkButton onClick={() => setIsShowingAnswer(true)} fullWidth>
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
              sx={{
                color: "white",
                background: theme.palette.error.main,
              }}
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

export default QuestionFlashcardDialogContent
