import { IconButton, Typography } from "@mui/material"

import { Menu, MenuItem } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import React from "react"
import { MdDelete, MdMoreHoriz } from "react-icons/md"
import { ResourceDto } from "../../../../../types/domain/relearn/ResourceDto"

interface Props {
  resource: ResourceDto
  onClickDelete: () => void
}

function ResourceDialogMoreMenu(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MdMoreHoriz />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={props.onClickDelete}
          sx={(theme) => ({
            color: theme.palette.error.main,
          })}
        >
          <FlexVCenter gap={1}>
            <MdDelete />
            <Typography>Delete resource</Typography>
          </FlexVCenter>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ResourceDialogMoreMenu
