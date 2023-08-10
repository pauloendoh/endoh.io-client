import { Box, Link } from "@mui/material"
import Span from "components/_UI/Text/Span"
import useElementSize from "hooks/utils/useElementSize"
import { useMemo, useRef } from "react"
import "react-lazy-load-image-component/src/effects/blur.css"
import descriptionPng from "../../../static/images/description.png"
import linkPng from "../../../static/images/link.png"

interface Props {
  linkable: boolean
  width?: number
  thumbnailSrc: string
  resourceUrl: string
  estimatedTime?: string
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
  const width = useMemo(() => {
    return props.width ? props.width : 50
  }, [props.width])

  const imageRef = useRef<HTMLImageElement>(null)
  const { height: imageHeight } = useElementSize(imageRef)

  return (
    <Box position={"relative"} height={imageHeight}>
      <Box minWidth={width} width={width} position="relative">
        {isLink() ? (
          <Link
            href={props.resourceUrl}
            target="_blank"
            onClick={(e) => {
              if (e.altKey) return
              e.stopPropagation()
            }}
          >
            <img
              ref={imageRef}
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
          <img
            ref={imageRef}
            alt={props.thumbnailSrc}
            style={{ width: "100%" }}
            src={getThumbnailSrc()}
          />
        )}
      </Box>
      {!!props.estimatedTime && props.estimatedTime !== "00:00h" && (
        <Span
          position="absolute"
          bottom={-1}
          right={0}
          bgcolor="rgba(0,0,0,0.5)"
          color="white"
          px={1}
          fontSize={"0.7rem"}
        >
          {props.estimatedTime}
        </Span>
      )}
    </Box>
  )
}

export default ResourceThumbnail
