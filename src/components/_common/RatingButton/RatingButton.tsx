import { LoadingButton, Rating } from "@mui/lab"
import { Box, ClickAwayListener, Tooltip, Typography } from "@mui/material"
import { useMuiTheme } from "hooks/utils/useMuiTheme"
import React from "react"
import {
  hoverRatingLabels,
  ratingLabels,
} from "utils/domain/relearn/resources/ratingLabels"
import { useGetColorByRating } from "utils/relearn/getColorByRating"
import FlexHCenter from "../../_UI/Flexboxes/FlexHCenter"
import RatingButtonLabel from "./RatingButtonLabel/RatingButtonLabel"

interface Props {
  rating: number | null
  onChange: (newRating: number | null) => void
  isLoading?: boolean
}

const RatingButton = (props: Props) => {
  const [open, setOpen] = React.useState(false)
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }

  const [hover, setHover] = React.useState(-1)

  const ratingColor = useGetColorByRating(props.rating)

  const theme = useMuiTheme()
  const loadingColor = theme.palette.grey[700]

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        // if touch event, do not close tooltip
        if (e.type === "touchend") return

        handleTooltipClose()
      }}
    >
      <Tooltip
        arrow
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={
          <Box>
            <Rating
              name="rating-input"
              value={props.rating}
              onChange={(event, newValue) => {
                props.onChange(newValue)
                setOpen(false)
              }}
              onChangeActive={(event, newHover) => {
                if (newHover === props.rating) {
                  setHover(0)
                } else {
                  setHover(newHover)
                }
              }}
            />
            <FlexHCenter>
              <Typography>
                {hover !== -1
                  ? hoverRatingLabels[hover]
                  : ratingLabels[props.rating || 0]}
              </Typography>
            </FlexHCenter>
          </Box>
        }
      >
        <LoadingButton
          loading={props.isLoading}
          size="small"
          onClick={handleTooltipOpen}
          variant="outlined"
          style={{
            position: "relative",
            borderColor: props.isLoading ? loadingColor : ratingColor,
            backgroundColor: props.isLoading ? loadingColor : undefined,
          }}
          className="rate-button"
        >
          <RatingButtonLabel rating={props.rating || 0} />
        </LoadingButton>
      </Tooltip>
    </ClickAwayListener>
  )
}

export default RatingButton
