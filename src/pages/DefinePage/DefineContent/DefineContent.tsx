import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import { Box, Button, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import { ApplicationState } from "../../../store/store"
import TitleMoreIcon from "./TitleMoreIcon/TitleMoreIcon"
import DocTable from "./DocTable/DocTable"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import FlashcardDialog from "./FlashcardDialog/FlashcardDialog"

const DefineContent = (props: Props) => {
  const [flashcardDialog, setFlashcardDialog] = useState(false)

  const getDoc = () => {
    return props.allDocs.find((doc) => doc.id === props.docId)
  }

  return (
    <Box>
      {/* Header */}
      <Flex justifyContent="space-between">
        <Typography variant="h4">{getDoc().title}</Typography>
        <Box>
          <TitleMoreIcon doc={getDoc()} afterDelete={() => {}} />
        </Box>
      </Flex>

      <Box mt={3}>
        <Button
          onClick={() => setFlashcardDialog(true)}
          variant="contained"
          color="primary"
        >
          <FlexVCenter>
            <PlayArrowIcon fontSize="small" />
            <Box ml={1}>Test Yourself</Box>
          </FlexVCenter>
        </Button>

        {flashcardDialog && (
          <FlashcardDialog
            docId={props.docId}
            open={flashcardDialog}
            onClose={() => setFlashcardDialog(false)}
          />
        )}
      </Box>

      <Box mt={3}>
        <DocTable docId={props.docId} />
      </Box>
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  allDocs: state.define.docs,
  allNotes: state.define.notes,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  docId: number
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(DefineContent)
