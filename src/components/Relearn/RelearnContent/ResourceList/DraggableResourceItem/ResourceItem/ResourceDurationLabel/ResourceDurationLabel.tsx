import ScheduleIcon from "@material-ui/icons/Schedule";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import React from "react";
import { validateEstimatedTime } from "../../../../../../../utils/relearn/validateEstimatedTime";

function ResourceDurationLabel(props: Props) {
  return (
    <>
      {validateEstimatedTime(props.duration) && (
        <FlexVCenter>
          <ScheduleIcon style={{ marginRight: 4 }} />
          {props.duration}
        </FlexVCenter>
      )}
    </>
  );
}

type Props = {
  duration: string;
};
export default ResourceDurationLabel;
