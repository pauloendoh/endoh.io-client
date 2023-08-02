import { faGlobeAmericas, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material"
import useGotItMutation from "hooks/react-query/got-it/useGotItMutation"
import useGotItQuery from "hooks/react-query/got-it/useGotItQuery"
import { useAxios } from "hooks/utils/useAxios"
import React, { useEffect, useMemo, useState } from "react"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import { urls } from "utils/urls"
import { TagDto, newTagDto } from "../../../../types/domain/relearn/TagDto"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import TagListItem from "../TagListItem/TagListItem"

interface Props {
  type: "public" | "private"
  tags: TagDto[]
}

function RelearnSidebarTagList(props: Props) {
  // PE 2/3 - change to tagsAreOpen
  const [openTags, setOpenTags] = useState(true)
  const handleClickTags = () => {
    setOpenTags(!openTags)
  }

  const axios = useAxios()

  const { setTags, setEditingTag } = useRelearnStore()

  // PE 2/3 - melhor deixar o setTags no RelearnPage ? E chamar tudo de uma vez em uma request?
  useEffect(
    () => {
      axios.get<TagDto[]>(urls.api.relearn.tag).then((res) => {
        setTags(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleAddTag = () => {
    const newTag = newTagDto()
    newTag.isPrivate = props.type === "private"
    setEditingTag(newTag)
  }

  const sortedTags = useMemo(
    () =>
      props.tags?.sort((a, b) => ((a.id || 0) > (b.id || 0) ? 1 : -1)) || [],
    [props.tags]
  )

  const { data: gotIt } = useGotItQuery()

  const theme = useTheme()

  const { mutate: submitGotIt } = useGotItMutation()

  return (
    <React.Fragment>
      <ListItem button onClick={handleClickTags}>
        <ListItemText>
          <FlexVCenter>
            {openTags ? <ExpandLess /> : <ExpandMore />}
            <Box mx={1}>
              {props.type === "public" ? "Public Tags" : "Private Tags"}
            </Box>

            <FontAwesomeIcon
              icon={props.type === "public" ? faGlobeAmericas : faLock}
            />
          </FlexVCenter>
        </ListItemText>

        <IconButton
          onClick={(e) => {
            e.stopPropagation()
            handleAddTag()
            submitGotIt("createTag")
          }}
          size="small"
          id={`add-${props.type}-tag`}
        >
          <AddIcon />
        </IconButton>
      </ListItem>

      <Collapse in={openTags} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sortedTags.map((tag) => (
            <TagListItem key={tag.id} tag={tag} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default RelearnSidebarTagList
