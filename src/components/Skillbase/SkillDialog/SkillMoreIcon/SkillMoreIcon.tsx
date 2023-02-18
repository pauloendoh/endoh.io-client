import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import DeleteIcon from "@mui/icons-material/Delete"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {
  createStyles,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"
import React from "react"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useDialogsStore from "store/zustand/useDialogsStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { SkillDto } from "../../../../types/domain/skillbase/SkillDto"
import { IdsDto } from "../../../../types/domain/_common/IdsDto"
import myAxios from "../../../../utils/consts/myAxios"

interface Props {
  skillId: number
  afterDelete: () => void
}

// PE 2/3 - MenuItem could be shorter?
function SkillMoreIcon(props: Props) {
  const classes = useStyles()

  const { removeSkills } = useSkillbaseStore()
  const { setSuccessMessage } = useSnackbarStore()
  const { openConfirmDialog } = useDialogsStore()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorEl(null) // avoids error "The `anchorEl` prop provided to the component is invalid"
  }

  // handleDelete would be better?
  const handleDelete = (id: number) => {
    openConfirmDialog({
      title: "Confirm delete?",
      onConfirm: () => {
        myAxios
          .delete<SkillDto[]>(urls.api.skillbase.skill, {
            headers: {}, // why is this?
            data: { ids: [id] } as IdsDto,
          })
          .then((res) => {
            removeSkills([id])
            setSuccessMessage("Skill deleted successfully!")
            props.afterDelete()
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
            handleDelete(props.skillId)
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

export default SkillMoreIcon
