import { faSortDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import LabelIcon from "@material-ui/icons/Label"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../../components/shared/Flexboxes/Flex"
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
    } else if (pathname.startsWith(PATHS.skillbase.untagged)) {
      setListId(0)
    } else if (pathname.startsWith(PATHS.skillbase.tag + "/")) {
      const listId = Number(pathname.split("/").pop())
      if (listId) {
        setListId(listId)
        setList(props.allTags.find((t) => t.id === listId))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, props.allTags])

  return (
    <Flex justifyContent="flex-end">
      <Button
        onClick={handleClick}
        aria-haspopup="true"
        className={classes.button}
      >
        <Flex>
          <Box ml={1} mr={2}>
            {listId === null && "All skills"}
            {listId === 0 && "Untagged"}
            {listId > 0 && list && (
              <Flex>
                <LabelIcon style={{ color: list.color }} />
                <Box ml={1} textAlign="left">
                  {list.name}
                </Box>
              </Flex>
            )}
          </Box>
          <Box position="relative" bottom={2}>
            <FontAwesomeIcon icon={faSortDown} />
          </Box>
        </Flex>
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
          to={PATHS.skillbase.untagged}
          onClick={handleClose}
          selected={listId === 0}
        >
          <FlexVCenter>
            <Box>Untagged</Box>
          </FlexVCenter>
        </MenuItem>

        {/* Lists */}
        {props.allTags.map((tag) => (
          <MenuItem
            key={tag.id}
            component={Link}
            to={PATHS.skillbase.tag + "/" + tag.id}
            onClick={handleClose}
            selected={listId === tag.id}
          >
            <Flex>
              <LabelIcon style={{ color: tag.color }} />

              <Box ml={1}>{tag.name}</Box>
            </Flex>
          </MenuItem>
        ))}
      </Menu>
    </Flex>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    width: 250,
  },
}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SkillListSelect)
