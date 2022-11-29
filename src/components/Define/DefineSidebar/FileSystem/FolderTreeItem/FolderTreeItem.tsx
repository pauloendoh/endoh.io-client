import { urls } from "utils/urls"

import { TreeItem } from "@mui/lab"
import { useTheme } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import Txt from "components/_UI/Text/Txt"
import useSaveFolderMutation from "hooks/react-query/folders/useSaveFolderMutation"
import { queryKeys } from "hooks/react-query/queryKeys"
import { useAxios } from "hooks/utils/useAxios"
import { useMemo, useRef, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useQueryClient } from "react-query"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useFlashnotesStore from "store/zustand/domain/useFlashnotesStore"
import { DocDto } from "types/domain/define/DocDto"
import { buildFolderDto } from "types/domain/folder/FolderDto"
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto"
import Icons from "utils/styles/Icons"
import DocTreeItem from "./DocTreeItem/DocTreeItem"
import FolderMoreIcon from "./FolderMoreIcon/FolderMoreIcon"

interface Props {
  folder: FolderWithSubfoldersDto
}

export default function FolderTreeItem({ folder }: Props) {
  const [hover, setHover] = useState(false)

  const myAxios = useAxios()
  const { mutate: saveFolder } = useSaveFolderMutation()
  const queryClient = useQueryClient()

  const pushOrReplaceDoc = useDocsStore((s) => s.pushOrReplaceDoc)

  const axios = useAxios()

  const onSubmit = (values: { title: string; docId: number }) => {
    const obj = {
      title: values.title,
      id: values.docId,
      folderId: folder.id,
    }
    axios.post<DocDto>(urls.api.define.doc, obj).then((res) => {
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
        buildFolderDto({
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
          <Flex
            style={{
              justifyContent: "space-between",
              minHeight: 30,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Flex style={{ gap: theme.spacing(1), paddingTop: 8 }}>
              <Icons.Folder
                fontSize="small"
                style={{ position: "relative", bottom: 2 }}
              />
              <Txt variant="body2">{folder.name}</Txt>
            </Flex>

            <Flex>
              <div
                style={{
                  width: 32,
                }}
              >
                {<FolderMoreIcon visible={hover} folder={folder} />}
              </div>
            </Flex>
          </Flex>
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
