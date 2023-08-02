import { Box } from "@mui/material"
import useFeedResourcesQuery from "hooks/react-query/feed/useFeedResourcesQuery"
import { Virtuoso } from "react-virtuoso"
import Flex from "../../_UI/Flexboxes/Flex"
import FeedResourceItem from "../FeedCompletedResources/FeedResourceItem/FeedResourceItem"

const FeedBookmarkedResources = () => {
  const { data: resources } = useFeedResourcesQuery("bookmarked")

  return (
    <Box pr={4} pl={1} mb={10}>
      <Flex justifyContent="flex-end" mb={2}></Flex>

      {!!resources && (
        <Virtuoso
          useWindowScroll
          totalCount={resources.length}
          itemContent={(index) => (
            <Box mb={2}>
              <FeedResourceItem feedResource={resources[index]} />
            </Box>
          )}
        />
      )}
    </Box>
  )
}

export default FeedBookmarkedResources
