import ClearIcon from "@material-ui/icons/Clear"

import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import DarkButton from "../../../../../../components/shared/Buttons/DarkButton"
import FlexHCenter from "../../../../../../components/shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../../../../components/shared/Flexboxes/FlexVCenter"
import API from "../../../../../../consts/API"
import MY_AXIOS from "../../../../../../consts/MY_AXIOS"
import { DocDto } from "../../../../../../dtos/define/DocDto"
import { NoteDto } from "../../../../../../dtos/define/NoteDto"
import { setNotes } from "../../../../../../store/define/defineActions"
import { ApplicationState } from "../../../../../../store/store"
import { setSuccessMessage } from "../../../../../../store/utils/utilsActions"
import { GlobalHotKeys } from "react-hotkeys"

const FinishedContentDialog = (props: Props) => {
  const getScore = () => {
    return ((props.halves * 0.5 + props.corrects) * 100) / props.results.length
  }

  const saveResults = () => {
    MY_AXIOS.post<NoteDto[]>(API.define.postManyNotes, props.results).then(
      (res) => {
        props.setNotes(res.data)
        props.setSuccessMessage("Saved!")
        props.onFinish()
      }
    )
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
        <FlexVCenter justifyContent="space-between">
          <Typography variant="h6">{props.doc.title} </Typography>
          <IconButton onClick={props.onFinish} size="small">
            <ClearIcon />
          </IconButton>
        </FlexVCenter>
      </DialogTitle>
      <DialogContent style={{ height: 300 }}>
        <FlexVCenter
          mt={3}
          justifyContent="space-between"
          width={350}
          mx="auto"
        >
          <FlexHCenter>
            <Typography variant="h6" color="error">
              {props.wrongs} Wrong
            </Typography>
          </FlexHCenter>
          <FlexHCenter>
            <Typography variant="h6">{props.halves} Half</Typography>
          </FlexHCenter>
          <FlexHCenter>
            <Typography variant="h6" color="primary">
              {props.corrects} Correct
            </Typography>
          </FlexHCenter>
        </FlexVCenter>

        <FlexHCenter mt={4}>
          <Typography variant="h3">Score</Typography>
          <Typography variant="h3">{Math.round(getScore())}%</Typography>
        </FlexHCenter>
      </DialogContent>

      <DialogTitle>
        <DarkButton fullWidth onClick={saveResults}>
          Save and Apply Changes (Space)
        </DarkButton>
      </DialogTitle>
    </GlobalHotKeys>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setNotes: (notes: NoteDto[]) => dispatch(setNotes(notes)),
  setSuccessMessage: (message: string) => dispatch(setSuccessMessage(message)),
})

interface OwnProps {
  doc: DocDto
  wrongs: number
  halves: number
  corrects: number
  results: NoteDto[]
  onFinish: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishedContentDialog)
