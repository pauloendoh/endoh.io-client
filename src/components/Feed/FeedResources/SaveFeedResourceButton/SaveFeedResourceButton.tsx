import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import { Box, Button } from "@mui/material"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { editResource } from "../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../store/store"
import { FeedResourceDto } from "../../../../types/domain/feed/FeedResourceDto"
import {
  newResourceDto,
  ResourceDto,
} from "../../../../types/domain/relearn/ResourceDto"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"

const SaveFeedResourceButton = (props: Props) => {
  const handleClick = () => {
    const resource = newResourceDto()
    const { feedResource } = props

    resource.fromResourceId = feedResource.id
    resource.title = feedResource.title
    resource.url = feedResource.url
    resource.thumbnail = feedResource.thumbnail

    props.editResource(resource)
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

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) => dispatch(editResource(resource)),
})

interface OwnProps {
  feedResource: FeedResourceDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveFeedResourceButton)
