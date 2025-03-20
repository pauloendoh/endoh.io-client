import { TreeItem } from "@mui/lab"
import { useTheme } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import Txt from "components/_UI/Text/Txt"
import useSaveDocLastOpenedAt from "hooks/react-query/questions/useSaveDocLastOpenedAt"
import { useRef } from "react"
import { useDrag } from "react-dnd"
import { MdInsertDriveFile } from "react-icons/md"
import { Link } from "react-router-dom"
import useFlashnotesStore from "store/zustand/domain/useFlashnotesStore"
import { DocDto } from "types/domain/questions/DocDto"
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

  const htmlDragDocRef = useRef<HTMLDivElement>()
  dragDocRef(htmlDragDocRef)

  const { mutate: submitSaveDocLastOpenedAt } = useSaveDocLastOpenedAt()

  return (
    <TreeItem
      ref={htmlDragDocRef}
      nodeId={`doc-${doc.id}`}
      onClick={(e) => {
        e.preventDefault()
        setSelectedDoc(doc)
        submitSaveDocLastOpenedAt(doc.id)
      }}
      label={
        <Link
          to={urls.pages.questionsDeck(doc.id)}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <FlexVCenter
            style={{ justifyContent: "space-between", minHeight: 30 }}
          >
            <Flex style={{ gap: theme.spacing(1) }}>
              <MdInsertDriveFile
                fontSize="small"
                style={{ minWidth: 16, top: 2, position: "relative" }}
              />
              <Txt variant="body2">{doc.title}</Txt>
            </Flex>
          </FlexVCenter>
        </Link>
      }
    />
  )
}
