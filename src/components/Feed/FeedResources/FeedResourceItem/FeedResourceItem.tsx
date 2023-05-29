import StarRateIcon from "@mui/icons-material/StarRate"
import { Box, Link, Paper, Typography } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import ProfilePicture from "components/_UI/ProfilePicture/ProfilePicture"
import ResourceThumbnail from "components/_common/ResourceThumbnail/ResourceThumbnail"
import { Link as RouterLink } from "react-router-dom"
import ReactTimeago from "react-timeago"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"
import { ratingLabels } from "utils/domain/relearn/resources/ratingLabels"
import { useGetColorByRating } from "utils/relearn/getColorByRating"
import { urls } from "utils/urls"
import SaveFeedResourceButton from "../SaveFeedResourceButton/SaveFeedResourceButton"

interface Props {
  feedResource: FeedResourceDto
}

const FeedResourceItem = ({ feedResource, ...props }: Props) => {
  const color = useGetColorByRating(feedResource.rating)

  return (
    <Paper
      key={feedResource.id}
      style={{ marginBottom: 16, padding: 16, marginRight: 8 }}
    >
      <FlexVCenter>
        <ProfilePicture
          pictureUrl={feedResource.user.profile.pictureUrl}
          username={feedResource.user.username}
          size={32}
          isLink
        />

        <Box ml={1}>
          <Link
            variant="button"
            color="inherit"
            component={RouterLink}
            to={urls.pages.user.index(feedResource.user.username)}
          >
            {feedResource.user.username}
          </Link>
        </Box>
      </FlexVCenter>
      <Box mt={1}>
        <Flex>
          <ResourceThumbnail
            linkable={true}
            resourceUrl={feedResource.url}
            thumbnailSrc={feedResource.thumbnail}
            width={75}
          />

          <Box ml={1} width="100%">
            <Typography>{feedResource.title}</Typography>
            <Box>
              <Link href={feedResource.url} target="_blank">
                <Typography variant="inherit">{feedResource.url}</Typography>
              </Link>
            </Box>
            <FlexVCenter mt={1}>
              <ReactTimeago date={feedResource.completedAt} live={false} />
              <FlexVCenter ml="auto">
                <FlexVCenter
                  style={{
                    width: 100,
                    color,
                  }}
                >
                  <StarRateIcon />

                  <Box>
                    {feedResource.rating} - {ratingLabels[feedResource.rating]}
                  </Box>
                </FlexVCenter>
                <FlexVCenter>
                  <SaveFeedResourceButton feedResource={feedResource} />
                </FlexVCenter>
              </FlexVCenter>
            </FlexVCenter>
          </Box>
        </Flex>
      </Box>
    </Paper>
  )
}

export default FeedResourceItem
