import { Box, Link, Paper, Typography } from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import useFeedResourcesQuery from "hooks/react-query/feed/useFeedResourcesQuery";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TimeAgo from "react-timeago";
import { ratingLabels } from "utils/domain/relearn/resources/ratingLabels";
import { FeedResourceDto } from "../../../types/domain/feed/FeedResourceDto";
import { getColorByRating } from "../../../utils/relearn/getColorByRating";
import pageUrls from "../../../utils/url/urls/pageUrls";
import MinRatingButton from "../../_common/MinRatingButton/MinRatingButton";
import ResourceThumbnail from "../../_common/ResourceThumbnail/ResourceThumbnail";
import Flex from "../../_UI/Flexboxes/Flex";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";
import ProfilePicture from "../../_UI/ProfilePicture/ProfilePicture";
import SaveFeedResourceButton from "./SaveFeedResourceButton/SaveFeedResourceButton";

// PE 2/3
const FeedResources = () => {
  const [filteredResources, setFilteredResources] = useState<FeedResourceDto[]>(
    []
  );
  const [minRating, setMinRating] = useState(0);

  const { data: resources } = useFeedResourcesQuery();

  useEffect(() => {
    if (resources?.length > 0) {
      const minResources = resources.filter((r) => r.rating >= minRating);
      setFilteredResources(minResources);
    }
  }, [resources, minRating]);

  return (
    <Box pr={4}>
      <Flex justifyContent="flex-end">
        <MinRatingButton onChange={setMinRating} value={minRating} />
      </Flex>
      {filteredResources.map((resource) => (
        <Paper key={resource.id} style={{ marginBottom: 16, padding: 16 }}>
          <FlexVCenter>
            <ProfilePicture
              pictureUrl={resource.user.pictureUrl}
              username={resource.user.username}
              size={32}
              isLink
            />

            <Box ml={1}>
              <Link
                variant="button"
                color="inherit"
                component={RouterLink}
                to={pageUrls.user.index(resource.user.username)}
              >
                {resource.user.username}
              </Link>
            </Box>
          </FlexVCenter>
          <Box mt={1}>
            <Flex>
              <ResourceThumbnail
                linkable={true}
                resourceUrl={resource.url}
                thumbnailSrc={resource.thumbnail}
                width={75}
              />

              <Box ml={1} width="100%">
                <Typography>{resource.title}</Typography>
                <Box>
                  <Link href={resource.url} target="_blank">
                    <Typography variant="inherit">{resource.url}</Typography>
                  </Link>
                </Box>
                <FlexVCenter mt={1}>
                  <TimeAgo date={resource.completedAt} live={false} />
                  <FlexVCenter ml="auto">
                    <FlexVCenter
                      style={{
                        width: 100,
                        color: getColorByRating(resource.rating),
                      }}
                    >
                      <StarRateIcon />

                      <Box>
                        {resource.rating} - {ratingLabels[resource.rating]}
                      </Box>
                    </FlexVCenter>
                    <FlexVCenter>
                      <SaveFeedResourceButton feedResource={resource} />
                    </FlexVCenter>
                  </FlexVCenter>
                </FlexVCenter>
              </Box>
            </Flex>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default FeedResources;
