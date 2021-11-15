import { Box, ClickAwayListener, Tooltip, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { ratingLabels } from "utils/domain/relearn/resources/ratingLabels";
import FlexHCenter from "../../_UI/Flexboxes/FlexHCenter";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";
import S from "./MinRatingButton.styles";

interface Props {
  value: number;
  onChange: (newRating: number) => void;
}

function MinRatingButton(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  // const [rating, setRating] = React.useState<number | null>(props.value)
  const [hover, setHover] = React.useState(-1);

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        interactive
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
                setOpen(false);
                props.onChange(newValue);
              }}
              onChangeActive={(event, newHover) => {
                if (newHover === props.value) {
                  setHover(0);
                } else {
                  setHover(newHover);
                }
              }}
            />
            <FlexHCenter>
              <Typography>
                {ratingLabels[hover !== -1 ? hover : props.value]}
              </Typography>
            </FlexHCenter>
          </Box>
        }
      >
        <S.RateButton
          size="small"
          onClick={handleTooltipOpen}
          variant="outlined"
          className="rate-button"
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
        </S.RateButton>
      </Tooltip>
    </ClickAwayListener>
  );
}

export default MinRatingButton;
