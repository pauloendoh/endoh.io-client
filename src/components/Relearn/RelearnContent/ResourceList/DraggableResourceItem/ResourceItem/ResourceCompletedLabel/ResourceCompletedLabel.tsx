import DoneIcon from "@material-ui/icons/Done";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import React from "react";
import TimeAgo from "react-timeago";

interface Props {
  completedAt: string;
}

function ResourceCompletedLabel(props: Props) {
  return (
    <FlexVCenter>
      <DoneIcon /> <TimeAgo date={props.completedAt} live={false} />
    </FlexVCenter>
  );
}

export default ResourceCompletedLabel;
