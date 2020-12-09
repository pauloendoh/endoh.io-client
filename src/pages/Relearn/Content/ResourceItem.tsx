import { Box } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Flex from "../../../components/shared/Flexboxes/Flex";
import { ResourceDto } from "../../../dtos/relearn/ResourceDto";
import { ApplicationState } from "../../../store/store";

function ResourceItem(props: Props) {
  return (
    <Flex p={2}>
      {props.resource.thumbnail?.length > 0 && <Box>Thumbnail :D</Box>}
      <Box flexGrow={1}>
        <Box>{props.resource.title}</Box>
        <Box>{props.resource.url}</Box>

        <Flex>
          <Box>{props.resource.estimatedTime}</Box>
          <Box>{props.resource.dueDate}</Box>
          <Box ml="auto">Rate | Delete</Box>
        </Flex>
      </Box>
    </Flex>
  );
}

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

interface OwnProps {
  resource: ResourceDto;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResourceItem);
