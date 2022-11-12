import { Clear } from "@mui/icons-material"
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material"
import { useAxios } from "hooks/utils/useAxios"
import { useMemo, useState } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { NoteDto } from "../../../../../../types/domain/define/NoteDto"
import apiUrls from "../../../../../../utils/url/urls/apiUrls"
import DarkButton from "../../../../../_UI/Buttons/DarkButton/DarkButton"
import S from "./FinishedFlashcardDialogChild.styles"

interface Props {
  wrongs: number
  halves: number
  corrects: number
  results: NoteDto[]
  onFinish: () => void
}

const FinishedFlashcardDialogChild = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const docsStore = useDocsStore()

  const myAxios = useAxios()

  const finalScore = useMemo(() => {
    return ((props.halves * 0.5 + props.corrects) * 100) / props.results.length
  }, [props.halves, props.corrects, props.results])

  const { setSuccessMessage } = useSnackbarStore()

  const saveResults = () => {
    setIsSubmitting(true)

    myAxios
      .put<NoteDto[]>(apiUrls.define.updateManyNotes, props.results)
      .then((res) => {
        docsStore.setNotes(res.data)
        setSuccessMessage("Saved!")
        props.onFinish()
      })
      .finally(() => setIsSubmitting(false))
  }

  const keyMap = {
    onSpacePress: "space",
  }
  const handlers = {
    onSpacePress: async () => {
      saveResults()
    },
  }

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
      <DialogTitle>
        <S.DialogTitleContent justifyContent="space-between">
          <Typography variant="h6">Finished! </Typography>
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
          <Typography variant="h3">
            {isNaN(finalScore) ? "-" : `${Math.round(finalScore)}%`}
          </Typography>
        </S.ScorePercentageWrapper>
      </DialogContent>

      <DialogTitle>
        <DarkButton disabled={isSubmitting} fullWidth onClick={saveResults}>
          Save and Apply Changes (Space)
        </DarkButton>
      </DialogTitle>
    </GlobalHotKeys>
  )
}

export default FinishedFlashcardDialogChild
