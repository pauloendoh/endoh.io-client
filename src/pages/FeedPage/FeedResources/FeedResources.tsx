import { Box, Link, Paper, Typography } from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Dispatch } from "redux";
import { ratingLabels } from "utils/domain/relearn/resources/ratingLabels";
import MinRatingButton from "../../../components/resources/MinRatingButton/MinRatingButton";
import ResourceThumbnail from "../../../components/resources/ResourceThumbnail/ResourceThumbnail";
import Flex from "../../../components/shared/Flexboxes/Flex";
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter";
import ProfilePicture from "../../../components/shared/ProfilePicture/ProfilePicture";
import { ApplicationState } from "../../../store/store";
import { FeedResourceDto } from "../../../types/domain/feed/FeedResourceDto";
import PATHS from "../../../utils/consts/PATHS";
import { getColorByRating } from "../../../utils/relearn/getColorByRating";
import SaveFeedResourceButton from "./SaveFeedResourceButton/SaveFeedResourceButton";

// PE 3/3
const FeedResources = (props: Props) => {
  const [filteredResources, setFilteredResources] = useState<FeedResourceDto[]>(
    []
  );
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const minResources = props.resources.filter((r) => r.rating >= minRating);
    setFilteredResources(minResources);
  }, [props.resources, minRating]);

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
                to={PATHS.user.index(resource.user.username)}
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

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.feed.resources,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeedResources);
