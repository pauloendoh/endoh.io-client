import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useMemo } from "react"
import useDocsStore from "store/zustand/domain/useDocsStore"
import EditTextarea from "./EditTextarea/EditTextarea"

interface Props {
  docId: number
}

// PE 1/3 - delete?
export default function QuestionsTable(props: Props) {
  const [notes] = useDocsStore((s) => [s.notes])

  const sortedNotes = useMemo(() => {
    if (!notes) return []

    const sorted = notes
      .filter((n) => n.docId === props.docId)
      .sort((a, b) => a.index - b.index)

    return sorted.map((note, i) => ({
      id: note.id,
      position: i + 1,
      question: note.question,
      answer: note.description,
    }))
  }, [notes, props.docId])

  const columns: GridColDef[] = [
    { field: "position", headerName: "#", width: 48, align: "center" },
    {
      field: "question",
      headerName: "Question",
      editable: true,

      flex: 1,
    },
    {
      field: "answer",
      type: "string",
      renderEditCell: (params) => <EditTextarea {...params} />,
      headerName: "Answer",
      editable: true,
      flex: 1,
    },
  ]

  return (
    <Box sx={{ height: "calc(100vh - 192px)", width: "100%" }}>
      <DataGrid
        rows={sortedNotes}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onCellEditStop={(params, e) => {
          console.log({
            data: params.row,
          })
        }}
      />
    </Box>
  )
}
