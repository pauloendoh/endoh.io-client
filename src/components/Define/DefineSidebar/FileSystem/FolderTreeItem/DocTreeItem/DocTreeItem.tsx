import { useTheme } from "@material-ui/core"
import { TreeItem } from "@material-ui/lab"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import Txt from "components/_UI/Text/Txt"
import useSaveDocLastOpenedAt from "hooks/react-query/define/useSaveDocLastOpenedAt"
import { useRef } from "react"
import { useDrag } from "react-dnd"
import { useHistory } from "react-router-dom"
import useFlashnotesStore from "store/zustand/domain/useFlashnotesStore"
import { DocDto } from "types/domain/define/DocDto"
import Icons from "utils/styles/Icons"
import { urls } from "utils/urls"

interface Props {
  doc: DocDto
}

export interface DndDoc {
  id: number
  parentFolderId: number
}

export default function DocTreeItem({ doc }: Props) {
  const theme = useTheme()
  const { setSelectedDoc } = useFlashnotesStore()

  const [{}, dragDocRef] = useDrag({
    type: "doc",
    item: doc,
    collect: (monitor) => ({}),
  })

  const history = useHistory()

  const htmlDragDocRef = useRef<HTMLDivElement>()
  dragDocRef(htmlDragDocRef)

  const { mutate: submitSaveDocLastOpenedAt } = useSaveDocLastOpenedAt()

  return (
    <TreeItem
      ref={htmlDragDocRef}
      nodeId={String(doc.id)}
      onClick={(e) => {
        e.preventDefault()
        setSelectedDoc(doc)
        submitSaveDocLastOpenedAt(doc.id)
        history.push(urls.pages.defineDoc(doc.id))
      }}
      label={
        <FlexVCenter style={{ justifyContent: "space-between", minHeight: 30 }}>
          <FlexVCenter style={{ gap: theme.spacing(1) }}>
            <Icons.InsertDriveFileOutlined fontSize="small" />
            <Txt variant="body2">{doc.title}</Txt>
          </FlexVCenter>
        </FlexVCenter>
      }
    />
  )
}
