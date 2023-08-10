import { Box } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import MinRatingButton from "components/_common/MinRatingButton/MinRatingButton"
import useFeedResourcesQuery from "hooks/react-query/feed/useFeedResourcesQuery"
import { Virtuoso } from "react-virtuoso"
import FeedResourceItem from "../FeedCompletedResources/FeedResourceItem/FeedResourceItem"

const FeedBookmarkedResources = () => {
  const { data: resources } = useFeedResourcesQuery("bookmarked")

  return (
    <Box>
      <Flex justifyContent="flex-end" mb={2}>
        <MinRatingButton onChange={(val) => {}} value={0} />
      </Flex>

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
