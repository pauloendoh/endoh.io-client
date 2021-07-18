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
import { DecisionTableDto } from "../../../../../dtos/BigDecisions/DecisionTableDto"
import useDeleteTableMutation from "../../../../../hooks/BigDecisions/DecisionTable/useDeleteTableMutation"
import useDialogsStore from "../../../../../store/zustand/useDialogsStore"

interface Props {
  table: DecisionTableDto
}

function TableMoreIcon(props: Props) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorEl(null) // avoids error "The `anchorEl` prop provided to the component is invalid"
  }

  const deleteTableMutation = useDeleteTableMutation()

  const { openDecisionTableDialog } = useDialogsStore()

  return (
    <Box>
      <IconButton
        id="decision-table-more-icon"
        size="small"
        aria-label="decision-table-more-icon"
        onClick={(e) => {
          e.preventDefault()
          handleOpenMore(e)
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="decision-table-more-menu"
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
            openDecisionTableDialog(props.table)
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
            deleteTableMutation.mutate(props.table)
          }}
          id="delete-decision-table-button"
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

export default TableMoreIcon
