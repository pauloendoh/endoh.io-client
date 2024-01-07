import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { MdSort } from "react-icons/md"
import useSortProblemsByWeightMutation from "../../../../../hooks/BigDecisions/DecisionTable/useSortProblemsByWeightMutation"
import { DecisionTableDto } from "../../../../../types/domain/big-decisions/DecisionTableDto"

function SortWeightMenuIcon(props: { table: DecisionTableDto }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }

  const sortMutation = useSortProblemsByWeightMutation()

  //   const { openDecisionDialog, openConfirmDialog } = useDialogsStore()

  return (
    <Box>
      <IconButton
        id="sort-problems-weight-icon"
        size="small"
        aria-label="sort-problems-weight-icon"
        onClick={(e) => {
          e.preventDefault()
          openMenu(e)
        }}
      >
        <MdSort />
      </IconButton>

      <Menu
        id="sort-problems-weight-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(e) => {
          // const event = e as any
          closeMenu()
        }}
      >
        <MenuItem
          onClick={() => {
            sortMutation.mutate({ tableId: props.table.id!!, order: "asc" })
            closeMenu()
          }}
        >
          Ascending
        </MenuItem>

        <MenuItem
          onClick={() => {
            sortMutation.mutate({ tableId: props.table.id!!, order: "desc" })
            closeMenu()
          }}
        >
          Descending
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default SortWeightMenuIcon
