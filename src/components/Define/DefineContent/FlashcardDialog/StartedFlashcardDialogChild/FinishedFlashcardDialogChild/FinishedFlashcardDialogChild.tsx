import {
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import React, { useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import useDocsStore from "store/zustand/domain/useDocsStore";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import { DocDto } from "../../../../../../types/domain/define/DocDto";
import { NoteDto } from "../../../../../../types/domain/define/NoteDto";
import apiUrls from "../../../../../../utils/consts/apiUrls";
import myAxios from "../../../../../../utils/consts/myAxios";
import DarkButton from "../../../../../_UI/Buttons/DarkButton";
import S from "./FinishedFlashcardDialogChild.styles";

interface Props {
  doc: DocDto;
  wrongs: number;
  halves: number;
  corrects: number;
  results: NoteDto[];
  onFinish: () => void;
}

const FinishedFlashcardDialogChild = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const docsStore = useDocsStore();

  const getScore = () => {
    return ((props.halves * 0.5 + props.corrects) * 100) / props.results.length;
  };

  const { setSuccessMessage } = useSnackbarStore();

  const saveResults = () => {
    setIsSubmitting(true);

    myAxios
      .post<NoteDto[]>(apiUrls.define.postManyNotes, props.results)
      .then((res) => {
        docsStore.setNotes(res.data);
        setSuccessMessage("Saved!");
        props.onFinish();
      })
      .finally(() => setIsSubmitting(false));
  };

  const keyMap = {
    onSpacePress: "space",
  };
  const handlers = {
    onSpacePress: async () => {
      saveResults();
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
      <DialogTitle>
        <S.DialogTitleContent justifyContent="space-between">
          <Typography variant="h6">{props.doc.title} </Typography>
          <IconButton onClick={props.onFinish} size="small">
            <Clear />
          </IconButton>
        </S.DialogTitleContent>
      </DialogTitle>

      <DialogContent style={{ height: 300 }}>
        <S.ResultsCountWrapper>
          <Typography variant="h6" color="error" align="center">
            {props.wrongs} Wrong
          </Typography>
          <Typography variant="h6" align="center">
            {props.halves} Half
          </Typography>
          <Typography variant="h6" color="primary" align="center">
            {props.corrects} Correct
          </Typography>
        </S.ResultsCountWrapper>

        <S.ScorePercentageWrapper>
          <Typography variant="h3">Score</Typography>
          <Typography variant="h3">{Math.round(getScore())}%</Typography>
        </S.ScorePercentageWrapper>
      </DialogContent>

      <DialogTitle>
        <DarkButton disabled={isSubmitting} fullWidth onClick={saveResults}>
          Save and Apply Changes (Space)
        </DarkButton>
      </DialogTitle>
    </GlobalHotKeys>
  );
};

export default FinishedFlashcardDialogChild;
