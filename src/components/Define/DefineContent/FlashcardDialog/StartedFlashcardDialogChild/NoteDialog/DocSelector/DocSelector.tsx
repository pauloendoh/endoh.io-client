import { Autocomplete } from "@material-ui/lab"
import MyTextField from "components/_UI/MyInputs/MyTextField"
import { useMemo } from "react"
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

  return (
    <Autocomplete
      value={selectedDoc}
      options={docs}
      getOptionLabel={(doc) => doc.title}
      onChange={(e, doc) => {
        if (typeof doc === "string") return
        props.onChange(doc.id)
      }}
      renderInput={(params) => (
        <MyTextField {...params} label="Doc" size="small" required />
      )}
    />
  )
}

export default DocSelector
