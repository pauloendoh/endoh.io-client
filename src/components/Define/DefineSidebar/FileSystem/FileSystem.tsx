import { IconButton, useTheme } from "@material-ui/core"
import { TreeItem, TreeView } from "@material-ui/lab"
import DocTitleDialog from "components/Define/DocTitleDialog/DocTitleDialog"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import Txt from "components/_UI/Text/Txt"
import { useFoldersQuery } from "hooks/react-query/folders/useFoldersQuery"
import useSaveFolderMutation from "hooks/react-query/folders/useSaveFolderMutation"
import { useEffect, useMemo, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import { useParams } from "react-router-dom"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useFlashnotesStore from "store/zustand/domain/useFlashnotesStore"
import { newFolderDto, partialFolderDto } from "types/domain/folder/FolderDto"
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto"
import Icons from "utils/styles/Icons"
import FolderDialog from "./FolderDialog/FolderDialog"
import DocTreeItem from "./FolderTreeItem/DocTreeItem/DocTreeItem"
import FolderTreeItem from "./FolderTreeItem/FolderTreeItem"
import { spreadFolders } from "./spreadFolders/spreadFolders"

// PE 1/3 - rename?
export default function FileSystem() {
  const {
    fileDialogParentFolderId,
    setFileDialogParentFolderId,

    openFolderDialog,
    setOpenFolderDialog,
    folderDialogParentFolderId,
  } = useFlashnotesStore()

  const docs = useDocsStore((s) => s.docs)

  const { data: userFolders } = useFoldersQuery()

  const sortedFolders = useMemo(() => {
    if (userFolders?.length > 0) {
      return userFolders.sort((a, b) => a.name.localeCompare(b.name))
    }
    return []
  }, [userFolders])

  const { mutate: saveFolder } = useSaveFolderMutation()
  const [{ isHovering: folderIsHovering }, dropFolderRef] = useDrop({
    accept: "folder",

    drop(draggedFolder: FolderWithSubfoldersDto) {
      saveFolder(
        partialFolderDto({
          id: draggedFolder.id,
          name: draggedFolder.name,
          parentFolderId: null,
        })
      )
    },
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
  })

  const htmlDropRef = useRef<HTMLDivElement>()
  dropFolderRef(htmlDropRef)

  const { expandedNodes, toggleNode, setExpandedNodes } = useFlashnotesStore()

  const theme = useTheme()

  const docsWithoutFolder = useMemo(() => {
    let filtered = docs.filter((d) => d.folderId === null)

    return filtered.sort((a, b) => a.title.localeCompare(b.title))
  }, [docs])

  const { docId } = useParams<{ docId?: string }>()

  const [didFirstExpansion, setDidFirstExpansion] = useState(false)

  useEffect(() => {
    if (docs.length === 0 || sortedFolders.length === 0 || didFirstExpansion)
      return

    let expandNodeIds = ["root"]
    if (docId) {
      let doc = docs.find((d) => d.id === Number(docId))

      const allFolders = spreadFolders(sortedFolders)

      if (!doc) return
      let { folderId } = doc

      while (folderId) {
        expandNodeIds.push(String(folderId))

        let folder = allFolders.find((f) => f.id === folderId)
        folderId = folder?.parentFolderId
      }

      setExpandedNodes(expandNodeIds)
      setDidFirstExpansion(true)
    }
  }, [docs, sortedFolders, docId])

  return (
    <Flex style={{ gap: theme.spacing(4) }}>
      <TreeView
        defaultCollapseIcon={<Icons.ExpandMore />}
        defaultExpandIcon={<Icons.ChevronRight />}
        style={{ width: 300 }}
        expanded={expandedNodes}
        selected={docId ? [docId] : []}
      >
        <TreeItem
          nodeId="root"
          onClick={(e) => {
            e.preventDefault()
            toggleNode("root")
          }}
          label={
            <div
              ref={htmlDropRef}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: folderIsHovering
                  ? theme.palette.grey[600]
                  : undefined,
              }}
            >
              <Txt>Docs</Txt>
              <FlexVCenter>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    // impede o toggle
                    e.preventDefault()
                    setOpenFolderDialog(true)
                  }}
                >
                  <Icons.CreateNewFolder fontSize="small" />
                </IconButton>
              </FlexVCenter>
            </div>
          }
        >
          {sortedFolders.map((folder) => (
            <FolderTreeItem folder={folder} key={folder.id} />
          ))}
          {docsWithoutFolder.map((doc) => (
            <DocTreeItem doc={doc} key={doc.id} />
          ))}
        </TreeItem>
      </TreeView>

      <FolderDialog
        open={openFolderDialog}
        initialValue={newFolderDto(folderDialogParentFolderId)}
        onClose={() => setOpenFolderDialog(false)}
      />

      <DocTitleDialog
        open={!!fileDialogParentFolderId}
        initialValue={{ title: "", folderId: fileDialogParentFolderId }}
        onClose={() => setFileDialogParentFolderId(null)}
        afterSave={() => setFileDialogParentFolderId(null)}
      />

      {/* <FileDialog
        open={!!fileDialogParentFolderId}
        initialValue={newFileDto(fileDialogParentFolderId)}
        onClose={() => setFileDialogParentFolderId(null)}
      /> */}
    </Flex>
  )
}
