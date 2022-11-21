import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

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
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import useDialogsStore from "store/zustand/useDialogsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import {
  editResource,
  removeResource,
  setResources,
} from "../../../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../../../store/store"
import { ResourceDto } from "../../../../../../types/domain/relearn/ResourceDto"
import myAxios from "../../../../../../utils/consts/myAxios"

// PE 1/3
function ResourceMoreIcon(props: Props) {
  const classes = useStyles()
  const { openConfirmDialog } = useDialogsStore()

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

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

  const handleDeleteResource = (id: number) => {
    openConfirmDialog({
      title: "Delete resource?",
      onConfirm: () => {
        myAxios.delete(`${urls.api.relearn.resource}/${id}`).then((res) => {
          setSuccessMessage("Resource deleted!")

          props.removeResource(id)
        })
      },
    })
  }

  const duplicateResource = (resource: ResourceDto) => {
    myAxios
      .post<ResourceDto[]>(
        `${urls.api.relearn.resourceDuplicate}/${resource.id}`
      )
      .then((res) => {
        setSuccessMessage("Resource duplicated!")

        props.setResources(res.data)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errors[0].message)
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
              props.editResource(props.resource)
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

          <MenuItem
            onClick={() => {
              handleCloseMore()
              handleDeleteResource(props.resource.id)
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

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) => dispatch(editResource(resource)),
  removeResource: (id: number) => dispatch(removeResource(id)),

  setResources: (resources: ResourceDto[]) => dispatch(setResources(resources)),
})

interface OwnProps {
  resource: ResourceDto
  isHovered: boolean
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ResourceMoreIcon)
