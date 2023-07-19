import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {
  createStyles,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { useAxios } from "hooks/utils/useAxios"
import React from "react"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { TagDto } from "../../../../../types/domain/relearn/TagDto"

interface Props {
  tag: TagDto
  afterDelete?: () => void
}

// PE 2/3 - MenuItem could be shorter?
function TagMoreIcon(props: Props) {
  const classes = useStyles()

  const { setEditingTag, removeTag } = useRelearnStore()

  const dialogStore = useConfirmDialogStore()
  const { setSuccessMessage } = useSnackbarStore()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorEl(null) // avoids error "The `anchorEl` prop provided to the component is invalid"
  }

  const axios = useAxios()

  // handleDelete would be better?
  const handleDeleteTag = (id: number) => {
    dialogStore.openConfirmDialog({
      title: "Confirm delete?",
      onConfirm: () => {
        axios.delete(`${urls.api.relearn.tag}/${id}`).then((res) => {
          setSuccessMessage("Tag deleted!")

          if (props.afterDelete) {
            props.afterDelete()
          }

          setEditingTag(null)
          removeTag(id)
        })
      },
    })
  }

  return (
    <React.Fragment>
      <IconButton
        id="tag-more"
        size="small"
        aria-label="tag-more"
        onClick={(e) => {
          e.preventDefault()
          handleOpenMore(e)
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="tag-more"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e) => {
          const event = e as any
          event.preventDefault()
          handleCloseMore()
        }}
      >
        <MenuItem
          onClick={(e) => {
            e.preventDefault()
            setEditingTag(props.tag)
            handleCloseMore()
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Edit
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            e.preventDefault()
            if (props.tag.id) {
              handleDeleteTag(props.tag.id)
            }
          }}
          id="delete-tag-button"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap color="error">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    tagListItem: {
      paddingLeft: theme.spacing(4),
      alignItems: "flex-start",
    },
    moreButtonBox: {
      position: "absolute",
      width: 32,
      height: 32,
      right: 0,
    },

    listItemIcon: {
      width: 16,
    },
  })
)

export default TagMoreIcon
