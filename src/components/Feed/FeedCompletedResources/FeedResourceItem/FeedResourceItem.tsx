import {
  Box,
  Divider,
  Link as MuiLink,
  Paper,
  Typography,
  useTheme,
} from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import ProfilePicture from "components/_UI/ProfilePicture/ProfilePicture"
import MyRouterLink from "components/_UI/link/MyRouterLink"
import ResourceThumbnail from "components/_common/ResourceThumbnail/ResourceThumbnail"
import useElementSize from "hooks/utils/useElementSize"
import { useMemo } from "react"
import { MdLock } from "react-icons/md"
import { Link as RouterLink } from "react-router-dom"
import { format } from "timeago.js"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"
import { hoverRatingLabels } from "utils/domain/relearn/resources/ratingLabels"
import { useGetColorByRating } from "utils/relearn/getColorByRating"
import { urls } from "utils/urls"
import SaveFeedResourceButton from "../SaveFeedResourceButton/SaveFeedResourceButton"

interface Props {
  feedResource: FeedResourceDto
}

const FeedResourceItem = ({ feedResource }: Props) => {
  const color = useGetColorByRating(feedResource.rating)

  const [paperRef, { width: paperWidth }] = useElementSize()

  const theme = useTheme()

  const verb = useMemo<"rated" | "bookmarked">(() => {
    if (!!feedResource.rating) {
      return "rated"
    }

    return "bookmarked"
  }, [feedResource.rating])

  const timeagoValue = useMemo(() => {
    return new Date(
      verb === "bookmarked" ? feedResource.createdAt : feedResource.completedAt
    )
  }, [feedResource.createdAt, feedResource.completedAt, verb])

  return (
    <Box>
      <Paper
        ref={paperRef}
        sx={{
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -20,
            top: 16,
          }}
        >
          <ProfilePicture
            pictureUrl={feedResource.user.profile.pictureUrl}
            username={feedResource.user.username}
            size={40}
            isLink
          />
        </div>
        <FlexCol p={2} pl={4} gap={1} pb={1}>
          <FlexVCenter>
            <RouterLink
              to={urls.pages.user.index(feedResource.user.username)}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: 600,
              }}
            >
              {feedResource.user.username}
            </RouterLink>
            &nbsp;{verb}&nbsp;&nbsp;
            {!!feedResource.rating && (
              <span
                style={{
                  color,
                  fontWeight: 500,
                }}
              >
                {feedResource.rating} - {hoverRatingLabels[feedResource.rating]}
                {feedResource.tag.isPrivate && (
                  <MdLock
                    style={{
                      position: "relative",
                      top: 1,
                      left: 4,
                    }}
                  />
                )}
              </span>
            )}
          </FlexVCenter>
          <Flex gap={1} justifyContent={"space-between"}>
            <FlexCol>
              <Typography>{feedResource.title}</Typography>
              <MuiLink href={feedResource.url} target="_blank">
                <Typography
                  noWrap
                  sx={{
                    maxWidth: paperWidth - 200,
                  }}
                >
                  {feedResource.url}
                </Typography>
              </MuiLink>
              <FlexVCenter mt={1}>
                <Typography
                  variant="body2"
                  title={timeagoValue.toLocaleDateString()}
                >
                  {format(timeagoValue)}
                </Typography>

                <MyRouterLink
                  to={urls.pages.user.tag(
                    feedResource.user.username,
                    feedResource.tag.id
                  )}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 1,
                      background: theme.palette.grey[800],
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      maxWidth: 160,
                    }}
                    noWrap
                    title={feedResource.tag.name}
                  >
                    {feedResource.tag.name}
                  </Typography>
                </MyRouterLink>
              </FlexVCenter>
            </FlexCol>
            <Box>
              <ResourceThumbnail
                linkable={true}
                resourceUrl={feedResource.url}
                thumbnailSrc={feedResource.thumbnail}
                width={100}
                estimatedTime={feedResource.estimatedTime}
              />
            </Box>
          </Flex>

          {!!feedResource.publicReview && (
            <Typography
              sx={{
                mt: 1,
                whiteSpace: "pre-wrap",
                fontStyle: "italic",
              }}
            >
              {feedResource.publicReview}
            </Typography>
          )}

          {!!feedResource.privateNote && (
            <Typography
              sx={{
                mt: 1,
                whiteSpace: "pre-wrap",
                fontStyle: "italic",
                opacity: 0.7,
              }}
            >
              {feedResource.privateNote}
            </Typography>
          )}

          <Divider
            sx={{
              mt: 1,
              borderColor: "#ffffff00",
            }}
          />
          <FlexVCenter justifyContent={"flex-end"}>
            <SaveFeedResourceButton feedResource={feedResource} />
          </FlexVCenter>
        </FlexCol>
      </Paper>
    </Box>
  )
}

export default FeedResourceItem
