import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import { Box, Button } from "@mui/material"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import { FeedResourceDto } from "../../../../types/domain/feed/FeedResourceDto"
import { newResourceDto } from "../../../../types/domain/relearn/ResourceDto"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"

interface Props {
  feedResource: FeedResourceDto
}

const SaveFeedResourceButton = (props: Props) => {
  const { setEditingResource } = useRelearnStore()

  const handleClick = () => {
    const resource = newResourceDto()
    const { feedResource } = props

    resource.fromResourceId = feedResource.id
    resource.title = feedResource.title
    resource.url = feedResource.url
    resource.thumbnail = feedResource.thumbnail

    setEditingResource(resource)
  }

  return (
    <Button onClick={handleClick}>
      <FlexVCenter>
        <PlaylistAddIcon />
        <Box ml={1}>Save</Box>
      </FlexVCenter>
    </Button>
  )
}

export default SaveFeedResourceButton
