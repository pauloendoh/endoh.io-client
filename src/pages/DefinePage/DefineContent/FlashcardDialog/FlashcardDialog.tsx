import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import DarkButton from "../../../../components/shared/Buttons/DarkButton";
import FlexHCenter from "../../../../components/shared/Flexboxes/FlexHCenter";
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter";
import Txt from "../../../../components/shared/Text/Txt";
import { NoteDto } from "../../../../dtos/define/NoteDto";
import { ApplicationState } from "../../../../store/store";
import * as utilsActions from "../../../../store/utils/utilsActions";
import { shuffleArray } from "../../../../utils/shuffleArray";
import StartedFlashcardDialogChild from "./StartedFlashcardDialogChild/StartedFlashcardDialogChild";

//  FlashcardTestDialog  ?
const FlashcardDialog = (props: Props) => {
  const classes = useStyles();

  const [minimumQuestionWeight, setMinWeight] = useState(1);
  const [allQuestions, setAllQuestions] = useState<NoteDto[]>([]);
  const [questionsLength, setQuestionsLength] = useState(0);
  const [testQuestions, setTestQuestions] = useState<NoteDto[]>([]);

  const getDoc = () => props.allDocs.find((doc) => doc.id === props.docId);

  // reset
  useEffect(() => {
    setMinWeight(1);
    setAllQuestions([]);
    setQuestionsLength(0);
    setTestQuestions([]);
  }, [props.open]);

  useEffect(
    () => {
      const max = props.allNotes.filter(
        (note) =>
          note.docId === props.docId &&
          note.weight >= minimumQuestionWeight &&
          note.question.length > 0
      );
      setAllQuestions(max);

      setQuestionsLength(max.length);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [minimumQuestionWeight, props.allNotes]
  );

  // PE 1/3 unnecessary?... since it resets on open
  const handleClose = () => {
    setTestQuestions([]);
    props.onClose();
  };

  const shuffleQuestionsAndStart = () => {
    if (questionsLength === 0)
      return alert("Please, select a number of flashcards");

    if (allQuestions.length === questionsLength) {
      const playNotes = shuffleArray(allQuestions);
      setTestQuestions(playNotes);
      return;
    }

    // para cada availableNotes, fazer um peso
    let ids = [];
    for (const note of allQuestions) {
      for (let i = 0; i < note.weight; i++) {
        ids.push(note.id);
      }
    }

    const playNotes: NoteDto[] = [];
    for (let i = 0; i < questionsLength; i++) {
      const randomId = _.sample(ids) as number;
      ids = ids.filter((id) => id !== randomId);

      playNotes.push(props.allNotes.find((note) => note.id === randomId));
    }

    setTestQuestions(playNotes);
  };

  const onSpacePress = () => {
    shuffleQuestionsAndStart();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="flashcard-title-dialog"
    >
      {testQuestions.length > 0 ? (
        <StartedFlashcardDialogChild
          questions={testQuestions}
          doc={getDoc()}
          onFinish={handleClose}
        />
      ) : (
        <GlobalHotKeys
          keyMap={{ onSpacePress: "space" }}
          handlers={{ onSpacePress: onSpacePress }}
        >
          {/* PE 1/3 - I feel this title is too big... but I don't know a good name for it */}
          <DialogTitle>
            <FlexVCenter justifyContent="space-between">
              <Txt variant="h6">{getDoc().title} </Txt>
              <IconButton onClick={handleClose} size="small">
                <Clear />
              </IconButton>
            </FlexVCenter>
          </DialogTitle>

          <DialogContent style={{ height: 300 }}>
            <FlexHCenter>
              {/* PE 1/3 - Divide into <MinQuestionWeightInput/> ? */}
              <Txt variant="h5">
                {/* MyNumberInput ? */}
                <input
                  type="number"
                  value={minimumQuestionWeight}
                  onChange={(e) => setMinWeight(Number(e.target.value))}
                  min={1}
                  className={classes.input}
                />
                <span style={{ marginLeft: 8 }}>min. weight</span>
              </Txt>

              <Box mt={2} />

              {/* PE 1/3 - Divide into <QuestionsLengthInput/> */}
              <Txt variant="h5">
                <input
                  type="number"
                  value={questionsLength}
                  onChange={(e) => setQuestionsLength(Number(e.target.value))}
                  min={1}
                  max={allQuestions.length}
                  className={classes.input}
                />
                <span>/ {allQuestions.length} flashcards</span>
              </Txt>
            </FlexHCenter>

            {/* PE 2/3 */}
            <Box mt={4} />
            <Typography>
              <b>Rules:</b>
              <ul style={{ paddingLeft: 24 }}>
                <li>
                  Wrong answer = 4x weight; Half answer = 2x weight; Correct
                  answer = 1/2 weight;
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
            <DarkButton onClick={shuffleQuestionsAndStart} fullWidth>
              Start! (Space)
            </DarkButton>
          </DialogTitle>
        </GlobalHotKeys>
      )}
    </Dialog>
  );
};

const useStyles = makeStyles(() => ({
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
}));

const mapStateToProps = (state: ApplicationState) => ({
  allDocs: state.define.docs,
  allNotes: state.define.notes,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
});

interface OwnProps {
  open: boolean;
  docId?: number;
  onClose: () => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardDialog);
