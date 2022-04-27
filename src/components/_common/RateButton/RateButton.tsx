import {
  Box,
  Button,
  ClickAwayListener,
  Tooltip,
  Typography,
} from "@material-ui/core";
import StarBorderOutlined from "@material-ui/icons/StarBorderOutlined";
import StarRateIcon from "@material-ui/icons/StarRate";
import { Rating } from "@material-ui/lab";
import React from "react";
import {
  hoverRatingLabels,
  ratingLabels,
} from "utils/domain/relearn/resources/ratingLabels";
import { ResourceDto } from "../../../types/domain/relearn/ResourceDto";
import { getColorByRating } from "../../../utils/relearn/getColorByRating";
import FlexHCenter from "../../_UI/Flexboxes/FlexHCenter";
import FlexVCenter from "../../_UI/Flexboxes/FlexVCenter";

interface Props {
  resource: ResourceDto; // PE 1/3 - change to rating: number
  onChange: (newRating: number) => void;
}

// PE 1/3 - change to RatingButton
const RateButton = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  // PE 1/3 - remove this?
  const [localRating, setLocalRating] = React.useState<number | null>(
    props.resource.rating
  );

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
              value={localRating}
              onChange={(event, newValue) => {
                setLocalRating(localRating);
                setOpen(false);
                props.onChange(newValue);
                // handleSaveRating(newValue)
                // setValue(newValue)
              }}
              onChangeActive={(event, newHover) => {
                if (newHover === localRating) {
                  setHover(0);
                } else {
                  setHover(newHover);
                }
              }}
            />
            <FlexHCenter>
              <Typography>
                {hover !== -1
                  ? hoverRatingLabels[hover]
                  : ratingLabels[localRating]}
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
          }}
          className="rate-button"
        >
          <FlexVCenter
            style={{ color: getColorByRating(props.resource.rating) }}
          >
            {props.resource.rating > 0 ? (
              <StarRateIcon />
            ) : (
              <StarBorderOutlined />
            )}

            {props.resource.rating > 0 ? (
              <Box ml={1}>
                {props.resource.rating} - {ratingLabels[props.resource.rating]}
              </Box>
            ) : (
              <Box ml={1}>Rate this resource</Box>
            )}
          </FlexVCenter>
        </Button>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default RateButton;
