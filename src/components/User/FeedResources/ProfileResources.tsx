import { Box } from "@mui/material"
import FeedResourceItem from "components/Feed/FeedCompletedResources/FeedResourceItem/FeedResourceItem"
import { Virtuoso } from "react-virtuoso"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"

interface Props {
  resources: FeedResourceDto[]
}

// PE 3/3
const ProfileResources = (props: Props) => {
  return (
    <Box mt={3}>
      <Virtuoso
        useWindowScroll
        totalCount={props.resources.length}
        itemContent={(index) => (
          <Box mb={2}>
            <FeedResourceItem feedResource={props.resources[index]} />
          </Box>
        )}
      />
    </Box>
  )
}

export default ProfileResources
