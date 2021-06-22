import { Box, Link } from "@material-ui/core"
import React from "react"
import descriptionPng from "../../../static/images/description.png"
import linkPng from "../../../static/images/link.png"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

// PE 2/3
function ResourceThumbnail(props: Props) {
  const getThumbnailSrc = (): string => {
    if (props.thumbnailSrc.length > 0) {
      return props.thumbnailSrc
    }

    if (props.resourceUrl.length) {
      return linkPng
    }
    return descriptionPng
  }

  const isLink = () => {
    return props.resourceUrl.length > 0 && props.linkable !== false
  }

  const getWidth = () => {
    return props.width ? props.width : 50
  }

  return (
    <Box mr={2}>
      <Box minWidth={getWidth()} width={getWidth()} position="relative">
        {isLink() ? (
          <Link href={props.resourceUrl} target="_blank">
            <LazyLoadImage
              style={{ width: "100%" }}
              alt={props.thumbnailSrc}
              src={getThumbnailSrc()}
              // Testing... 20210510
              onError={(e: any) => {
                e.target.onerror = null
                e.target.src = linkPng
              }}
            />
          </Link>
        ) : (
          <LazyLoadImage
            style={{ width: "100%" }}
            src={getThumbnailSrc()}
          />
        )}
      </Box>
    </Box>
  )
}

interface Props {
  linkable: boolean
  width?: number

  thumbnailSrc: string
  resourceUrl: string
}

export default ResourceThumbnail
