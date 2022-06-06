import { Box } from "@material-ui/core";
import StarBorderOutlined from "@material-ui/icons/StarBorderOutlined";
import StarRateIcon from "@material-ui/icons/StarRate";
import React from "react";
import { ratingLabels } from "utils/domain/relearn/resources/ratingLabels";
import { getColorByRating } from "../../../../utils/relearn/getColorByRating";
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter";

interface Props {
  rating: number;
}

const RatingButtonLabel = (props: Props) => {
  return (
    <FlexVCenter style={{ color: getColorByRating(props.rating) }}>
      {props.rating > 0 ? <StarRateIcon /> : <StarBorderOutlined />}

      {props.rating > 0 ? (
        <Box ml={1}>
          {props.rating} - {ratingLabels[props.rating]}
        </Box>
      ) : (
        <Box ml={1}>Rate this resource</Box>
      )}
    </FlexVCenter>
  );
};

export default RatingButtonLabel;
