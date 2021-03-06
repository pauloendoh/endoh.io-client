import StarRateIcon from "@material-ui/icons/StarRate"

import {
  Avatar,
  Box,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import TimeAgo from "react-timeago"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import PATHS from "../../../consts/PATHS"
import { FeedResourceDto } from "../../../dtos/feed/FeedResourceDto"
import descriptionPng from "../../../static/images/description.png"
import linkPng from "../../../static/images/link.png"
import { ApplicationState } from "../../../store/store"
import { getColorByRating } from "../../../utils/relearn/getColorByRating"
import MinRatingButton from "../../../components/resources/MinRatingButton/MinRatingButton"

// PE 3/3
const FeedResources = (props: Props) => {
  const classes = useStyles()

  const [filteredResources, setFilteredResources] = useState<FeedResourceDto[]>(
    []
  )
  const [minRating, setMinRating] = useState(0)

  useEffect(() => {
    const minResources = props.resources.filter((r) => r.rating >= minRating)
    setFilteredResources(minResources)
  }, [props.resources, minRating])

  const getThumbnailSrc = (resource: FeedResourceDto): string => {
    if (resource.thumbnail.length) {
      return resource.thumbnail
    }

    if (resource.url.length) {
      return linkPng
    }
    return descriptionPng
  }

  return (
    <Box pr={4}>
      <Flex justifyContent="flex-end">
        <MinRatingButton onChange={setMinRating} value={minRating} />
      </Flex>
      {filteredResources.map((resource) => (
        <Paper key={resource.id} style={{ marginBottom: 16, padding: 16 }}>
          <FlexVCenter>
            <Avatar style={{ height: 32, width: 32 }}>
              {resource.user.username[0]}
            </Avatar>
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
              <Box minWidth={75} width={75}>
                <Link href={resource.url} target="_blank">
                  <img
                    style={{ width: "100%" }}
                    alt={resource.thumbnail}
                    src={getThumbnailSrc(resource)}
                  />
                </Link>
              </Box>

              <Box ml={1}>
                <Typography>{resource.title}</Typography>
                <Box>
                  <Link
                    href={resource.url}
                    target="_blank"
                    className={classes.link}
                  >
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
                        {resource.rating} - {labels[resource.rating]}
                      </Box>
                    </FlexVCenter>
                  </FlexVCenter>
                </FlexVCenter>
              </Box>
            </Flex>
          </Box>
        </Paper>
      ))}
    </Box>
  )
}

const labels: { [index: string]: string } = {
  null: "Give a rating",
  0: "Remove rating",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
}

const useStyles = makeStyles((theme) => ({
  link: {
    // fontSize: 12
    // display: "block",
    // maxWidth: 400,
    // overflow: "hidden",
    // whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
  },
}))

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.feed.resources,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(FeedResources)
