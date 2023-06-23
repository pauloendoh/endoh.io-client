import { Rating } from "@mui/lab"
import {
  Box,
  Button,
  ClickAwayListener,
  Tooltip,
  Typography,
} from "@mui/material"
import React from "react"
import {
  hoverRatingLabels,
  ratingLabels,
} from "utils/domain/relearn/resources/ratingLabels"
import { useGetColorByRating } from "utils/relearn/getColorByRating"
import FlexHCenter from "../../_UI/Flexboxes/FlexHCenter"
import RatingButtonLabel from "./RatingButtonLabel/RatingButtonLabel"

interface Props {
  rating: number
  onChange: (newRating: number) => void
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
        PopperProps={{
          disablePortal: true,
        }}
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
                  : ratingLabels[props.rating]}
              </Typography>
            </FlexHCenter>
          </Box>
        }
      >
        <Button
          size="small"
          onClick={handleTooltipOpen}
          variant="outlined"
          style={{
            position: "relative",
            borderColor: useGetColorByRating(props.rating),
          }}
          className="rate-button"
        >
          <RatingButtonLabel rating={props.rating} />
        </Button>
      </Tooltip>
    </ClickAwayListener>
  )
}

export default RatingButton
