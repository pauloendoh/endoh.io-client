import { Autocomplete } from "@mui/lab"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import { useMemo } from "react"
import useDocDialogStore from "store/zustand/dialogs/useDocDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"

interface Props {
  docId: number
  onChange: (docId: number) => void
}

const DocSelector = (props: Props) => {
  const docs = useDocsStore((s) => s.docs)
  const selectedDoc = useMemo(() => docs.find((d) => d.id === props.docId), [
    props.docId,
    docs,
  ])

  const options = useMemo(() => {
    const sorted =
      docs?.sort((a, b) => {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1
        return 0
      }) || []

    return [{ id: -1, title: "Create new doc" }, ...sorted]
  }, [docs])

  const { openDocDialog } = useDocDialogStore()

  return (
    <>
      <Autocomplete
        value={selectedDoc}
        options={options}
        getOptionLabel={(doc) => (typeof doc === "string" ? doc : doc.title)}
        onChange={(e, doc) => {
          if (typeof doc === "string") return
          if (doc.id === -1) {
            openDocDialog()
            return
          }
          props.onChange(doc.id)
        }}
        renderInput={(params) => (
          <MyTextField {...params} label="Doc" size="small" required />
        )}
        renderOption={(liProps, label) => {
          if (label.id > 0) return <li {...liProps}>{label.title}</li>

          return (
            <li
              {...liProps}
              style={{ display: "flex", justifyContent: "center" }}
            >
              + Create new doc
            </li>
          )
        }}
      />
    </>
  )
}

export default DocSelector
