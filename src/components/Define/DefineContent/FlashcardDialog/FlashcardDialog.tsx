import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import sample from "lodash/sample";
import React, { useEffect, useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import useDocsStore from "store/zustand/domain/useDocsStore";
import { NoteDto } from "../../../../types/domain/define/NoteDto";
import { shuffleArray } from "../../../../utils/array/shuffleArray";
import DarkButton from "../../../_UI/Buttons/DarkButton/DarkButton";
import FlexHCenter from "../../../_UI/Flexboxes/FlexHCenter";
import Txt from "../../../_UI/Text/Txt";
import MinWeightInput from "./MinWeightInput/MinWeightInput";
import QuestionsQtyInput from "./QuestionsQtyInput/QuestionsQtyInput";
import StartedFlashcardDialogChild from "./StartedFlashcardDialogChild/StartedFlashcardDialogChild";
interface Props {
  open: boolean;
  docId?: number;
  onClose: () => void;
}

const FlashcardDialog = (props: Props) => {
  const docsStore = useDocsStore();

  const [minWeight, setMinWeight] = useState(1);
  const [allQuestions, setAllQuestions] = useState<NoteDto[]>([]);
  const [questionsQty, setQuestionsQty] = useState(0);
  const [testQuestions, setTestQuestions] = useState<NoteDto[]>([]);

  const getDoc = () => docsStore.docs.find((doc) => doc.id === props.docId);

  // reset
  useEffect(() => {
    setMinWeight(1);
    setAllQuestions([]);
    setQuestionsQty(0);
    setTestQuestions([]);
  }, [props.open]);

  useEffect(
    () => {
      const max = docsStore.notes.filter(
        (note) =>
          note.docId === props.docId &&
          note.weight >= minWeight &&
          note.question.length > 0
      );
      setAllQuestions(max);

      setQuestionsQty(max.length);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [minWeight, docsStore.notes]
  );

  const handleClose = () => {
    props.onClose();
  };

  const shuffleQuestionsAndStart = () => {
    if (questionsQty === 0)
      return alert("Please, select a number of flashcards");

    if (allQuestions.length === questionsQty) {
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
    for (let i = 0; i < questionsQty; i++) {
      const randomId = sample(ids) as number;
      ids = ids.filter((id) => id !== randomId);

      playNotes.push(docsStore.notes.find((note) => note.id === randomId));
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
          <DialogTitle style={{ justifyContent: "space-between" }}>
            <Txt variant="h6">{getDoc().title} </Txt>
            <IconButton onClick={handleClose} size="small">
              <Clear />
            </IconButton>
          </DialogTitle>

          <DialogContent style={{ height: 300 }}>
            <FlexHCenter>
              <MinWeightInput onChange={setMinWeight} value={minWeight} />
              <Box mt={2} />

              <QuestionsQtyInput
                maxValue={allQuestions.length}
                onChange={setQuestionsQty}
                value={questionsQty}
              />
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

export default FlashcardDialog;
