import ScheduleIcon from "@mui/icons-material/Schedule"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { validateEstimatedTime } from "../../../../../../../utils/relearn/validateEstimatedTime"

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
  )
}

type Props = {
  duration: string
}
export default ResourceDurationLabel
