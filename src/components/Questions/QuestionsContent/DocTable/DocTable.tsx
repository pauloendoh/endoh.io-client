import { Theme, Typography, useMediaQuery, useTheme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { format } from "timeago.js"

import { Paper, Table, TableContainer, Toolbar } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { useAxios } from "hooks/utils/useAxios"
import { useMemo, useState } from "react"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useAuthStore from "store/zustand/useAuthStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import {
  buildNoteDto,
  NoteDto,
} from "../../../../types/domain/questions/NoteDto"
import DarkButton from "../../../_UI/Buttons/DarkButton/DarkButton"
import { TBody, TD, THead, TR } from "../../../_UI/Table/MyTableWrappers"
import AddManyNotesMenuButton from "./AddManyNotesMenuButton/AddManyNotesMenuButton"
import DocTableRow from "./DocTableRow/DocTableRow"

const DocTable = (props: Props) => {
  const docsStore = useDocsStore()
  const { authUser } = useAuthStore()

  const myAxios = useAxios()

  const classes = useStyles()

  const [openNoteDialog, onClose] = useNoteDialogStore((s) => [
    s.openNoteDialog,
    s.onClose,
  ])

  const sortedNotes = () => {
    const filtered = docsStore.notes.filter(
      (note) => note.docId === props.docId
    )
    const sorted = filtered.sort((a, b) => a.index - b.index)
    return sorted
  }

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  const axios = useAxios()

  const [isSaving, setIsSaving] = useState(false)

  const handleNoteChange = (changed: NoteDto) => {
    setIsSaving(true)
    clearTimeout(throttle)
    setThrottle(
      setTimeout(() => {
        axios
          .post<NoteDto>(urls.api.define.note, changed)
          .then((res) => {
            docsStore.pushOrReplaceNote(res.data)
          })
          .finally(() => setIsSaving(false))
      }, 500)
    )
  }

  const getRowKey = (note: NoteDto) => {
    return `${note.id}-${note.weight}`
  }

  const setSuccessMessage = useSnackbarStore((s) => s.setSuccessMessage)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const footerLabel = useMemo(() => {
    if (isSaving) return "Saving..."
    if (sortedNotes()?.length === 0) return ""
    const lastSaved = sortedNotes().sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt)
    )[0]
    return `Updated ${format(lastSaved.updatedAt)}`
  }, [sortedNotes(), isSaving])

  const defaultSubmit = useDefaultSubmitQuestion()

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
              <TD width="0px" className={classes.th} />
              {/* {!isSmallScreen && (
                <TD align="center" className={classes.th}>
                  Weight
                </TD>
              )} */}
            </TR>
          </THead>

          <TBody>
            {sortedNotes().map((note, index) => (
              <DocTableRow
                index={index}
                key={getRowKey(note)}
                question={note}
                onChange={handleNoteChange}
                isSmallScreen={isSmallScreen}
              />
            ))}
          </TBody>
        </Table>
      </TableContainer>

      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexVCenter gap={2}>
          <DarkButton
            onClick={() =>
              openNoteDialog({
                initialValue: buildNoteDto({
                  docId: props.docId,
                }),
                onSubmit: defaultSubmit,
              })
            }
          >
            + Add question
            {!isSmallScreen && " (q)"}
          </DarkButton>

          <AddManyNotesMenuButton docId={props.docId} />
        </FlexVCenter>

        {!isSmallScreen && <Typography>{footerLabel}</Typography>}
      </Toolbar>
    </Paper>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    maxHeight: "calc(100vh - 340px)",
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
