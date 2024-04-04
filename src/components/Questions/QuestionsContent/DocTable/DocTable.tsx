import { Theme, Typography, useMediaQuery, useTheme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useVirtual } from "react-virtual"
import { format } from "timeago.js"

import { Paper, Table, TableContainer, Toolbar } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { useAxios } from "hooks/utils/useAxios"
import useElementSize from "hooks/utils/useElementSize"
import { useMemo, useRef, useState } from "react"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import { urls } from "utils/urls"
import {
  QuestionDto,
  buildQuestionDto,
} from "../../../../types/domain/questions/QuestionDto"
import DarkButton from "../../../_UI/Buttons/DarkButton/DarkButton"
import { TBody, TD, THead, TR } from "../../../_UI/Table/MyTableWrappers"
import AddManyQuestionsMenuButton from "./AddManyNotesMenuButton/AddManyQuestionsMenuButton"
import DocTableRow from "./DocTableRow/DocTableRow"

const DocTable = (props: Props) => {
  const docsStore = useDocsStore()

  const classes = useStyles()

  const [openNoteDialog] = useQuestionDialogStore((s) => [
    s.openDialog,
    s.onClose,
  ])

  // for some reason, useMemo does not work very well here
  // I won't bother to fix it now
  const sortedNotes = () => {
    const filtered = docsStore.questions.filter(
      (note) => note.docId === props.docId
    )
    const sorted = filtered.sort((a, b) => a.index - b.index)
    return sorted
  }

  const [throttle, setThrottle] = useState<NodeJS.Timeout>()

  const axios = useAxios()

  const [isSaving, setIsSaving] = useState(false)

  const handleNoteChange = (changed: QuestionDto) => {
    setIsSaving(true)
    clearTimeout(throttle)
    setThrottle(
      setTimeout(() => {
        axios
          .post<QuestionDto>(urls.api.define.questions, changed)
          .then((res) => {
            // docsStore.pushOrReplaceNote(res.data)
          })
          .finally(() => setIsSaving(false))
      }, 500)
    )
  }

  const getRowKey = (question: QuestionDto) => {
    return `${question.id}-${question.weight}-${question.updatedAt}`
  }

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

  const [toolbarRef, { width: toolbarWidth }] = useElementSize()

  const tableContainerRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: sortedNotes().length,
    overscan: 10,
  })

  return (
    <Paper>
      <TableContainer className={classes.container} ref={tableContainerRef}>
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
            {/* {virtualRows.map((virtualRow) => {
              const index = virtualRow.index
              const note = sortedNotes()[index]

              return (
                <DocTableRow
                  index={index}
                  key={getRowKey(note)}
                  question={note}
                  onChange={handleNoteChange}
                  isSmallScreen={isSmallScreen}
                />
              )
            })} */}
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
        ref={toolbarRef}
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
                initialValue: buildQuestionDto({
                  docId: props.docId,
                }),
                onSubmit: defaultSubmit,
              })
            }
          >
            + Add question
            {toolbarWidth > 500 && " (q)"}
          </DarkButton>

          <AddManyQuestionsMenuButton docId={props.docId} />
        </FlexVCenter>

        {toolbarWidth > 440 && <Typography>{footerLabel}</Typography>}
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
