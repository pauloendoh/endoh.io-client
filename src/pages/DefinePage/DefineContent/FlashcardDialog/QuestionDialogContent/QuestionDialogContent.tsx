import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear"
import React, { useState } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import DarkButton from "../../../../../components/shared/Buttons/DarkButton"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import { DocDto } from "../../../../../dtos/define/DocDto"
import { NoteDto } from "../../../../../dtos/define/NoteDto"
import { ApplicationState } from "../../../../../store/store"
import FinishedContentDialog from "./FinishedContentDialog/FinishedContentDialog"

const QuestionDialogContent = (props: Props) => {
  const classes = useStyles()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showingAnswer, setShowingAnswer] = useState(false)

  const [wrongs, setWrongs] = useState(0)
  const [halves, setHalves] = useState(0)
  const [corrects, setCorrects] = useState(0)

  const [results, setResults] = useState<NoteDto[]>([])

  const handleWrong = () => {
    setWrongs(wrongs + 1)
    nextQuestion()

    const currentNote = props.notes[currentIndex]
    setResults([...results, { ...currentNote, weight: currentNote.weight * 2 }])
  }

  const handleHalf = () => {
    setHalves(halves + 1)
    nextQuestion()

    setResults([...results, props.notes[currentIndex]])
  }

  const handleCorrect = () => {
    setCorrects(corrects + 1)
    nextQuestion()

    const currentNote = props.notes[currentIndex]
    if (currentNote.weight === 1) {
      setResults([...results, currentNote])
      return
    }
    setResults([...results, { ...currentNote, weight: currentNote.weight / 2 }])
  }

  const nextQuestion = () => {
    setShowingAnswer(false)
    if (currentIndex === props.notes.length - 1) {
      return
    } else setCurrentIndex(currentIndex + 1)
  }

  const finished = () => results.length === props.notes.length

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
      if (showingAnswer) handleWrong()
    },
    onKPress: async () => {
      if (!showingAnswer) setShowingAnswer(true)
      if (showingAnswer) handleHalf()
    },
    onLPress: async () => {
      if (!showingAnswer) setShowingAnswer(true)
      if (showingAnswer) handleCorrect()
    },
  }

  return (
    <React.Fragment>
      {finished() ? (
        <FinishedContentDialog
          doc={props.doc}
          wrongs={wrongs}
          halves={halves}
          corrects={corrects}
          results={results}
          onFinish={props.onFinish}
        />
      ) : (
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
          <DialogTitle>
            <FlexVCenter justifyContent="space-between">
              <Typography>
                ({currentIndex + 1}/{props.notes.length}) {props.doc.title}
              </Typography>
              <IconButton onClick={props.onFinish} size="small">
                <ClearIcon />
              </IconButton>
            </FlexVCenter>
          </DialogTitle>
          <DialogContent style={{ height: 300 }}>
            <Typography variant="h4">
              {props.notes[currentIndex].question}
            </Typography>
            <Box mt={4} />

            {showingAnswer && (
              <Typography
                variant="body1"
                style={{ fontStyle: "italic", whiteSpace: "pre-line" }}
              >
                {props.notes[currentIndex].description}
              </Typography>
            )}

            <Box mt={4} />
          </DialogContent>

          <DialogTitle>
            {showingAnswer === false ? (
              <DarkButton onClick={() => setShowingAnswer(true)} fullWidth>
                Show Answer (Space)
              </DarkButton>
            ) : (
              <FlexVCenter mx="auto" justifyContent="space-between">
                <Button onClick={handleWrong} className={classes.wrongButton}>
                  Wrong (J)
                </Button>
                <DarkButton
                  onClick={handleHalf}
                  variant="contained"
                  className={classes.button}
                >
                  Half (K)
                </DarkButton>
                <Button
                  onClick={handleCorrect}
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
      )}
    </React.Fragment>
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

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  doc: DocDto
  notes: NoteDto[]
  onFinish: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDialogContent)
