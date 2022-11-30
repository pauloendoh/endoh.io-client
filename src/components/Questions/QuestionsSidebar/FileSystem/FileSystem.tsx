import { TreeItem } from "@mui/lab"
import { IconButton, Tooltip, useTheme } from "@mui/material"
import DocTitleDialog from "components/Questions/DocTitleDialog/DocTitleDialog"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import Txt from "components/_UI/Text/Txt"
import { useFoldersQuery } from "hooks/react-query/folders/useFoldersQuery"
import useSaveFolderMutation from "hooks/react-query/folders/useSaveFolderMutation"
import { useEffect, useMemo, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import { RiFileAddFill } from "react-icons/ri"
import { useHistory, useParams } from "react-router-dom"
import useFolderDialogStore from "store/zustand/dialogs/useFolderDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useFlashnotesStore from "store/zustand/domain/useFlashnotesStore"
import { buildFolderDto } from "types/domain/folder/FolderDto"
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto"
import Icons from "utils/styles/Icons"
import { urls } from "utils/urls"
import { S } from "./FileSystem.styles"
import DocTreeItem from "./FolderTreeItem/DocTreeItem/DocTreeItem"
import FolderTreeItem from "./FolderTreeItem/FolderTreeItem"
import { spreadFolders } from "./spreadFolders/spreadFolders"

// PE 1/3 - rename?
export default function FileSystem() {
  const history = useHistory()

  const {
    fileDialogParentFolderId,
    setFileDialogParentFolderId,
  } = useFlashnotesStore()

  const { openDialog: openFolderDialogStore } = useFolderDialogStore()

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
        buildFolderDto({
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
        expandNodeIds.push(`folder-${folderId}`)

        let folder = allFolders.find((f) => f.id === folderId)
        folderId = folder?.parentFolderId
      }

      setExpandedNodes(expandNodeIds)
      setDidFirstExpansion(true)
    }
  }, [docs, sortedFolders, docId])

  const [openTitleDialog, setOpenTitleDialog] = useState(false)

  return (
    <Flex style={{ gap: theme.spacing(4) }}>
      <S.TreeView
        defaultCollapseIcon={<Icons.ExpandMore />}
        defaultExpandIcon={<Icons.ChevronRight />}
        style={{ width: 300 }}
        expanded={expandedNodes}
        selected={docId ? `doc-${docId}` : ""}
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
              <FlexVCenter paddingRight={1} style={{ gap: 8 }}>
                <Tooltip title="Add doc">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenTitleDialog(true)
                    }}
                  >
                    <RiFileAddFill />
                  </IconButton>
                </Tooltip>

                <Tooltip title="New folder" arrow>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      // impede o toggle
                      e.stopPropagation()
                      openFolderDialogStore(
                        buildFolderDto({
                          parentFolderId: fileDialogParentFolderId,
                        })
                      )
                    }}
                  >
                    <Icons.CreateNewFolder fontSize="small" />
                  </IconButton>
                </Tooltip>
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
      </S.TreeView>

      <DocTitleDialog
        open={!!fileDialogParentFolderId}
        initialValue={{ title: "", folderId: fileDialogParentFolderId }}
        onClose={() => setFileDialogParentFolderId(null)}
        afterSave={(doc) => {
          history.push(urls.pages.questionsDoc(doc.id))

          setFileDialogParentFolderId(null)
        }}
      />

      <DocTitleDialog
        open={openTitleDialog}
        initialValue={{ title: "" }}
        onClose={() => setOpenTitleDialog(false)}
        afterSave={(doc) => {
          history.push(urls.pages.questionsDoc(doc.id))
          setOpenTitleDialog(false)
        }}
      />

      {/* <FileDialog
        open={!!fileDialogParentFolderId}
        initialValue={newFileDto(fileDialogParentFolderId)}
        onClose={() => setFileDialogParentFolderId(null)}
      /> */}
    </Flex>
  )
}
