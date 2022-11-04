import { Box, Link } from "@mui/material"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import descriptionPng from "../../../static/images/description.png"
import linkPng from "../../../static/images/link.png"

interface Props {
  linkable: boolean
  width?: number

  thumbnailSrc: string
  resourceUrl: string
}

// PE 2/3
function ResourceThumbnail(props: Props) {
  // PE 2/3 - getThumbOrEmptySrc()
  const getThumbnailSrc = (): string => {
    if (props.thumbnailSrc.length > 0) {
      return props.thumbnailSrc
    }

    if (props.resourceUrl.length) {
      return linkPng
    }
    return descriptionPng
  }

  // PE 2/3 doesn't need to be a function
  const isLink = () => {
    return props.resourceUrl.length > 0 && props.linkable !== false
  }

  // PE 2/3 doesn't need to be a function
  const getWidth = () => {
    return props.width ? props.width : 50
  }

  return (
    <Box mr={2}>
      <Box minWidth={getWidth()} width={getWidth()} position="relative">
        {isLink() ? (
          <Link
            href={props.resourceUrl}
            target="_blank"
            onClick={(e) => {
              if (e.altKey) return
              e.stopPropagation()
            }}
          >
            <LazyLoadImage
              style={{ width: "100%" }}
              alt={props.thumbnailSrc}
              src={getThumbnailSrc()}
              onError={(e: any) => {
                e.target.onerror = null
                e.target.src = linkPng
              }}
            />
          </Link>
        ) : (
          <LazyLoadImage style={{ width: "100%" }} src={getThumbnailSrc()} />
        )}
      </Box>
    </Box>
  )
}

export default ResourceThumbnail
