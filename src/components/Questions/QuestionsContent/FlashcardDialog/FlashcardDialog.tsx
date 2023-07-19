import { Clear } from "@mui/icons-material"
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Theme,
  Typography,
} from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import Flex from "components/_UI/Flexboxes/Flex"
import useConfirmTabClose from "hooks/utils/useConfirmTabClose"
import sample from "lodash/sample"
import { useEffect, useState } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import useSidebarStore from "store/zustand/useSidebarStore"
import { NoteDto } from "../../../../types/domain/questions/NoteDto"
import { shuffleArray } from "../../../../utils/array/shuffleArray"
import DarkButton from "../../../_UI/Buttons/DarkButton/DarkButton"
import FlexHCenter from "../../../_UI/Flexboxes/FlexHCenter"
import Txt from "../../../_UI/Text/Txt"
import MinWeightInput from "./MinWeightInput/MinWeightInput"
import QuestionsQtyInput from "./QuestionsQtyInput/QuestionsQtyInput"
import StartedFlashcardDialogChild from "./StartedFlashcardDialogChild/StartedFlashcardDialogChild"

interface Props {
  open: boolean
  onClose: () => void
  availableNotes: NoteDto[]
}

const FlashcardDialog = (props: Props) => {
  const [minWeight, setMinWeight] = useState<number | null>(1)
  const [maxTestedTimes, setMaxTestedTimes] = useState<number | null>(null)
  const [allQuestions, setAllQuestions] = useState<NoteDto[]>([])
  const [questionsQty, setQuestionsQty] = useState(0)
  const [testQuestions, setTestQuestions] = useState<NoteDto[]>([])

  const [isIncludingQuestionsToRefine, setIsIncludingQuestionsToRefine] =
    useState(false)

  const [closeSidebar, openSidebar] = useSidebarStore((s) => [
    s.closeSidebar,
    s.openSidebar,
  ])
  const isSmallScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  )

  // reset
  useEffect(() => {
    setMinWeight(1)
    setAllQuestions([])
    setQuestionsQty(0)
    setTestQuestions([])

    if (props.open && isSmallScreen) closeSidebar()
    if (!props.open && isSmallScreen) openSidebar()
  }, [props.open])

  useEffect(
    () => {
      let filteredQuestions = props.availableNotes.filter((note) => {
        return (
          note.weight >= (minWeight || 0) &&
          (maxTestedTimes === null || note.testedTimes <= maxTestedTimes) &&
          note.question.trim().length > 0 &&
          note.description.trim().length > 0
        )
      })

      if (!isIncludingQuestionsToRefine)
        filteredQuestions = filteredQuestions.filter((q) => !q.toRefine)

      setAllQuestions(filteredQuestions)

      if (filteredQuestions.length >= 10) {
        setQuestionsQty(10)
        return
      }
      setQuestionsQty(filteredQuestions.length)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      minWeight,
      props.open,
      props.availableNotes,
      isIncludingQuestionsToRefine,
      maxTestedTimes,
    ]
  )

  const openConfirmDialog = useConfirmDialogStore((s) => s.openConfirmDialog)
  const handleClose = (options?: { askForConfirmation?: boolean }) => {
    if (!options?.askForConfirmation || testQuestions.length === 0) {
      props.onClose()
      return
    }

    openConfirmDialog({
      title: "Close dialog?",
      onConfirm: props.onClose,
    })
  }

  useConfirmTabClose(testQuestions.length > 0)

  const shuffleQuestionsAndStart = () => {
    if (questionsQty === 0)
      return alert("Please, select a number of flashcards")

    if (allQuestions.length === questionsQty) {
      const playNotes = shuffleArray(allQuestions)
      setTestQuestions(playNotes)
      return
    }

    // para cada availableNotes, fazer um peso
    let ids = []
    for (const note of allQuestions) {
      for (let i = 0; i < note.weight; i++) {
        ids.push(note.id)
      }
    }

    const playNotes: NoteDto[] = []
    for (let i = 0; i < questionsQty; i++) {
      const randomId = sample(ids) as number
      ids = ids.filter((id) => id !== randomId)

      const foundNote = props.availableNotes.find(
        (note) => note.id === randomId
      )
      if (foundNote) {
        playNotes.push(foundNote)
      }
    }

    setTestQuestions(playNotes)
  }

  const onSpacePress = () => {
    shuffleQuestionsAndStart()
  }

  return (
    <Dialog
      onClose={() => handleClose()}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="flashcard-title-dialog"
    >
      {testQuestions.length > 0 ? (
        <StartedFlashcardDialogChild
          questions={testQuestions}
          onFinish={() => handleClose({ askForConfirmation: false })}
        />
      ) : (
        <GlobalHotKeys
          keyMap={{ onSpacePress: "space" }}
          handlers={{ onSpacePress: onSpacePress }}
        >
          <Flex justifyContent="space-between" style={{ padding: "16px 24px" }}>
            <Txt variant="h6">Test yourself! </Txt>
            <IconButton onClick={() => handleClose()} size="small">
              <Clear />
            </IconButton>
          </Flex>

          <DialogContent style={{ height: 340 }}>
            <FlexHCenter gap={2}>
              <QuestionsQtyInput
                maxValue={allQuestions.length}
                onChange={setQuestionsQty}
                value={questionsQty}
              />

              <MinWeightInput
                onChange={setMinWeight}
                value={minWeight}
                min={1}
              />
              <MinWeightInput
                onChange={setMaxTestedTimes}
                value={maxTestedTimes}
                allowNull
                label="max tested times"
                min={0}
              />
            </FlexHCenter>

            <Box mt={4} />
            <FormControlLabel
              label={"Include questions to refine"}
              control={
                <Checkbox
                  color="primary"
                  checked={isIncludingQuestionsToRefine}
                  onChange={(e) =>
                    setIsIncludingQuestionsToRefine(e.currentTarget.checked)
                  }
                />
              }
            />
            {/* PE 2/3 */}
            <Box mt={2} />
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
  )
}

export default FlashcardDialog
