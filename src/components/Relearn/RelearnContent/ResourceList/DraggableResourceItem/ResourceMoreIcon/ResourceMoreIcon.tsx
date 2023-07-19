import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { pushOrReplace } from "endoh-utils"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import FileCopyIcon from "@mui/icons-material/FileCopy"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import { useAxios } from "hooks/utils/useAxios"
import React, { useEffect } from "react"
import { MdVerticalAlignBottom, MdVerticalAlignTop } from "react-icons/md"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { ResourceDto } from "../../../../../../types/domain/relearn/ResourceDto"

interface Props {
  resource: ResourceDto
  isHovered: boolean
}

// PE 1/3
function ResourceMoreIcon(props: Props) {
  const classes = useStyles()
  const { openConfirmDialog } = useConfirmDialogStore()

  const { setSuccessMessage } = useSnackbarStore()

  const {
    setEditingResource,
    removeResource,
    setResources,
    resources: allResources,
  } = useRelearnStore()

  useEffect(() => {
    if (!props.isHovered) setAnchorEl(null)
  }, [props.isHovered])

  // Anchor when you click 'More' icon
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorEl(null)
  }

  const axios = useAxios()

  const handleDeleteResource = (id: number) => {
    openConfirmDialog({
      title: "Delete resource?",
      onConfirm: () => {
        axios.delete(`${urls.api.relearn.resource}/${id}`).then((res) => {
          setSuccessMessage("Resource deleted!")

          removeResource(id)
        })
      },
    })
  }

  const duplicateResource = (resource: ResourceDto) => {
    axios
      .post<ResourceDto[]>(
        `${urls.api.relearn.resourceDuplicate}/${resource.id}`
      )
      .then((res) => {
        setSuccessMessage("Resource duplicated!")

        setResources(res.data)
      })
  }

  const handleMoveToFirst = () => {
    handleCloseMore()

    axios
      .post<ResourceDto[]>(
        urls.api.relearn.moveResourceToFirst(props.resource.id || 0)
      )
      .then((res) => {
        setSuccessMessage("Resource moved to first!")

        let resources = [...allResources]
        for (const resource of res.data) {
          resources = pushOrReplace(resources, resource, "id")
        }
        setResources(resources)
      })
  }

  const handleMoveToLast = () => {
    handleCloseMore()

    axios
      .post<ResourceDto[]>(
        urls.api.relearn.moveResourceToLast(props.resource.id || 0)
      )
      .then((res) => {
        setSuccessMessage("Resource moved to last!")

        let resources = [...allResources]
        for (const resource of res.data) {
          resources = pushOrReplace(resources, resource, "id")
        }
        setResources(resources)
      })
  }

  return (
    <React.Fragment>
      {/* 'More' icon - PE 1/3 - can be a specific component */}
      <div>
        <Box className={classes.moreButtonBox}>
          {props.isHovered && (
            <IconButton
              size="small"
              id="resource-more-icon"
              aria-label="resource-more-icon"
              onClick={(e) => {
                handleOpenMore(e)
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          )}
        </Box>
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
              handleCloseMore()
              setEditingResource(props.resource)
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
              handleCloseMore()
              duplicateResource(props.resource)
            }}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <FileCopyIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Duplicate
            </Typography>
          </MenuItem>
          {!props.resource.completedAt && (
            <MenuItem onClick={handleMoveToFirst}>
              <ListItemIcon>
                <MdVerticalAlignTop />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Move to first
              </Typography>
            </MenuItem>
          )}
          {!props.resource.completedAt && (
            <MenuItem onClick={handleMoveToLast}>
              <ListItemIcon>
                <MdVerticalAlignBottom />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Move to last
              </Typography>
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              handleCloseMore()
              handleDeleteResource(props.resource.id || 0)
            }}
            id="delete-resource-button"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap color="error">
              Delete
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    </React.Fragment>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  listItemIcon: {
    width: 16,
  },
  moreButtonBox: {
    width: 32,
    minWidth: 32,
  },
}))

export default ResourceMoreIcon
