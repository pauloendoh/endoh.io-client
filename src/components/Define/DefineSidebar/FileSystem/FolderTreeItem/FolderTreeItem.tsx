import { useTheme } from "@material-ui/core"
import { TreeItem } from "@material-ui/lab"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import Txt from "components/_UI/Text/Txt"
import useSaveFolderMutation from "hooks/react-query/folders/useSaveFolderMutation"
import { queryKeys } from "hooks/react-query/queryKeys"
import { useMemo, useRef, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useQueryClient } from "react-query"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useFlashnotesStore from "store/zustand/domain/useFlashnotesStore"
import { DocDto } from "types/domain/define/DocDto"
import { partialFolderDto } from "types/domain/folder/FolderDto"
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto"
import myAxios from "utils/consts/myAxios"
import Icons from "utils/styles/Icons"
import apiUrls from "utils/url/urls/apiUrls"
import DocTreeItem from "./DocTreeItem/DocTreeItem"
import FolderMoreIcon from "./FolderMoreIcon/FolderMoreIcon"

interface Props {
  folder: FolderWithSubfoldersDto
}

export default function FolderTreeItem({ folder }: Props) {
  const [hover, setHover] = useState(false)

  const { mutate: saveFolder } = useSaveFolderMutation()
  const queryClient = useQueryClient()

  const pushOrReplaceDoc = useDocsStore((s) => s.pushOrReplaceDoc)

  const onSubmit = (values: { title: string; docId: number }) => {
    const obj = {
      title: values.title,
      id: values.docId,
      folderId: folder.id,
    }
    myAxios.post<DocDto>(apiUrls.define.doc, obj).then((res) => {
      pushOrReplaceDoc(res.data)
      queryClient.invalidateQueries(queryKeys.folders)
    })
  }

  const { toggleNode } = useFlashnotesStore()

  const theme = useTheme()

  const sortedDocs = useMemo(() => {
    if (folder.docs?.length > 0) {
      return folder.docs.sort((a, b) => a.title.localeCompare(b.title))
    }
    return []
  }, [folder.docs])

  const [{}, dragFolderRef] = useDrag({
    type: "folder",
    item: folder,
    collect: (monitor) => ({}),
  })

  const sortedSubfolders = useMemo(() => {
    if (folder.subfolders?.length > 0) {
      return folder.subfolders.sort((a, b) => a.name.localeCompare(b.name))
    }
    return []
  }, [folder.subfolders])

  const hasChildren = useMemo(() => {
    return sortedDocs.length + sortedSubfolders.length > 0
  }, [sortedDocs, sortedSubfolders])

  const [{ isHovering: docIsHovering }, dropDocRef] = useDrop({
    accept: "doc",

    drop(doc: DocDto) {
      doc.folderId = folder.id
      onSubmit({
        docId: doc.id,
        title: doc.title,
      })
    },
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
  })

  const [{ isHovering: folderIsHovering }, dropFolderRef] = useDrop({
    accept: "folder",

    drop(draggedFolder: FolderWithSubfoldersDto) {
      saveFolder(
        partialFolderDto({
          id: draggedFolder.id,
          name: draggedFolder.name,
          parentFolderId: folder.id,
        })
      )
    },
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
  })

  const htmlDropDocRef = useRef<HTMLDivElement>()

  dropFolderRef(dragFolderRef(dropDocRef(htmlDropDocRef)))

  return (
    <TreeItem
      nodeId={`folder-${folder.id}`}
      onClick={(e) => {
        e.preventDefault()

        if (folder.docs.length > 0 || folder.subfolders.length > 0)
          toggleNode(`folder-${folder.id}`)
      }}
      label={
        <div
          ref={htmlDropDocRef}
          style={{
            background:
              docIsHovering || folderIsHovering
                ? theme.palette.grey[600]
                : undefined,
          }}
        >
          <FlexVCenter
            style={{
              justifyContent: "space-between",
              minHeight: 30,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <FlexVCenter style={{ gap: theme.spacing(1) }}>
              <Icons.Folder fontSize="small" />
              <Txt variant="body2">{folder.name}</Txt>
            </FlexVCenter>

            {hover && <FolderMoreIcon folder={folder} />}
          </FlexVCenter>
        </div>
      }
    >
      {hasChildren && (
        <>
          {sortedSubfolders.map((subfolder) => (
            <FolderTreeItem key={subfolder.id} folder={subfolder} />
          ))}
          {sortedDocs.map((doc) => (
            <DocTreeItem key={doc.id} doc={doc} />
          ))}
        </>
      )}
    </TreeItem>
  )
}