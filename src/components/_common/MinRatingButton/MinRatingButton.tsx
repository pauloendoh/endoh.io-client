import {
  Box,
  Button,
  ClickAwayListener,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import {
  hoverRatingLabels,
  ratingLabels,
} from "utils/domain/relearn/resources/ratingLabels"
import FlexHCenter from "../../_UI/Flexboxes/FlexHCenter"
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter"

interface Props {
  value: number
  onChange: (newRating: number | null) => void
}

function MinRatingButton(props: Props) {
  const [open, setOpen] = React.useState(false)
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }

  // const [rating, setRating] = React.useState<number | null>(props.value)
  const [hover, setHover] = useState(-1)

  useEffect(() => {
    setHover(-1)
  }, [props.value])

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
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
              value={props.value}
              onChange={(event, newValue) => {
                // setRating(rating)
                setOpen(false)
                props.onChange(newValue)
              }}
              onChangeActive={(event, newHover) => {
                if (!newHover || newHover === props.value) {
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
                  : ratingLabels[props.value]}
              </Typography>
            </FlexHCenter>
          </Box>
        }
      >
        <Button
          size="small"
          onClick={handleTooltipOpen}
          variant="outlined"
          className="rate-button"
          color="inherit"
        >
          <FlexVCenter>
            <Box>Min. rating: </Box>
            {props.value > 0 ? (
              <Box ml={1}>
                {props.value} - {ratingLabels[props.value]}
              </Box>
            ) : (
              <Box ml={1}>-</Box>
            )}
          </FlexVCenter>
        </Button>
      </Tooltip>
    </ClickAwayListener>
  )
}

export default MinRatingButton
