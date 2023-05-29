import { Box } from "@mui/material"
import useFeedResourcesQuery from "hooks/react-query/feed/useFeedResourcesQuery"
import { useEffect, useState } from "react"
import { Virtuoso } from "react-virtuoso"
import { FeedResourceDto } from "../../../types/domain/feed/FeedResourceDto"
import Flex from "../../_UI/Flexboxes/Flex"
import MinRatingButton from "../../_common/MinRatingButton/MinRatingButton"
import FeedResourceItem from "./FeedResourceItem/FeedResourceItem"

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

  return (
    <Box pr={4}>
      <Flex justifyContent="flex-end" mb={2}>
        <MinRatingButton onChange={setMinRating} value={minRating} />
      </Flex>

      <Virtuoso
        style={{ height: "calc(100vh - 156px)" }}
        totalCount={filteredResources.length}
        itemContent={(index) => (
          <FeedResourceItem feedResource={filteredResources[index]} />
        )}
      />
    </Box>
  )
}

export default FeedResources
