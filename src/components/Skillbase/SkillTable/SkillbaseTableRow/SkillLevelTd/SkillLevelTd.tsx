import { makeStyles, TableCell } from "@material-ui/core";
import clsx from "clsx";
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";

interface Props {
  value: number;
  rightValue?: number;
}

// PE 2/3 - Not so easy to understand the classes logic
const SkillLevelTd = (props: Props) => {
  const classes = useStyles();
  return (
    <TableCell
      align="center"
      className={clsx(classes.root, {
        [classes.basic]: props.value >= 1 && props.value <= 3,
        [classes.intermediary]: props.value >= 4 && props.value <= 6,
        [classes.advanced]: props.value >= 7 && props.value <= 10,
      })}
    >
      {props.rightValue ? (
        <FlexVCenter justifyContent="center">
          {props.value} <MdOutlineArrowRightAlt /> {props.rightValue}
        </FlexVCenter>
      ) : (
        props.value
      )}
    </TableCell>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    width: 50,
  },

  basic: {
    background: "#FFF2CC",
    // color: "#ffaa00",
  },
  intermediary: {
    background: "#B6D7A8",
  },
  advanced: {
    background: "#B4A7D6",

    // color: "#C862AC",
  },
}));

export default SkillLevelTd;
