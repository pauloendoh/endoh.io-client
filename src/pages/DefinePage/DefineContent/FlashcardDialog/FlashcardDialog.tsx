import ClearIcon from "@material-ui/icons/Clear"
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { GlobalHotKeys, HotKeys } from "react-hotkeys"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import DarkButton from "../../../../components/shared/Buttons/DarkButton"
import FlexHCenter from "../../../../components/shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter"
import { NoteDto } from "../../../../dtos/define/NoteDto"
import { ApplicationState } from "../../../../store/store"
import * as utilsActions from "../../../../store/utils/utilsActions"
import { shuffleArray } from "../../../../utils/shuffleArray"
import QuestionDialogContent from "./QuestionDialogContent/QuestionDialogContent"

const FlashcardDialog = (props: Props) => {
  const classes = useStyles()
  const getDoc = () => props.allDocs.find((doc) => doc.id === props.docId)

  const [minWeight, setMinWeight] = useState(1)
  const [availableNotes, setAvailableNotes] = useState<NoteDto[]>([])
  const [playNotesLength, setPlayNotesLength] = useState(0)

  const [playNotes, setPlayNotes] = useState<NoteDto[]>([])

  const [results, setResults] = useState<NoteDto[]>([])

  // reset
  useEffect(() => {
    setMinWeight(1)
    setAvailableNotes([])
    setPlayNotesLength(0)
    setPlayNotes([])
    setResults([])
  }, [props.open])

  useEffect(
    () => {
      const max = props.allNotes.filter(
        (note) =>
          note.docId === props.docId &&
          note.weight >= minWeight &&
          note.question.length > 0
      )
      setAvailableNotes(max)

      setPlayNotesLength(max.length)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [minWeight, props.allNotes]
  )

  const handleClose = () => {
    setPlayNotes([])
    props.onClose()
  }

  const shuffleAndStart = () => {
    if (playNotesLength === 0)
      return alert("Please, select a number of flashcards")

    if (availableNotes.length === playNotesLength) {
      const playNotes = shuffleArray(availableNotes)
      setPlayNotes(playNotes)
      console.log(playNotes)
      return
    }

    // para cada availableNotes, fazer um peso
    let ids = []
    for (const note of availableNotes) {
      for (let i = 0; i < note.weight; i++) {
        ids.push(note.id)
      }
    }

    const playNotes: NoteDto[] = []
    for (let i = 0; i < playNotesLength; i++) {
      const randomId = _.sample(ids) as number
      ids = ids.filter((id) => id !== randomId)

      playNotes.push(props.allNotes.find((note) => note.id === randomId))
    }

    setPlayNotes(playNotes)

    console.log(playNotes)
  }

  const onSpacePress = () => {
    shuffleAndStart()
  }

  const keyMap = { onSpacePress: "space" }

  const handlers = {
    onSpacePress: onSpacePress,
  }

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="flashcard-title-dialog"
    >
      {playNotes.length === 0 ? (
        <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
          <DialogTitle>
            <FlexVCenter justifyContent="space-between">
              <Typography variant="h6">{getDoc().title} </Typography>
              <IconButton onClick={handleClose} size="small">
                <ClearIcon />
              </IconButton>
            </FlexVCenter>
          </DialogTitle>
          <DialogContent style={{ height: 300 }}>
            <FlexHCenter>
              <Typography variant="h5">
                {" "}
                <input
                  type="number"
                  value={minWeight}
                  onChange={(e) => setMinWeight(Number(e.target.value))}
                  min={1}
                  className={classes.input}
                />
                <span style={{ marginLeft: 8 }}>min. weight</span>
              </Typography>

              <Box mt={2} />
              <Typography variant="h5">
                <input
                  type="number"
                  value={playNotesLength}
                  onChange={(e) => setPlayNotesLength(Number(e.target.value))}
                  min={1}
                  max={availableNotes.length}
                  className={classes.input}
                />
                <span>/ {availableNotes.length} flashcards</span>
              </Typography>
            </FlexHCenter>

            <Box mt={4} />
            <Typography>
              <b>Rules:</b>
              <ul style={{ paddingLeft: 24 }}>
                <li>
                  If you get the question wrong, the flashcard’s weight is
                  doubled. If you get it correct, its weight is halved;
                </li>
                <li>
                  By increasing the flashcard’s weight, it proportionally
                  increases the chances of appearing in the next try;
                </li>
                <li>You can set up a minimum flashcard weight;</li>
              </ul>
            </Typography>
          </DialogContent>
          <DialogTitle>
            <DarkButton onClick={shuffleAndStart} fullWidth>
              Start! (Space)
            </DarkButton>
          </DialogTitle>
        </GlobalHotKeys>
      ) : (
        <QuestionDialogContent
          notes={playNotes}
          doc={getDoc()}
          onFinish={handleClose}
        />
      )}
    </Dialog>
  )
}

const useStyles = makeStyles((theme) => ({
  input: {
    width: 50,
    textAlign: "center",
    fontFamily: "inherit",
    fontSize: "inherit",
    background: "none",
    border: "none",
    borderBottom: "1px solid white",
    color: "inherit",
  },
}))

const mapStateToProps = (state: ApplicationState) => ({
  allDocs: state.define.docs,
  allNotes: state.define.notes,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

interface OwnProps {
  open: boolean
  docId?: number
  onClose: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardDialog)
