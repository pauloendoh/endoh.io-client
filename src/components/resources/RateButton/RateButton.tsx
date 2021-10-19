import {
  Box,
  Button,
  ClickAwayListener,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import StarBorderOutlined from "@material-ui/icons/StarBorderOutlined";
import StarRateIcon from "@material-ui/icons/StarRate";
import { Rating } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ratingLabels } from "utils/domain/relearn/resources/ratingLabels";
import { ApplicationState } from "../../../store/store";
import * as utilsActions from "../../../store/utils/utilsActions";
import { ResourceDto } from "../../../types/domain/relearn/ResourceDto";
import { getColorByRating } from "../../../utils/relearn/getColorByRating";
import FlexHCenter from "../../shared/Flexboxes/FlexHCenter";
import FlexVCenter from "../../shared/Flexboxes/FlexVCenter";

function RateButton(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const [rating, setRating] = React.useState<number | null>(
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
              value={rating}
              onChange={(event, newValue) => {
                setRating(rating);
                setOpen(false);
                props.onChange(newValue);
                // handleSaveRating(newValue)
                // setValue(newValue)
              }}
              onChangeActive={(event, newHover) => {
                if (newHover === rating) {
                  setHover(0);
                } else {
                  setHover(newHover);
                }
              }}
            />
            <FlexHCenter>
              <Typography>
                {ratingLabels[hover !== -1 ? hover : rating]}
              </Typography>
            </FlexHCenter>
          </Box>
        }
      >
        <Button
          size="small"
          onClick={handleTooltipOpen}
          // variant="outlined"
          className={clsx([classes.rateButton, "rate-button"])}
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
}

const useStyles = makeStyles((theme) => ({
  rateButton: {
    position: "relative",
    right: 8,
  },
}));

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
});

interface OwnProps {
  resource: ResourceDto;
  onChange: (newRating: number) => void;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(RateButton);
