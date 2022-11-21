import { faGlobeAmericas, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import useGotItMutation from "hooks/react-query/got-it/useGotItMutation"
import useGotItQuery from "hooks/react-query/got-it/useGotItQuery"
import React, { useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { urls } from "utils/urls"
import * as relearnActions from "../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../store/store"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import myAxios from "../../../../utils/consts/myAxios"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import TagListItem from "../TagListItem/TagListItem"

function RelearnSidebarTagList(props: Props) {
  // PE 2/3 - change to tagsAreOpen
  const [openTags, setOpenTags] = useState(true)
  const handleClickTags = () => {
    setOpenTags(!openTags)
  }

  // PE 2/3 - melhor deixar o setTags no RelearnPage ? E chamar tudo de uma vez em uma request?
  useEffect(
    () => {
      myAxios.get<TagDto[]>(urls.api.relearn.tag).then((res) => {
        props.setTags(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleAddTag = () => {
    props.startNewTag(props.type === "private")
  }

  const sortedTags = useMemo(() => {
    if (props.tags?.length === 0) return []
    return props.tags.sort((a, b) => (a.id > b.id ? 1 : -1))
  }, [props.tags])

  const { data: gotIt } = useGotItQuery()

  const shouldShowtooltip = useMemo(() => {
    if (props.type === "public" || !gotIt || gotIt.createTag) return false

    return true
  }, [gotIt?.createTag, props.type])

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
        <Tooltip
          open={shouldShowtooltip}
          arrow
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                backgroundColor: theme.palette.grey[800],
              },
              "& .MuiTooltip-arrow": {
                "&::before": {
                  backgroundColor: theme.palette.grey[800],
                },
              },
            },
          }}
          title={
            <Box p={1}>
              <Flex>
                Add a learning tag. E.g.: Programming, data science, design...
              </Flex>
              <Flex justifyContent="end">
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    submitGotIt("createTag")
                  }}
                >
                  Got it
                </Button>
              </Flex>
            </Box>
          }
        >
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
        </Tooltip>
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

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  startNewTag: (isPrivate: boolean) =>
    dispatch(relearnActions.startNewTag(isPrivate)),
})

interface OwnProps {
  type: "public" | "private"
  tags: TagDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelearnSidebarTagList)
