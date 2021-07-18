import {
  Box,
  createStyles,
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import React, { useState } from "react"
import { DecisionDto } from "../../../../../dtos/BigDecisions/DecisionDto"
import useDeleteDecisionMutation from "../../../../../hooks/BigDecisions/Decision/useDeleteDecisionMutation"
import useDialogsStore from "../../../../../store/zustand/useDialogsStore"

interface Props {
  decision: DecisionDto
}

// PE 2/3 - MenuItem could be shorter?
function DecisionMoreIcon(props: Props) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorEl(null) // avoids error "The `anchorEl` prop provided to the component is invalid"
  }

  const deleteDecisionMutation = useDeleteDecisionMutation()

  const { openDecisionDialog, openConfirmDialog } = useDialogsStore()

  return (
    <Box>
      <IconButton
        id="decision-more-icon"
        size="small"
        aria-label="decision-more-icon"
        onClick={(e) => {
          e.preventDefault()
          handleOpenMore(e)
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="decision-more-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e) => {
          // const event = e as any
          handleCloseMore()
        }}
      >
        <MenuItem
          onClick={(e) => {
            e.preventDefault()
            openDecisionDialog(props.decision)
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
            openConfirmDialog({
              title: "Delete decision?",
              onConfirm: () => {
                deleteDecisionMutation.mutate(props.decision.id, {
                  onSuccess: () => {},
                })
              },
            })
          }}
          id="delete-decision-button"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemIcon: {
      width: 16,
    },
  })
)

export default DecisionMoreIcon
