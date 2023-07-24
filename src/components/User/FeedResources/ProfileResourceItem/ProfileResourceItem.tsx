import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box, Link } from "@mui/material"
import ResourceCompletedLabel from "components/Relearn/RelearnContent/ResourceList/DraggableResourceItem/ResourceItem/ResourceCompletedLabel/ResourceCompletedLabel"
import ResourceDurationLabel from "components/Relearn/RelearnContent/ResourceList/DraggableResourceItem/ResourceItem/ResourceDurationLabel/ResourceDurationLabel"
import Txt from "components/_UI/Text/Txt"
import RatingButtonLabel from "components/_common/RatingButton/RatingButtonLabel/RatingButtonLabel"
import React, { useMemo, useState } from "react"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useAuthStore from "store/zustand/useAuthStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { ResourceDto } from "../../../../types/domain/relearn/ResourceDto"
import myAxios from "../../../../utils/consts/myAxios"
import { urlIsValid } from "../../../../utils/url/isValidUrl"
import ResourceMoreIcon from "../../../Relearn/RelearnContent/ResourceList/DraggableResourceItem/ResourceMoreIcon/ResourceMoreIcon"
import Flex from "../../../_UI/Flexboxes/Flex"
import MyTextField from "../../../_UI/MyInputs/MyTextField"
import RatingButton from "../../../_common/RatingButton/RatingButton"
import ResourceThumbnail from "../../../_common/ResourceThumbnail/ResourceThumbnail"

interface Props {
  resource: ResourceDto
  style?: React.CSSProperties
}

// PE 1/3 - DRY with FeedPage's ? ...
// This is for the user page... for the feed page, look for FeedResource.tsx
function ProfileResourceItem(props: Props) {
  const { setResources } = useRelearnStore()

  const classes = useStyles()

  const { authUser } = useAuthStore()

  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const { setSuccessMessage } = useSnackbarStore()

  const handleSaveRating = (rating: number | null) => {
    const resource = { ...props.resource, rating } as ResourceDto
    myAxios
      .post<ResourceDto[]>(urls.api.relearn.resource, resource)
      .then((res) => {
        setResources(res.data)

        if (resource.rating) {
          setSuccessMessage("Resource rated!")
        } else {
          setSuccessMessage("Rating removed!")
        }
      })
  }

  const isOwner = useMemo(() => {
    return authUser?.id === props.resource.userId
  }, [authUser, props.resource])

  return (
    <Flex
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      py={2}
      pr={2}
      borderBottom="1px solid rgb(255 255 255 / 0.1)" // Could be a const?
      style={props.style ? props.style : undefined}
    >
      <ResourceThumbnail
        resourceUrl={props.resource.url}
        thumbnailSrc={props.resource.thumbnail}
        linkable={true}
      />

      <Box flexGrow={1}>
        <Flex className={classes.firstRow}>
          <Box>
            <Txt>{props.resource.title}</Txt>

            {urlIsValid(props.resource.url) && (
              <Link
                href={props.resource.url}
                style={{ fontWeight: "normal" }}
                target="_blank"
              >
                <Txt variant="inherit">{props.resource.url}</Txt>
              </Link>
            )}
          </Box>

          <ResourceMoreIcon resource={props.resource} isHovered={isHovered} />
        </Flex>

        <Flex mt={2} style={{ justifyContent: "space-between" }}>
          <Flex style={{ gap: 16 }}>
            {props.resource.completedAt.length && (
              <ResourceCompletedLabel
                completedAt={props.resource.completedAt}
              />
            )}
            <ResourceDurationLabel duration={props.resource.estimatedTime} />
          </Flex>

          {isOwner ? (
            <RatingButton
              rating={Number(props.resource.rating)}
              onChange={(val) => {
                handleSaveRating(val)
              }}
            />
          ) : (
            <RatingButtonLabel rating={Number(props.resource.rating)} />
          )}
        </Flex>

        {props.resource.publicReview?.length > 0 && (
          <Box mt={2}>
            <MyTextField
              value={props.resource.publicReview}
              fullWidth
              label="Public Review"
              disabled
              multiline
            />
          </Box>
        )}

        {props.resource.privateNote?.length > 0 && (
          <Box mt={2}>
            <MyTextField
              value={props.resource.privateNote}
              fullWidth
              label="Private Notes"
              multiline
              disabled
            />
          </Box>
        )}
      </Box>
    </Flex>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  link: {
    maxWidth: 400,
    overflow: "hidden",
    marginRight: 16,
  },

  dueDateBox: {
    paddingLeft: 16,
    borderLeft: "1px solid rgb(255 255 255)",
  },
  listItemIcon: {
    width: 16,
  },
  firstRow: {
    justifyContent: "space-between",
    minHeight: 32,
  },
}))

export default ProfileResourceItem
