import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material"
import useDeleteFolderMutation from "hooks/react-query/folders/useDeleteFolderMutation"
import { useState } from "react"
import useFolderDialogStore from "store/zustand/dialogs/useFolderDialogStore"
import useFlashnotesStore from "store/zustand/domain/useFlashnotesStore"
import { buildFolderDto } from "types/domain/folder/FolderDto"
import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto"
import Icons from "utils/styles/Icons"

interface Props {
  folder: FolderWithSubfoldersDto
  visible: boolean
}

export default function FolderMoreIcon({ folder, ...props }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const { mutate: deleteFolder } = useDeleteFolderMutation()

  const { setFileDialogParentFolderId } = useFlashnotesStore()

  const { openDialog: openFolderDialog } = useFolderDialogStore()

  const handleOpenMore = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(null) // avoids error "The `anchorEl` prop provided to the component is invalid"
  }

  const theme = useTheme()

  return (
    <>
      <IconButton
        sx={{ visibility: props.visible ? "visible" : "hidden" }}
        size="small"
        onClick={handleOpenMore}
      >
        <Icons.MoreHoriz />
      </IconButton>
      <Menu
        id="tag-more"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMore}
      >
        <MenuItem
          onClick={(e) => {
            handleCloseMore(e)
            setFileDialogParentFolderId(folder.id)
          }}
        >
          <ListItemIcon style={{ width: 16 }}>
            <Icons.InsertDriveFile fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            New deck
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            handleCloseMore(e)
            openFolderDialog(
              buildFolderDto({
                parentFolderId: folder?.id || null,
              })
            )
          }}
        >
          <ListItemIcon style={{ width: 16 }}>
            <Icons.Folder fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            New folder
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            handleCloseMore(e)
            openFolderDialog(folder)
          }}
        >
          <ListItemIcon style={{ width: 16 }}>
            <Icons.Edit fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Edit folder
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            handleCloseMore(e)
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Delete folder and its docs?")) {
              deleteFolder(folder.id)
            }
          }}
          style={{ color: theme.palette.error.main }}
        >
          <ListItemIcon style={{ width: 16 }}>
            <Icons.Delete fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Delete folder
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
