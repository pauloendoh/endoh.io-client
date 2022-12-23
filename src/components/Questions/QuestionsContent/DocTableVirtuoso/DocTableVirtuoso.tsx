import { TableVirtuoso } from "react-virtuoso"

import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material"
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import FlexVCenterBetween from "components/_UI/Flexboxes/FlexVCenterBetween"
import { useAxios } from "hooks/utils/useAxios"
import { useMemo, useState } from "react"
import useNoteDialogStore from "store/zustand/dialogs/useNoteDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useAuthStore from "store/zustand/useAuthStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { format } from "timeago.js"
import { urls } from "utils/urls"
import {
  buildNoteDto,
  NoteDto,
} from "../../../../types/domain/questions/NoteDto"
import AddManyNotesMenuButton from "../DocTable/AddManyNotesMenuButton/AddManyNotesMenuButton"
import DocRowVirtuoso from "./DocRowVirtuoso/DocRowVirtuoso"
interface Props {
  docId: number
}

const DocTableVirtuoso = (props: Props) => {
  const docsStore = useDocsStore()
  const { authUser } = useAuthStore()

  const myAxios = useAxios()

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

  const thBackgroundColor = theme.palette.grey[900]

  return (
    <Paper
      sx={{
        "td, th": {
          padding: 1,
          fontWeight: "unset",
          fontSize: 13,
          borderBottom: "1px solid rgb(255 255 255 / 0.1)",
        },
        th: {
          background: thBackgroundColor,
        },
      }}
    >
      <TableVirtuoso
        style={{ height: "calc(100vh - 240px)" }}
        data={sortedNotes()}
        totalCount={sortedNotes().length}
        fixedHeaderContent={() => (
          <tr>
            {!isSmallScreen && (
              <th style={{ width: 30 }} align="center">
                #
              </th>
            )}

            <th align="left" style={{ width: "50%" }}>
              Question
            </th>
            <th align="left" style={{ width: "50%" }}>
              Answer
            </th>
            <th></th>
          </tr>
        )}
        itemContent={(index, note) => (
          <>
            <DocRowVirtuoso
              index={index}
              key={getRowKey(note)}
              question={note}
              onChange={handleNoteChange}
              isSmallScreen={isSmallScreen}
            />
          </>
        )}
      />

      <FlexVCenterBetween width="100%" p={2}>
        <FlexVCenter gap={2}>
          <DarkButton
            onClick={() =>
              openNoteDialog({
                initialValue: buildNoteDto({
                  docId: props.docId,
                }),
                onSubmit: (updatedNote) => {
                  myAxios
                    .post<NoteDto>(urls.api.define.note, updatedNote)
                    .then((res) => {
                      docsStore.pushOrReplaceNote(res.data)

                      setSuccessMessage("Question saved!")
                      onClose()
                    })
                },
              })
            }
          >
            + Add question (q)
          </DarkButton>

          <AddManyNotesMenuButton docId={props.docId} />
        </FlexVCenter>
        {!isSmallScreen && <Typography>{footerLabel}</Typography>}
      </FlexVCenterBetween>
    </Paper>
  )
}

export default DocTableVirtuoso
