import LabelIcon from "@mui/icons-material/Label"
import { Box, ListItem, makeStyles, Typography } from "@mui/material"
import ListItemText from "@mui/material/ListItemText"
import { Link } from "react-router-dom"
import useProfileStore from "store/zustand/domain/useProfileStore"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import pageUrls from "../../../../utils/url/urls/pageUrls"
import Flex from "../../../_UI/Flexboxes/Flex"
import FlexHCenter from "../../../_UI/Flexboxes/FlexHCenter"

interface Props {
  tag: TagDto
  width: number
  username: string
  selectedTagId: string
}

// PE 3/3
const TagListItem = (props: Props) => {
  const classes = useStyles()
  const profileStore = useProfileStore()

  const getResourcesFromListId = (listId: number) => {
    return profileStore.resources.filter((r) => r.tag?.id === listId)
  }

  return (
    <ListItem
      button
      component={Link}
      to={pageUrls.user.tag(props.username, props.tag.id)}
      selected={Number(props.selectedTagId) === props.tag.id}
    >
      <ListItemText>
        <Flex>
          <LabelIcon style={{ color: props.tag.color }} />
          <Box ml={1} width={props.width - 90}>
            <Typography
              noWrap
              style={{ maxWidth: "inherit" }}
              title={props.tag.name}
            >
              {props.tag.name}
            </Typography>
          </Box>
        </Flex>
      </ListItemText>

      <FlexHCenter mt={0.5} width={24}>
        <Typography className={classes.resourcesCount}>
          {getResourcesFromListId(props.tag.id).length}
        </Typography>
      </FlexHCenter>
    </ListItem>
  )
}

const useStyles = makeStyles((theme) => ({
  resourcesCount: {
    fontSize: 12,
    color: theme.palette.grey[400],
  },
}))

export default TagListItem
