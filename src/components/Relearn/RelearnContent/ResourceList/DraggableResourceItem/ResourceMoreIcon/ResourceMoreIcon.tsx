import { Divider, IconButton, Theme, useTheme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { pushOrReplace } from "endoh-utils"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import FileCopyIcon from "@mui/icons-material/FileCopy"
import { Box, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material"
import FlexCenter from "components/_UI/Flexboxes/FlexCenter"
import { useMoveResourceToPositionMutation } from "hooks/react-query/relearn/useMoveResourceToPositionMutation"
import { useAxios } from "hooks/utils/useAxios"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import React, { useEffect } from "react"
import { IoMdMove } from "react-icons/io"
import {
  MdMoreHoriz,
  MdVerticalAlignBottom,
  MdVerticalAlignTop,
} from "react-icons/md"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import { useNumberDialogStore } from "store/zustand/useNumberDialogStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { ResourceDto } from "../../../../../../types/domain/relearn/ResourceDto"

type Props = {
  resource: ResourceDto
  isHovered: boolean
  index?: number
}

// PE 1/3
function ResourceMoreIcon(props: Props) {
  const classes = useStyles()
  const { openConfirmDialog } = useConfirmDialogStore()

  const { openDialog: openNumberDialog } = useNumberDialogStore()

  const { setSuccessMessage } = useSnackbarStore()

  const {
    removeResource,
    setResources,
    resources: allResources,
  } = useRelearnStore()

  const { setInitialValue: setEditingResource } = useResourceDialogStore()

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

  const { isMobile } = useMyMediaQuery()

  const theme = useTheme()

  const { mutate: submitMoveResource } = useMoveResourceToPositionMutation({
    showSuccessMessage: true,
  })

  return (
    <React.Fragment>
      {/* 'More' icon - PE 1/3 - can be a specific component */}
      <div>
        <Box>
          {props.isHovered && (
            <>
              {props.index !== undefined ? (
                <FlexCenter
                  sx={{
                    cursor: "pointer",
                    backgroundColor: theme.palette.grey[800],
                    borderRadius: 1,
                    px: 1,
                    py: 0.25,
                    ":hover": {
                      backgroundColor: theme.palette.grey[700],
                    },
                  }}
                  onClick={(e) => {
                    handleOpenMore(e)
                  }}
                >
                  <Typography variant="caption">{props.index + 1}</Typography>
                </FlexCenter>
              ) : (
                <IconButton
                  size="small"
                  id="resource-more-icon"
                  aria-label="resource-more-icon"
                  onClick={(e) => {
                    handleOpenMore(e)
                  }}
                  sx={
                    isMobile
                      ? {
                          padding: 0,
                        }
                      : undefined
                  }
                >
                  <MdMoreHoriz />
                </IconButton>
              )}
            </>
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
            <>
              <Divider />
              <MenuItem
                onClick={() => {
                  openNumberDialog({
                    title: "Move to position",
                    onChange: (value) => {
                      const numValue = Number(value)
                      if (!isNaN(numValue) && numValue > 0) {
                        submitMoveResource({
                          currentPosition: props.index! + 1,
                          newPosition: numValue,
                          resourceId: props.resource.id!,
                          tagId: props.resource.tag?.id!,
                        })
                      } else {
                        alert("Invalid position number")
                      }
                    },
                  })
                }}
              >
                <ListItemIcon>
                  <IoMdMove />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  Move to position
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleMoveToFirst}>
                <ListItemIcon>
                  <MdVerticalAlignTop />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  Move to first
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleMoveToLast}>
                <ListItemIcon>
                  <MdVerticalAlignBottom />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  Move to last
                </Typography>
              </MenuItem>
            </>
          )}

          <Divider />
          <MenuItem
            onClick={() => {
              handleCloseMore()
              handleDeleteResource(props.resource.id ?? 0)
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

// PE 1/3 - stop using this if possible
const useStyles = makeStyles<Theme>((theme) => ({
  listItemIcon: {
    width: 16,
  },
}))

export default ResourceMoreIcon
