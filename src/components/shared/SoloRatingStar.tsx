import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, useTheme } from "@material-ui/core";
import React from "react";
import FlexVCenter from "./Flexboxes/FlexVCenter";

const SoloRatingStar = (props: Props) => {
  const theme = useTheme();
  const fontSize = props.fontSize ? props.fontSize : 40;

  // PE 2/3 
  return (
    <Box>
      {props.value ? (
        <FlexVCenter>
          {/* Up to 1 decimal place */}
          <Box mr={1}>{Math.round(props.value * 10) / 10}</Box>
          <FontAwesomeIcon
            icon={faStar}
            color={props.color}
            fontSize={fontSize}
          />
        </FlexVCenter>
      ) : (
        <Box ml={1}>
          <FontAwesomeIcon
            icon={faStar}
            color={theme.palette.grey[400]}
            fontSize={fontSize}
          />
        </Box>
      )}
    </Box>
  );
};

interface Props {
  value: number;
  color: string;
  fontSize?: number;
}

export default SoloRatingStar;
