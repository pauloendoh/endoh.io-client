import { Box } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { Dispatch } from "redux"
import Flex from "../../components/shared/Flexboxes/Flex"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import { DocDto } from "../../dtos/define/DocDto"
import { NoteDto } from "../../dtos/define/NoteDto"
import { setDocs, setNotes } from "../../store/define/defineActions"
import { ApplicationState } from "../../store/store"
import LoadingPage from "../index/LoadingPage"
import DefineContent from "./DefineContent/DefineContent"
import DefineSidebar from "./DefineSidebar/DefineSidebar"

// PE 3/3
const DefinePage = (props: Props) => {
  const { docId } = useParams<{ docId: string }>()

  const [selectedDocId, setSelectedDocId] = useState<number>(null)

  useEffect(
    () => {
      MY_AXIOS.get<DocDto[]>(API.define.doc).then((res) => {
        props.setDocs(res.data)
      })

      MY_AXIOS.get<NoteDto[]>(API.define.note).then((res) => {
        props.setNotes(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (docId) {
      setSelectedDocId(Number(docId))
    } else {
      setSelectedDocId(null)
    }
  }, [docId])

  return (
    <Box p={3}>
      <Flex height="100%">
        <DefineSidebar selectedDocId={selectedDocId} />
        <Box pt={1} px={4} flexGrow={1}>
          {props.hasFirstLoaded ? (
            <React.Fragment>
              {selectedDocId && <DefineContent docId={selectedDocId} />}
            </React.Fragment>
          ) : (
            <LoadingPage />
          )}
        </Box>
      </Flex>
    </Box>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  hasFirstLoaded: state.define.hasFirstLoaded,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDocs: (docs: DocDto[]) => dispatch(setDocs(docs)),
  setNotes: (notes: NoteDto[]) => dispatch(setNotes(notes)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DefinePage)
