import { Box } from "@mui/material"
import useLastSeenResourceQuery from "hooks/react-query/feed/last-seen-resource/useLastSeenResourceQuery"
import useUpdateLastSeenResourceMutation from "hooks/react-query/feed/last-seen-resource/useUpdateLastSeenResourceMutation"
import useFeedResourcesQuery from "hooks/react-query/feed/useFeedResourcesQuery"
import { useEffect, useState } from "react"
import { Virtuoso } from "react-virtuoso"
import { FeedResourceDto } from "../../../types/domain/feed/FeedResourceDto"
import Flex from "../../_UI/Flexboxes/Flex"
import MinRatingButton from "../../_common/MinRatingButton/MinRatingButton"
import FeedResourceItemV2 from "./FeedResourceItemV2/FeedResourceItemV2"

const FeedResources = () => {
  // PE 1/3 - useMemo
  const [filteredResources, setFilteredResources] = useState<FeedResourceDto[]>(
    []
  )
  const [minRating, setMinRating] = useState(0)

  const { data: resources } = useFeedResourcesQuery()

  useEffect(() => {
    if (resources?.length > 0) {
      const minResources = resources.filter((r) => r.rating >= minRating)
      setFilteredResources(minResources)
    }
  }, [resources, minRating])

  const { data: lastSeenResource } = useLastSeenResourceQuery()
  const { mutate: updateLastSeenResource } = useUpdateLastSeenResourceMutation()

  useEffect(() => {
    const lastResource = resources?.[0]
    if (lastResource) {
      if (!lastSeenResource.lastSeenAt) {
        updateLastSeenResource(lastResource.completedAt)
        return
      }

      if (lastResource.completedAt > lastSeenResource.lastSeenAt)
        updateLastSeenResource(lastResource.completedAt)
    }
  }, [resources?.[0], lastSeenResource])

  return (
    <Box pr={4}>
      <Flex justifyContent="flex-end" mb={2}>
        <MinRatingButton onChange={setMinRating} value={minRating} />
      </Flex>

      <Virtuoso
        style={{ height: "calc(100vh - 180px)" }}
        totalCount={filteredResources.length}
        itemContent={(index) => (
          <Box mb={2}>
            <FeedResourceItemV2 feedResource={filteredResources[index]} />
          </Box>
        )}
      />
    </Box>
  )
}

export default FeedResources
