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
import useDeleteTableMutation from "../../../../../hooks/BigDecisions/DecisionTable/useDeleteTableMutation"
import { DecisionTableDto } from "../../../../../types/domain/big-decisions/DecisionTableDto"

interface Props {
  table: DecisionTableDto
}

function TableMoreIcon(props: Props) {
  const classes = useStyles()
  const { openConfirmDialog } = useDialogsStore()

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
        <MdMoreHoriz />
      </IconButton>

      <Menu
        id="decision-table-more-menu"
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
            openDecisionTableDialog(props.table)
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
              title: "Confirm delete?",
              onConfirm: () => {
                deleteTableMutation.mutate(props.table)
              },
            })
          }}
          id="delete-decision-table-button"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <MdDelete fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
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

export default TableMoreIcon
