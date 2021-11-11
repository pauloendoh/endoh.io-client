import {
  Box,
  Button,
  ClickAwayListener,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
import { ratingLabels } from "utils/domain/relearn/resources/ratingLabels";
import FlexHCenter from "../../_UI/Flexboxes/FlexHCenter";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";

interface Props {
  value: number;
  onChange: (newRating: number) => void;
}

function MinRatingButton(props: Props) {
  const classes = useStyles();
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
        <Button
          size="small"
          onClick={handleTooltipOpen}
          variant="outlined"
          className={clsx([classes.rateButton, "rate-button"])}
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
  );
}

const useStyles = makeStyles((theme) => ({
  rateButton: {
    position: "relative",
    right: 8,
  },
}));

export default MinRatingButton;
