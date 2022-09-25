import { IconButton, useTheme } from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import DocTitleDialog from "components/Define/DocTitleDialog/DocTitleDialog";
import Flex from "components/_UI/Flexboxes/Flex";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import Txt from "components/_UI/Text/Txt";
import { useFoldersQuery } from "hooks/react-query/folders/useFoldersQuery";
import useSaveFolderMutation from "hooks/react-query/folders/useSaveFolderMutation";
import { useMemo, useRef } from "react";
import { useDrop } from "react-dnd";
import useFlashnotesStore from "store/zustand/domain/useFlashnotesStore";
import { newFolderDto, partialFolderDto } from "types/domain/folder/FolderDto";
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto";
import Icons from "utils/styles/Icons";
import FolderDialog from "./FolderDialog/FolderDialog";
import FolderTreeItem from "./FolderTreeItem/FolderTreeItem";

export default function FileSystem() {
  const {
    fileDialogParentFolderId,
    setFileDialogParentFolderId,

    openFolderDialog,
    setOpenFolderDialog,
    folderDialogParentFolderId,
  } = useFlashnotesStore();

  const { data: userFolders } = useFoldersQuery();

  const sortedFolders = useMemo(() => {
    if (userFolders?.length > 0) {
      return userFolders.sort((a, b) => a.name.localeCompare(b.name));
    }
    return [];
  }, [userFolders]);

  const { mutate: saveFolder } = useSaveFolderMutation();
  const [{ isHovering: folderIsHovering }, dropFolderRef] = useDrop({
    accept: "folder",

    drop(draggedFolder: FolderWithSubfoldersDto) {
      saveFolder(
        partialFolderDto({
          id: draggedFolder.id,
          name: draggedFolder.name,
          parentFolderId: null,
        })
      );
    },
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
  });

  const htmlDropRef = useRef<HTMLDivElement>();
  dropFolderRef(htmlDropRef);

  const { expandedNodes, toggleNode } = useFlashnotesStore();

  const theme = useTheme();
  return (
    <Flex style={{ gap: theme.spacing(4) }}>
      <TreeView
        defaultCollapseIcon={<Icons.ExpandMore />}
        defaultExpandIcon={<Icons.ChevronRight />}
        style={{ width: 300 }}
        expanded={expandedNodes}
      >
        <TreeItem
          nodeId="root"
          onClick={(e) => {
            e.preventDefault();
            toggleNode("root");
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
              <Txt>ROOT</Txt>
              <FlexVCenter>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    // impede o toggle
                    e.preventDefault();
                    setOpenFolderDialog(true);
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
  );
}
