import { Box, Link } from "@material-ui/core"
import React from "react"
import { ResourceDto } from "../../../../../../interfaces/dtos/relearn/ResourceDto"
import descriptionPng from "../../../../../../static/images/description.png"
import linkPng from "../../../../../../static/images/link.png"

// PE 2/3
function ResourceThumbnail(props: Props) {
  const getThumbnailSrc = (resource: ResourceDto): string => {
    if (resource.thumbnail.length > 0) {
      return resource.thumbnail
    }

    if (resource.url.length) {
      return linkPng
    }
    return descriptionPng
  }

  const isLink = () => {
    return props.resource.url.length > 0
  }

  return (
    <Box mr={2}>
      <Box minWidth={50} width={50} position="relative">
        {isLink() ? (
          <Link href={props.resource.url} target="_blank">
            <img
              style={{ width: "100%" }}
              alt={props.resource.thumbnail}
              src={getThumbnailSrc(props.resource)}
              // Testing... 20210510
              onError={(e: any) => {
                e.target.onerror = null
                e.target.src = linkPng
              }}
            />
          </Link>
        ) : (
          <img
            style={{ width: "100%" }}
            alt={props.resource.thumbnail}
            src={getThumbnailSrc(props.resource)}
          />
        )}

        {/* due date  */}
        {/* {props.resource.dueDate.length > 0 &&
          props.resource.completedAt.length === 0 && (
            <FlexVCenter
              position="absolute"
              bottom={0}
              right={0}
              bgcolor="black"
              fontSize={12}
            >
              <EventIcon fontSize="inherit" />
              {DateTime.fromISO(props.resource.dueDate).toFormat("LLL dd")}
            </FlexVCenter>
          )} */}
      </Box>
    </Box>
  )
}

interface Props {
  resource: ResourceDto
}

export default ResourceThumbnail
