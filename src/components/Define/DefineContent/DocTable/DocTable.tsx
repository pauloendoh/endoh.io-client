import { Theme, useMediaQuery, useTheme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Paper, Table, TableContainer, Toolbar } from "@mui/material"
import { useState } from "react"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useAuthStore from "store/zustand/useAuthStore"
import { newNoteDto, NoteDto } from "../../../../types/domain/define/NoteDto"
import myAxios from "../../../../utils/consts/myAxios"
import apiUrls from "../../../../utils/url/urls/apiUrls"
import DarkButton from "../../../_UI/Buttons/DarkButton/DarkButton"
import { TBody, TD, THead, TR } from "../../../_UI/Table/MyTableWrappers"
import AddManyNotesMenuButton from "./AddManyNotesMenuButton/AddManyNotesMenuButton"
import DocTableRow from "./DocTableRow/DocTableRow"

const DocTable = (props: Props) => {
  const docsStore = useDocsStore()
  const { authUser } = useAuthStore()

  const classes = useStyles()

  const addNote = () => {
    setSubmitting(true)
    const newNote = newNoteDto(sortedNotes().length, props.docId, authUser.id)
    myAxios
      .post<NoteDto>(apiUrls.define.note, newNote)
      .then((res) => {
        docsStore.pushOrReplaceNote(res.data)
      })
      .finally(() => setSubmitting(false))
  }

  const sortedNotes = () => {
    const filtered = docsStore.notes.filter(
      (note) => note.docId === props.docId
    )
    const sorted = filtered.sort((a, b) => a.index - b.index)
    return sorted
  }

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  const handleNoteChange = (changed: NoteDto) => {
    clearTimeout(throttle)
    setThrottle(
      setTimeout(() => {
        myAxios.post<NoteDto>(apiUrls.define.note, changed).then((res) => {
          docsStore.pushOrReplaceNote(res.data)
        })
      }, 500)
    )
  }

  const getRowKey = (note: NoteDto) => {
    return `${note.id}-${note.weight}`
  }

  const [submitting, setSubmitting] = useState(false)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <THead>
            <TR>
              {!isSmallScreen && (
                <TD className={classes.th} align="center">
                  #
                </TD>
              )}
              <TD className={classes.th}>Question</TD>
              <TD className={classes.th}>Answer</TD>
              {!isSmallScreen && (
                <TD align="center" className={classes.th}>
                  Weight
                </TD>
              )}
            </TR>
          </THead>

          <TBody>
            {sortedNotes().map((note, index) => (
              <DocTableRow
                index={index}
                key={getRowKey(note)}
                initialValue={note}
                onChange={handleNoteChange}
                isSmallScreen={isSmallScreen}
              />
            ))}
          </TBody>
        </Table>
      </TableContainer>

      <Toolbar style={{ display: "flex", gap: 16 }}>
        <DarkButton onClick={addNote} disabled={submitting}>
          + Add question
        </DarkButton>

        <AddManyNotesMenuButton docId={props.docId} />
      </Toolbar>
    </Paper>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    maxHeight: "calc(100vh - 400px)",
  },
  th: {
    background: "#232323",
  },
  table: {
    minWidth: 240,
    "& .MuiTableCell-root": {
      padding: 8,
      borderBottom: "1px solid rgb(255 255 255 / 0.1)",
    },
  },
}))

interface OwnProps {
  docId: number
}

type Props = OwnProps

export default DocTable
