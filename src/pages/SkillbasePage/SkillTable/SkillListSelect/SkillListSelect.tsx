import { faSortDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, makeStyles, Menu, MenuItem } from "@material-ui/core"
import LabelIcon from "@material-ui/icons/Label"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter"
import PATHS from "../../../../consts/PATHS"
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto"
import { ApplicationState } from "../../../../store/store"

// PE 2/3 - Not so easy to understand the classes logic
const SkillListSelect = (props: Props) => {
  const classes = useStyles()
  const location = useLocation()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [listId, setListId] = useState<number>(null) // null = "show all", 0 = "unlisted"
  const [list, setList] = useState<TagDto>(null)

  useEffect(() => {
    const { pathname } = location

    if (pathname === PATHS.skillbase.index) {
      setListId(null)
    } else if (pathname.startsWith(PATHS.skillbase.unlisted)) {
      setListId(0)
    } else if (pathname.startsWith(PATHS.skillbase.list + "/")) {
      const listId = Number(pathname.split("/").pop())
      if (listId) {
        setListId(listId)
        setList(props.allTags.find((t) => t.id === listId))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, props.allTags])

  return (
    <Box>
      <Button onClick={handleClick} fullWidth aria-haspopup="true">
        <FlexVCenter>
          <Box ml={1} mr={2}>
            {listId === null && "All skills"}
            {listId === 0 && "Unlisted"}
            {listId > 0 && list && (
              <FlexVCenter>
                <LabelIcon style={{ color: list.color }} />
                <Box ml={1}>{list.name}</Box>
              </FlexVCenter>
            )}
          </Box>
          <Box mb="5px">
            <FontAwesomeIcon icon={faSortDown} />
          </Box>
        </FlexVCenter>
      </Button>

      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* All skills */}
        <MenuItem
          component={Link}
          to={PATHS.skillbase.index}
          onClick={handleClose}
          selected={listId === null}
        >
          <FlexVCenter>
            <Box>All skills</Box>
          </FlexVCenter>
        </MenuItem>

        {/* Unlisted */}
        <MenuItem
          component={Link}
          to={PATHS.skillbase.unlisted}
          onClick={handleClose}
          selected={listId === 0}
        >
          <FlexVCenter>
            <Box>Unlisted</Box>
          </FlexVCenter>
        </MenuItem>

        {/* Lists */}
        {props.allTags.map((tag) => (
          <MenuItem
            key={tag.id}
            component={Link}
            to={PATHS.skillbase.list + "/" + tag.id}
            onClick={handleClose}
            selected={listId === tag.id}
          >
            <FlexVCenter>
              <LabelIcon style={{ color: tag.color }} />

              <Box ml={1}>{tag.name}</Box>
            </FlexVCenter>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SkillListSelect)
