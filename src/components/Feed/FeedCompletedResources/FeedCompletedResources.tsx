import { Box } from "@mui/material"
import useLastSeenResourceQuery from "hooks/react-query/feed/last-seen-resource/useLastSeenResourceQuery"
import useUpdateLastSeenResourceMutation from "hooks/react-query/feed/last-seen-resource/useUpdateLastSeenResourceMutation"
import useFeedResourcesQuery from "hooks/react-query/feed/useFeedResourcesQuery"
import { useEffect, useMemo, useState } from "react"
import { Virtuoso } from "react-virtuoso"
import Flex from "../../_UI/Flexboxes/Flex"
import MinRatingButton from "../../_common/MinRatingButton/MinRatingButton"
import FeedResourceItem from "./FeedResourceItem/FeedResourceItem"

const FeedCompletedResources = () => {
  const [minRating, setMinRating] = useState(0)

  const { data: resources } = useFeedResourcesQuery("completed")

  const filteredResources = useMemo(
    () => resources?.filter((r) => r.rating >= minRating) || [],
    [resources, minRating]
  )

  const { data: lastSeenResource } = useLastSeenResourceQuery()
  const { mutate: updateLastSeenResource } = useUpdateLastSeenResourceMutation()

  useEffect(() => {
    const lastResource = resources?.[0]
    if (lastResource) {
      if (!lastSeenResource?.lastSeenAt) {
        updateLastSeenResource(lastResource.completedAt)
        return
      }

      if (lastResource.completedAt > lastSeenResource?.lastSeenAt)
        updateLastSeenResource(lastResource.completedAt)
    }
  }, [resources?.[0], lastSeenResource])

  return (
    <Box pr={4} pl={1} mb={10}>
      <Flex justifyContent="flex-end" mb={2}>
        <MinRatingButton
          onChange={(val) => setMinRating(val || 0)}
          value={minRating}
        />
      </Flex>

      <Virtuoso
        useWindowScroll
        totalCount={filteredResources.length}
        itemContent={(index) => (
          <Box mb={2}>
            <FeedResourceItem feedResource={filteredResources[index]} />
          </Box>
        )}
      />
    </Box>
  )
}

export default FeedCompletedResources
