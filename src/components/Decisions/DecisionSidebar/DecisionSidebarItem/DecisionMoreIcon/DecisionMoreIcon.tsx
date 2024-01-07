import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { MdDelete, MdEdit, MdMoreHoriz } from "react-icons/md"
import useDialogsStore from "store/zustand/useDialogsStore"
import useDeleteDecisionMutation from "../../../../../hooks/BigDecisions/Decision/useDeleteDecisionMutation"
import { DecisionDto } from "../../../../../types/domain/big-decisions/DecisionDto"

interface Props {
  decision: DecisionDto
}

// PE 2/3 - MenuItem could be shorter?
function DecisionMoreIcon(props: Props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorEl(null) // avoids error "The `anchorEl` prop provided to the component is invalid"
  }

  const deleteDecisionMutation = useDeleteDecisionMutation()

  const { openDecisionDialog, openConfirmDialog } = useDialogsStore()

  const classes = useStyles()

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
        <MdMoreHoriz />
      </IconButton>

      <Menu
        id="decision-more-menu"
        anchorEl={anchorEl}
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
            <MdEdit fontSize="small" />
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
                deleteDecisionMutation.mutate(props.decision.id!!, {
                  onSuccess: () => {},
                })
              },
            })
          }}
          id="delete-decision-button"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <MdDelete fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap color="error">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  listItemIcon: {
    width: 16,
  },
}))

export default DecisionMoreIcon
