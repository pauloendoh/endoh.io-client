import {
  faGlobeAmericas,
  faLock,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import API from "../../../../consts/API"
import MY_AXIOS from "../../../../consts/MY_AXIOS"
import { TagDto } from "../../../../interfaces/dtos/relearn/TagDto"
import * as relearnActions from "../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../store/store"
import TagListItem from "../TagListItem/TagListItem"

function YourTagsLi(props: Props) {
  const classes = useStyles()
  const theme = useTheme()

  // PE 2/3 - change to tagsAreOpen
  const [openTags, setOpenTags] = useState(true)
  const handleClickTags = () => {
    setOpenTags(!openTags)
  }

  // PE 2/3 - melhor deixar o setTags no RelearnPage ? E chamar tudo de uma vez em uma request?
  useEffect(
    () => {
      MY_AXIOS.get<TagDto[]>(API.relearn.tag).then((res) => {
        props.setTags(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <React.Fragment>
      <ListItem button onClick={handleClickTags}>
        <ListItemIcon className={classes.listItemIcon}>
          <FontAwesomeIcon
            icon={props.type === "public" ? faGlobeAmericas : faLock}
          />
        </ListItemIcon>
        <ListItemText
          primary={props.type === "public" ? "Public Lists" : "Private Lists"}
        />
        {openTags ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openTags} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.lists.map((tag) => (
            <TagListItem key={tag.id} tag={tag} />
          ))}

          <ListItem
            button
            className={classes.nested}
            id="add-tag-button"
            onClick={() => {
              props.startNewTag(props.type === "private")
            }}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <FontAwesomeIcon
                icon={faPlus}
                color={theme.palette.primary.main}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                props.type === "public" ? "Add public list" : "Add private list"
              }
            />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    listItemIcon: {
      minWidth: 32,
    },
  })
)

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  startNewTag: (isPrivate: boolean) =>
    dispatch(relearnActions.startNewTag(isPrivate)),
})

interface OwnProps {
  type: "public" | "private"
  lists: TagDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(YourTagsLi)
