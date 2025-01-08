import { Typography, useTheme } from "@mui/material"
import React, { CSSProperties, useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
  maxLines?: number
  preventDefaultOnClick?: boolean
  onClick?: (isOpening: boolean) => void
  buttonsText?: {
    seeMore: string
    seeLess: string
  }
  buttonMarginBottom?: number
  buttonTextStyles?: CSSProperties
}

const MySeeMore = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const spanRef = React.useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (spanRef.current) {
      setShowButton(
        spanRef.current.scrollHeight !== spanRef.current.clientHeight
      )
    }
  }, [])

  const defaultStyles = isOpen
    ? undefined
    : ({
        WebkitLineClamp: props.maxLines ?? 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        display: "-webkit-box",
      } as CSSProperties)

  const seeMoreText = props.buttonsText?.seeMore ?? "See more"
  const seeLessText = props.buttonsText?.seeLess ?? "See less"

  const buttonMarginBottom = props.buttonMarginBottom ?? 16

  const theme = useTheme()

  return (
    <div
      ref={ref}
      style={{
        whiteSpace: "pre-line",
      }}
    >
      <span
        ref={spanRef}
        style={{
          marginBottom: 8,
          ...defaultStyles,
        }}
      >
        {props.children}
      </span>
      {showButton && (
        <button
          onClick={(e) => {
            if (props.onClick) {
              props.onClick(!isOpen)
            }

            if (!props.preventDefaultOnClick) {
              e.preventDefault()
              setIsOpen(!isOpen)
            }
          }}
          style={{
            background: "unset",
            border: "unset",
            cursor: "pointer",
            padding: 0,
            marginBottom: buttonMarginBottom,
            ...props.buttonTextStyles,
          }}
        >
          <Typography
            style={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            {isOpen ? seeLessText : seeMoreText}
          </Typography>
        </button>
      )}
    </div>
  )
})

export default MySeeMore
