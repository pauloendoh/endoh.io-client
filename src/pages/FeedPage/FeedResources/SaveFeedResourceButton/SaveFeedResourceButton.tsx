import { Box, Button } from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter";
import {
  newResourceDto,
  ResourceDto,
} from "../../../../interfaces/dtos/relearn/ResourceDto";
import { editResource } from "../../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../../store/store";
import { FeedResourceDto } from "../../../../types/domain/feed/FeedResourceDto";

const SaveFeedResourceButton = (props: Props) => {
  const handleClick = () => {
    const resource = newResourceDto();
    const { feedResource } = props;

    resource.fromResourceId = feedResource.id;
    resource.title = feedResource.title;
    resource.url = feedResource.url;
    resource.thumbnail = feedResource.thumbnail;

    props.editResource(resource);
  };

  return (
    <Button onClick={handleClick}>
      <FlexVCenter>
        <PlaylistAddIcon />
        <Box ml={1}>Save</Box>
      </FlexVCenter>
    </Button>
  );
};

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editResource: (resource: ResourceDto) => dispatch(editResource(resource)),
});

interface OwnProps {
  feedResource: FeedResourceDto;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveFeedResourceButton);
