import { Box } from "@material-ui/core";
import React from "react";
import { Virtuoso } from "react-virtuoso";
import { ResourceDto } from "../../../types/domain/relearn/ResourceDto";
import FeedResourceItem from "./FeedResourceItem/FeedResourceItem";

interface Props {
  resources: ResourceDto[];
}

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

export default FeedResources;
