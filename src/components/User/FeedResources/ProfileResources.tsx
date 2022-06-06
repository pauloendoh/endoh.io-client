import { Box } from "@material-ui/core";
import React from "react";
import { Virtuoso } from "react-virtuoso";
import { ResourceDto } from "../../../types/domain/relearn/ResourceDto";
import ProfileResourceItem from "./ProfileResourceItem/ProfileResourceItem";

interface Props {
  resources: ResourceDto[];
}

// PE 3/3
const ProfileResources = (props: Props) => {
  return (
    <Box mt={3}>
      <Virtuoso
        style={{ height: "calc(100vh - 100px)" }}
        totalCount={props.resources.length}
        itemContent={(index) => (
          <ProfileResourceItem resource={props.resources[index]} />
        )}
      />
    </Box>
  );
};

export default ProfileResources;
