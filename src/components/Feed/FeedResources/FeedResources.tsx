import StarRateIcon from "@mui/icons-material/StarRate"
import { Box, Link, Paper, Typography } from "@mui/material"
import useFeedResourcesQuery from "hooks/react-query/feed/useFeedResourcesQuery"
import { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import TimeAgo from "react-timeago"
import { Virtuoso } from "react-virtuoso"
import { ratingLabels } from "utils/domain/relearn/resources/ratingLabels"
import { FeedResourceDto } from "../../../types/domain/feed/FeedResourceDto"
import { getColorByRating } from "../../../utils/relearn/getColorByRating"
import pageUrls from "../../../utils/url/urls/pageUrls"
import MinRatingButton from "../../_common/MinRatingButton/MinRatingButton"
import ResourceThumbnail from "../../_common/ResourceThumbnail/ResourceThumbnail"
import Flex from "../../_UI/Flexboxes/Flex"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture"
import SaveFeedResourceButton from "./SaveFeedResourceButton/SaveFeedResourceButton"

// PE 2/3
const FeedResources = () => {
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
          <Paper
            key={filteredResources[index].id}
            style={{ marginBottom: 16, padding: 16, marginRight: 8 }}
          >
            <FlexVCenter>
              <ProfilePicture
                pictureUrl={filteredResources[index].user.pictureUrl}
                username={filteredResources[index].user.username}
                size={32}
                isLink
              />

              <Box ml={1}>
                <Link
                  variant="button"
                  color="inherit"
                  component={RouterLink}
                  to={pageUrls.user.index(
                    filteredResources[index].user.username
                  )}
                >
                  {filteredResources[index].user.username}
                </Link>
              </Box>
            </FlexVCenter>
            <Box mt={1}>
              <Flex>
                <ResourceThumbnail
                  linkable={true}
                  resourceUrl={filteredResources[index].url}
                  thumbnailSrc={filteredResources[index].thumbnail}
                  width={75}
                />

                <Box ml={1} width="100%">
                  <Typography>{filteredResources[index].title}</Typography>
                  <Box>
                    <Link href={filteredResources[index].url} target="_blank">
                      <Typography variant="inherit">
                        {filteredResources[index].url}
                      </Typography>
                    </Link>
                  </Box>
                  <FlexVCenter mt={1}>
                    <TimeAgo
                      date={filteredResources[index].completedAt}
                      live={false}
                    />
                    <FlexVCenter ml="auto">
                      <FlexVCenter
                        style={{
                          width: 100,
                          color: getColorByRating(
                            filteredResources[index].rating
                          ),
                        }}
                      >
                        <StarRateIcon />

                        <Box>
                          {filteredResources[index].rating} -{" "}
                          {ratingLabels[filteredResources[index].rating]}
                        </Box>
                      </FlexVCenter>
                      <FlexVCenter>
                        <SaveFeedResourceButton
                          feedResource={filteredResources[index]}
                        />
                      </FlexVCenter>
                    </FlexVCenter>
                  </FlexVCenter>
                </Box>
              </Flex>
            </Box>
          </Paper>
        )}
      />
    </Box>
  )
}

export default FeedResources
