import { Box } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../store/store";
import { ResourceDto } from "../../../types/domain/relearn/ResourceDto";
import FeedResourceItem from "./FeedResourceItem/FeedResourceItem";

// PE 3/3
const FeedResources = (props: Props) => {
  return (
    <Box mt={3}>
      <Virtuoso
        style={{ height: 600 }}
        totalCount={props.resources.length}
        itemContent={(index) => (
          <FeedResourceItem resource={props.resources[index]} />
        )}
      />
    </Box>
  );
};

interface OwnProps {
  resources: ResourceDto[];
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeedResources);
