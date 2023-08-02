import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import { Box, Button } from "@mui/material"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import { FeedResourceDto } from "../../../../types/domain/feed/FeedResourceDto"
import { buildResourceDto } from "../../../../types/domain/relearn/ResourceDto"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"

interface Props {
  feedResource: FeedResourceDto
}

const SaveFeedResourceButton = (props: Props) => {
  const { setInitialValue: setEditingResource } = useResourceDialogStore()

  const handleClick = () => {
    const resource = buildResourceDto()
    const { feedResource } = props

    resource.fromResourceId = feedResource.id
    resource.title = feedResource.title
    resource.url = feedResource.url
    resource.thumbnail = feedResource.thumbnail

    setEditingResource(resource, { checkUrlOnOpen: true })
  }

  return (
    <Button onClick={handleClick} color="inherit">
      <FlexVCenter>
        <PlaylistAddIcon />
        <Box ml={1}>Save</Box>
      </FlexVCenter>
    </Button>
  )
}

export default SaveFeedResourceButton
